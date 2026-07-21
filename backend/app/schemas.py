from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
    role: str = Field(pattern="^(candidate|recruiter)$")


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    name: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ShortlistRequest(BaseModel):
    shortlisted: bool


class AnalysisResponse(BaseModel):
    id: int
    candidate_name: str
    candidate_email: Optional[str]
    job_title: str
    ats_score: float
    semantic_score: float
    skill_match_score: float
    extracted_skills: List[str]
    matched_skills: List[str]
    missing_skills: List[str]
    strengths: List[str]
    weaknesses: List[str]
    recommendations: List[str]
    interview_questions: List[str]
    shortlisted: bool
    status: str
    created_at: datetime
