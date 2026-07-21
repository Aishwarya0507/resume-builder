# ResumeAI – Complete Local MVP

ResumeAI is an AI-powered talent platform with separate Candidate, Recruiter, and Admin experiences.

## Included

### Candidate
- Register and login
- Upload PDF, DOCX, or TXT resume
- Paste or upload a job description
- ATS score and semantic score
- Skill extraction, matched skills, and missing skills
- Resume strengths and weaknesses
- Learning recommendations
- AI interview question generation
- Analysis history
- Downloadable JSON and text reports

### Recruiter
- Recruiter dashboard
- Ranked candidate list
- Search, filter, sorting, and pagination
- Candidate detail view
- Skill demand analytics
- ATS distribution analytics
- Candidate funnel statistics
- CSV export for Power BI or Excel

### Admin
- User counts by role
- Platform analysis counts
- User listing
- Role-based access controls

### Backend
- Python + FastAPI
- JWT access tokens
- Password hashing
- Role-based authorization
- SQLite locally
- Azure SQL-ready SQLAlchemy configuration
- Optional Azure AI integration with local fallback
- Resume parsing
- Analytics APIs
- CSV export endpoint

### Frontend
- React + Vite
- Dark responsive UI
- Protected routes
- Candidate, Recruiter, and Admin portals
- Recharts analytics visualizations
- Loading and error states

## Important Cloud Note

This project is a complete **local MVP**. Azure AI, Azure SQL, Blob Storage, and Power BI publishing require your own Microsoft/Azure credentials and resource IDs.

The code includes:
- Azure AI environment variables and service integration
- Azure SQL connection support
- Power BI-ready CSV and JSON analytics endpoints

## Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

Swagger:
`http://localhost:8000/docs`

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
`http://localhost:5173`

## Demo Admin

On first startup the backend creates:

- Email: `admin@resumeai.local`
- Password: `Admin@123`

Change this password before deployment.

## Azure SQL

Set:

```env
DATABASE_URL=mssql+pyodbc://USERNAME:PASSWORD@SERVER/DATABASE?driver=ODBC+Driver+18+for+SQL+Server&TrustServerCertificate=yes
```

## Azure AI

Set:

```env
AZURE_AI_ENDPOINT=
AZURE_AI_API_KEY=
AZURE_AI_DEPLOYMENT=
AZURE_AI_API_VERSION=2024-10-21
```

Without these values, the project uses a strong local fallback generator.

## Power BI

Use either:

- `GET /api/analytics/powerbi`
- `GET /api/analytics/export.csv`

Power BI Desktop can import the CSV or connect to the web API after deployment.
