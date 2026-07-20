# ResumeAI Talent Platform

A full-stack hiring platform for candidates and recruiters. It runs without a paid AI key by using local rule-based resume parsing, ATS scoring, skill extraction, job matching, candidate ranking and interview-question generation.

## Candidate features
- Login and candidate portal
- Guided resume builder
- 15 ATS-friendly resume templates
- PDF, DOCX and TXT resume upload
- Job-description upload or paste
- ATS score and actionable recommendations
- Resume parsing and skill extraction
- Skill match and missing-skill analysis
- Matching demo jobs ranked by resume fit
- Interview-question generation

## Recruiter features
- Recruiter portal
- Job-description analysis
- Candidate skill extraction and ranking
- Candidate review workflow demo
- Hiring analytics: skill demand, candidate distribution and interview success rate

## Microsoft-ready architecture
- Azure AI integration page for production resume parsing and semantic matching
- Power BI-ready analytics dashboard
- Azure SQL-ready data model, with MongoDB used as the working local/deployment fallback

> Real Azure AI, Power BI embedding and Azure SQL require Microsoft Azure resources and credentials. The included portfolio version remains functional without them.

## Stack
React, Vite, Tailwind CSS, Node.js, Express, MongoDB, JWT.

## Run locally

Backend:
```bash
cd server
npm install
npm run dev
```

Frontend:
```bash
cd client
npm install
npm run dev
```

Create `server/.env` from `server/.env.example`. Never commit secrets.

