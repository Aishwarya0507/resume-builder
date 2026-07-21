import json
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Analysis, User
from ..services.ai_engine import analyze_resume
from ..services.parser import extract_section, extract_text, parse_contact_details
from ..utils.security import require_roles


router = APIRouter(prefix="/api/analysis", tags=["Resume Analysis"])


def serialize(row: Analysis):
    return {
        "id": row.id,
        "candidate_name": row.candidate_name,
        "candidate_email": row.candidate_email,
        "job_title": row.job_title,
        "ats_score": row.ats_score,
        "semantic_score": row.semantic_score,
        "skill_match_score": row.skill_match_score,
        "extracted_skills": json.loads(row.extracted_skills),
        "matched_skills": json.loads(row.matched_skills),
        "missing_skills": json.loads(row.missing_skills),
        "strengths": json.loads(row.strengths),
        "weaknesses": json.loads(row.weaknesses),
        "recommendations": json.loads(row.recommendations),
        "interview_questions": json.loads(row.interview_questions),
        "shortlisted": row.shortlisted,
        "status": row.status,
        "created_at": row.created_at,
    }


@router.post("/")
async def create_analysis(
    candidate_name: str = Form(...),
    candidate_email: Optional[str] = Form(None),
    job_title: str = Form(...),
    jd_text: str = Form(""),
    resume: UploadFile = File(...),
    jd_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("candidate", "recruiter", "admin")),
):
    allowed = (".pdf", ".docx", ".txt")
    if not resume.filename.lower().endswith(allowed):
        raise HTTPException(status_code=400, detail="Resume must be PDF, DOCX, or TXT")

    resume_bytes = await resume.read()
    if len(resume_bytes) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Resume must be smaller than 5 MB")

    try:
        resume_text = extract_text(resume.filename, resume_bytes)
        if jd_file:
            jd_text = extract_text(jd_file.filename, await jd_file.read())
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    if not resume_text.strip() or not jd_text.strip():
        raise HTTPException(status_code=400, detail="Both resume and job-description content are required")

    result = await analyze_resume(resume_text, jd_text, job_title)
    contact = parse_contact_details(resume_text)

    education = extract_section(
        resume_text,
        "education",
        ["experience", "projects", "skills", "certifications", "achievements"],
    )
    experience = extract_section(
        resume_text,
        "experience",
        ["projects", "skills", "education", "certifications", "achievements"],
    )

    row = Analysis(
        owner_id=user.id,
        candidate_name=candidate_name.strip() or contact["name"] or user.name,
        candidate_email=candidate_email or contact["email"] or user.email,
        job_title=job_title.strip(),
        resume_filename=resume.filename,
        resume_text=resume_text,
        jd_text=jd_text,
        extracted_name=contact["name"],
        extracted_email=contact["email"],
        extracted_phone=contact["phone"],
        extracted_education=education,
        extracted_experience=experience,
        extracted_skills=json.dumps(result["resume_skills"]),
        matched_skills=json.dumps(result["matched_skills"]),
        missing_skills=json.dumps(result["missing_skills"]),
        strengths=json.dumps(result["strengths"]),
        weaknesses=json.dumps(result["weaknesses"]),
        recommendations=json.dumps(result["recommendations"]),
        interview_questions=json.dumps(result["interview_questions"]),
        ats_score=result["ats_score"],
        semantic_score=result["semantic_score"],
        skill_match_score=result["skill_match_score"],
    )
    db.add(row)
    db.commit()
    db.refresh(row)

    return serialize(row)


@router.get("/history")
def history(
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("candidate", "recruiter", "admin")),
):
    query = db.query(Analysis)
    if user.role == "candidate":
        query = query.filter(Analysis.owner_id == user.id)
    rows = query.order_by(Analysis.created_at.desc()).all()
    return [serialize(row) for row in rows]


@router.get("/{analysis_id}")
def get_analysis(
    analysis_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("candidate", "recruiter", "admin")),
):
    row = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Analysis not found")
    if user.role == "candidate" and row.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    return serialize(row)


@router.get("/{analysis_id}/report.txt", response_class=PlainTextResponse)
def download_report(
    analysis_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("candidate", "recruiter", "admin")),
):
    row = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Analysis not found")
    if user.role == "candidate" and row.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    data = serialize(row)
    lines = [
        "ResumeAI Analysis Report",
        "=" * 28,
        f"Candidate: {row.candidate_name}",
        f"Role: {row.job_title}",
        f"ATS Score: {row.ats_score}%",
        f"Skill Match: {row.skill_match_score}%",
        f"Semantic Score: {row.semantic_score}%",
        "",
        "Matched Skills:",
        ", ".join(data["matched_skills"]) or "None",
        "",
        "Missing Skills:",
        ", ".join(data["missing_skills"]) or "None",
        "",
        "Strengths:",
        *[f"- {x}" for x in data["strengths"]],
        "",
        "Weaknesses:",
        *[f"- {x}" for x in data["weaknesses"]],
        "",
        "Recommendations:",
        *[f"- {x}" for x in data["recommendations"]],
        "",
        "Interview Questions:",
        *[f"{i+1}. {q}" for i, q in enumerate(data["interview_questions"])],
    ]
    return "\n".join(lines)
