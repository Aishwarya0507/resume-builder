from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, SessionLocal, engine
from .models import User
from .routers import admin, analysis, analytics, auth, recruiter
from .utils.security import hash_password


Base.metadata.create_all(bind=engine)


def seed_admin():
    db = SessionLocal()
    try:
        admin_user = db.query(User).filter(User.email == "admin@resumeai.local").first()
        if not admin_user:
            db.add(User(
                name="ResumeAI Admin",
                email="admin@resumeai.local",
                password_hash=hash_password("Admin@123"),
                role="admin",
            ))
            db.commit()
    finally:
        db.close()


seed_admin()

app = FastAPI(title=f"{settings.app_name} API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(analysis.router)
app.include_router(recruiter.router)
app.include_router(analytics.router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {
        "name": settings.app_name,
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
