import json
from math import ceil

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import asc, desc, or_
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Analysis, User
from ..schemas import ShortlistRequest
from ..utils.security import require_roles


router = APIRouter(prefix="/api/recruiter", tags=["Recruiter"])


@router.get("/candidates")
def candidates(
    search: str = "",
    min_score: float = 0,
    shortlisted: bool | None = None,
    sort_by: str = Query("ats_score", pattern="^(ats_score|skill_match_score|created_at|candidate_name)$"),
    order: str = Query("desc", pattern="^(asc|desc)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("recruiter", "admin")),
):
    query = db.query(Analysis).filter(Analysis.ats_score >= min_score)

    if search:
        value = f"%{search}%"
        query = query.filter(
            or_(
                Analysis.candidate_name.ilike(value),
                Analysis.candidate_email.ilike(value),
                Analysis.job_title.ilike(value),
            )
        )

    if shortlisted is not None:
        query = query.filter(Analysis.shortlisted.is_(shortlisted))

    column = getattr(Analysis, sort_by)
    query = query.order_by(asc(column) if order == "asc" else desc(column))

    total = query.count()
    rows = query.offset((page - 1) * page_size).limit(page_size).all()

    items = []
    for row in rows:
        items.append({
            "id": row.id,
            "candidate_name": row.candidate_name,
            "candidate_email": row.candidate_email,
            "job_title": row.job_title,
            "ats_score": row.ats_score,
            "skill_match_score": row.skill_match_score,
            "semantic_score": row.semantic_score,
            "matched_skills": json.loads(row.matched_skills),
            "missing_skills": json.loads(row.missing_skills),
            "shortlisted": row.shortlisted,
            "created_at": row.created_at,
        })

    return {
        "items": items,
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": ceil(total / page_size) if total else 1,
    }


@router.patch("/candidates/{analysis_id}/shortlist")
def shortlist(
    analysis_id: int,
    payload: ShortlistRequest,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("recruiter", "admin")),
):
    row = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Candidate analysis not found")
    row.shortlisted = payload.shortlisted
    row.status = "shortlisted" if payload.shortlisted else "analyzed"
    db.commit()
    return {"message": "Candidate status updated", "shortlisted": row.shortlisted}
