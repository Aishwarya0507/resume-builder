import json
import re
from collections import Counter
from typing import Dict, List

import httpx
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from ..config import settings


SKILLS = {
    "python", "java", "c++", "c#", "sql", "javascript", "typescript", "react",
    "react.js", "node.js", "express.js", "fastapi", "flask", "django", "spring boot",
    "mongodb", "postgresql", "mysql", "azure sql", "oracle", "redis",
    "aws", "azure", "docker", "kubernetes", "git", "github", "linux",
    "html", "css", "rest api", "graphql", "microservices",
    "machine learning", "deep learning", "nlp", "computer vision",
    "large language models", "llm", "prompt engineering", "generative ai",
    "power bi", "tableau", "pandas", "numpy", "scikit-learn", "spacy",
    "hugging face", "data structures", "algorithms", "jwt", "socket.io",
    "tensorflow", "pytorch", "opencv", "azure ai", "azure openai",
    "data analytics", "excel", "agile", "scrum", "communication", "leadership"
}


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower()).strip()


def extract_skills(text: str) -> List[str]:
    normalized = normalize(text)
    found = []
    for skill in sorted(SKILLS, key=len, reverse=True):
        if re.search(rf"(?<!\w){re.escape(skill)}(?!\w)", normalized):
            found.append(skill)
    return sorted(set(found))


def semantic_similarity(resume_text: str, jd_text: str) -> float:
    docs = [normalize(resume_text), normalize(jd_text)]
    try:
        matrix = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), max_features=5000).fit_transform(docs)
        score = cosine_similarity(matrix[0:1], matrix[1:2])[0][0]
        return round(float(score) * 100, 2)
    except ValueError:
        return 0.0


def local_insights(resume_text: str, matched: List[str], missing: List[str], ats_score: float) -> Dict:
    lower = resume_text.lower()
    strengths = []
    weaknesses = []
    recommendations = []

    if len(matched) >= 5:
        strengths.append("Strong overlap between resume skills and job requirements.")
    if any(word in lower for word in ["project", "developed", "built", "implemented"]):
        strengths.append("Resume contains project-oriented and action-based evidence.")
    if any(word in lower for word in ["intern", "experience", "employment"]):
        strengths.append("Practical experience is visible in the resume.")
    if ats_score >= 75:
        strengths.append("Overall ATS compatibility is strong for this job description.")

    if missing:
        weaknesses.append("Several job-description skills are not clearly demonstrated.")
    if not re.search(r"\b\d+%|\b\d+\+|\b\d+\s*(users|projects|days|months|hours)\b", lower):
        weaknesses.append("Achievements could be strengthened with measurable impact.")
    if len(resume_text.split()) < 180:
        weaknesses.append("The resume may be too brief to provide sufficient evidence.")
    if len(resume_text.split()) > 900:
        weaknesses.append("The resume may be too long for quick recruiter review.")

    for skill in missing[:5]:
        recommendations.append(f"Build or document a small project that demonstrates {skill}.")
    recommendations.append("Add quantified results such as performance improvements, users served, or time saved.")
    recommendations.append("Use job-specific keywords naturally in project and experience bullet points.")

    return {
        "strengths": strengths or ["Resume includes useful technical information."],
        "weaknesses": weaknesses or ["No major structural weakness detected by the local analyzer."],
        "recommendations": recommendations[:7],
    }


async def azure_generate_questions(
    job_title: str, matched: List[str], missing: List[str], resume_text: str
) -> List[str] | None:
    if not all([settings.azure_ai_endpoint, settings.azure_ai_api_key, settings.azure_ai_deployment]):
        return None

    url = (
        f"{settings.azure_ai_endpoint.rstrip('/')}/openai/deployments/"
        f"{settings.azure_ai_deployment}/chat/completions"
        f"?api-version={settings.azure_ai_api_version}"
    )

    prompt = {
        "job_title": job_title,
        "matched_skills": matched,
        "missing_skills": missing,
        "resume_excerpt": resume_text[:4000],
        "instruction": (
            "Generate exactly 8 concise interview questions: 2 easy technical, "
            "2 intermediate technical, 2 project-based, 1 behavioral, and 1 gap-focused. "
            "Return only a JSON array of strings."
        ),
    }

    headers = {"api-key": settings.azure_ai_api_key, "Content-Type": "application/json"}
    payload = {
        "messages": [
            {"role": "system", "content": "You are a technical recruiter."},
            {"role": "user", "content": json.dumps(prompt)},
        ],
        "temperature": 0.4,
        "max_tokens": 700,
    }

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            content = response.json()["choices"][0]["message"]["content"]
            parsed = json.loads(content)
            if isinstance(parsed, list):
                return [str(q) for q in parsed][:8]
    except Exception:
        return None
    return None


def local_questions(job_title: str, matched: List[str], missing: List[str]) -> List[str]:
    questions = [
        f"Tell me about yourself and why you are interested in the {job_title} role.",
        "Describe the most technically challenging project you have completed.",
        "How did you test, debug, and improve the reliability of your application?",
    ]

    for skill in matched[:3]:
        questions.append(f"Explain how you used {skill} in a real project and the trade-offs you considered.")

    for skill in missing[:2]:
        questions.append(f"This role expects {skill}. How would you learn and apply it during your first month?")

    questions.append("Describe a situation where you collaborated with others to resolve a difficult problem.")
    return questions[:8]


async def analyze_resume(resume_text: str, jd_text: str, job_title: str) -> Dict:
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    matched = sorted(set(resume_skills) & set(jd_skills))
    missing = sorted(set(jd_skills) - set(resume_skills))

    skill_score = 100.0 if not jd_skills else round(len(matched) / len(jd_skills) * 100, 2)
    semantic_score = semantic_similarity(resume_text, jd_text)

    section_keywords = ["education", "experience", "projects", "skills", "achievements"]
    section_score = sum(k in normalize(resume_text) for k in section_keywords) / len(section_keywords) * 100

    action_verbs = ["developed", "built", "implemented", "improved", "designed", "deployed", "created"]
    action_score = min(sum(normalize(resume_text).count(v) for v in action_verbs) * 12.5, 100)

    ats_score = round(
        0.45 * skill_score +
        0.30 * semantic_score +
        0.15 * section_score +
        0.10 * action_score,
        2,
    )
    ats_score = float(np.clip(ats_score, 0, 100))

    insights = local_insights(resume_text, matched, missing, ats_score)
    questions = await azure_generate_questions(job_title, matched, missing, resume_text)
    if not questions:
        questions = local_questions(job_title, matched, missing)

    return {
        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "matched_skills": matched,
        "missing_skills": missing,
        "skill_match_score": skill_score,
        "semantic_score": semantic_score,
        "ats_score": ats_score,
        "strengths": insights["strengths"],
        "weaknesses": insights["weaknesses"],
        "recommendations": insights["recommendations"],
        "interview_questions": questions,
    }


def aggregate_skill_demand(rows) -> List[Dict]:
    counter = Counter()
    for row in rows:
        for skill in json.loads(row.matched_skills):
            counter[skill] += 1
    return [{"skill": skill, "count": count} for skill, count in counter.most_common(12)]
