import csv
import io
import json
from collections import Counter, defaultdict

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Analysis, User
from ..services.ai_engine import aggregate_skill_demand
from ..utils.security import require_roles


router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


def build_analytics(rows):
    total = len(rows)
    shortlisted = sum(1 for row in rows if row.shortlisted)
    average_ats = round(sum(row.ats_score for row in rows) / total, 2) if total else 0

    distribution = [
        {"range": "0-49", "count": sum(row.ats_score < 50 for row in rows)},
        {"range": "50-69", "count": sum(50 <= row.ats_score < 70 for row in rows)},
        {"range": "70-84", "count": sum(70 <= row.ats_score < 85 for row in rows)},
        {"range": "85-100", "count": sum(row.ats_score >= 85 for row in rows)},
    ]

    jobs = Counter(row.job_title for row in rows)
    job_distribution = [{"job_title": key, "count": value} for key, value in jobs.most_common(10)]

    monthly = defaultdict(int)
    for row in rows:
        key = row.created_at.strftime("%Y-%m") if row.created_at else "Unknown"
        monthly[key] += 1

    return {
        "total_candidates": total,
        "average_ats_score": average_ats,
        "shortlisted_candidates": shortlisted,
        "interview_success_rate": round(shortlisted / total * 100, 2) if total else 0,
        "candidate_distribution": distribution,
        "skill_demand": aggregate_skill_demand(rows),
        "job_distribution": job_distribution,
        "monthly_activity": [{"month": key, "count": monthly[key]} for key in sorted(monthly)],
    }


@router.get("/")
def analytics(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("recruiter", "admin")),
):
    return build_analytics(db.query(Analysis).all())


@router.get("/powerbi")
def powerbi(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("recruiter", "admin")),
):
    rows = db.query(Analysis).all()
    return [
        {
            "analysis_id": row.id,
            "candidate_name": row.candidate_name,
            "candidate_email": row.candidate_email,
            "job_title": row.job_title,
            "ats_score": row.ats_score,
            "skill_match_score": row.skill_match_score,
            "semantic_score": row.semantic_score,
            "shortlisted": row.shortlisted,
            "status": row.status,
            "skills": ", ".join(json.loads(row.extracted_skills)),
            "created_at": row.created_at,
        }
        for row in rows
    ]


@router.get("/export.csv")
def export_csv(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("recruiter", "admin")),
):
    rows = db.query(Analysis).all()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "analysis_id", "candidate_name", "candidate_email", "job_title",
        "ats_score", "skill_match_score", "semantic_score",
        "shortlisted", "status", "skills", "created_at",
    ])
    for row in rows:
        writer.writerow([
            row.id, row.candidate_name, row.candidate_email, row.job_title,
            row.ats_score, row.skill_match_score, row.semantic_score,
            row.shortlisted, row.status,
            ", ".join(json.loads(row.extracted_skills)),
            row.created_at.isoformat() if row.created_at else "",
        ])

    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=resumeai_analytics.csv"},
    )
