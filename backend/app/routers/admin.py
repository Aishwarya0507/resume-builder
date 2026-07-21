from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Analysis, User
from ..schemas import UserResponse
from ..utils.security import require_roles


router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/stats")
def stats(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin")),
):
    return {
        "total_users": db.query(User).count(),
        "candidate_users": db.query(User).filter(User.role == "candidate").count(),
        "recruiter_users": db.query(User).filter(User.role == "recruiter").count(),
        "total_analyses": db.query(Analysis).count(),
    }


@router.get("/users", response_model=list[UserResponse])
def users(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin")),
):
    return db.query(User).order_by(User.created_at.desc()).all()
