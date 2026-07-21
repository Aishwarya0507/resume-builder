from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, default="candidate")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    analyses = relationship("Analysis", back_populates="owner", cascade="all, delete-orphan")


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    candidate_name = Column(String(120), nullable=False)
    candidate_email = Column(String(255), nullable=True)
    job_title = Column(String(180), nullable=False)
    resume_filename = Column(String(255), nullable=False)

    resume_text = Column(Text, nullable=False)
    jd_text = Column(Text, nullable=False)

    extracted_name = Column(String(120), nullable=True)
    extracted_email = Column(String(255), nullable=True)
    extracted_phone = Column(String(50), nullable=True)
    extracted_education = Column(Text, nullable=True)
    extracted_experience = Column(Text, nullable=True)

    extracted_skills = Column(Text, nullable=False)
    matched_skills = Column(Text, nullable=False)
    missing_skills = Column(Text, nullable=False)
    strengths = Column(Text, nullable=False)
    weaknesses = Column(Text, nullable=False)
    recommendations = Column(Text, nullable=False)
    interview_questions = Column(Text, nullable=False)

    ats_score = Column(Float, nullable=False)
    semantic_score = Column(Float, nullable=False)
    skill_match_score = Column(Float, nullable=False)
    status = Column(String(30), default="analyzed")
    shortlisted = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="analyses")
