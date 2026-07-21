import re
from io import BytesIO
from typing import Dict

from docx import Document
from pypdf import PdfReader


def extract_text(filename: str, content: bytes) -> str:
    lower = filename.lower()

    if lower.endswith(".pdf"):
        reader = PdfReader(BytesIO(content))
        return "\n".join(page.extract_text() or "" for page in reader.pages)

    if lower.endswith(".docx"):
        document = Document(BytesIO(content))
        return "\n".join(p.text for p in document.paragraphs)

    if lower.endswith(".txt"):
        return content.decode("utf-8", errors="ignore")

    raise ValueError("Unsupported file type. Upload PDF, DOCX, or TXT.")


def parse_contact_details(text: str) -> Dict[str, str]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    email_match = re.search(r"[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}", text)
    phone_match = re.search(r"(?:\+?\d{1,3}[-.\s]?)?(?:\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4})", text)

    possible_name = ""
    for line in lines[:6]:
        if (
            2 <= len(line.split()) <= 5
            and not re.search(r"@|\d|resume|curriculum|objective", line, re.I)
        ):
            possible_name = line
            break

    return {
        "name": possible_name,
        "email": email_match.group(0) if email_match else "",
        "phone": phone_match.group(0) if phone_match else "",
    }


def extract_section(text: str, heading: str, next_headings: list[str]) -> str:
    pattern = rf"(?is)\b{re.escape(heading)}\b\s*[:\-]?\s*(.*?)(?=\n\s*(?:{'|'.join(map(re.escape, next_headings))})\b|$)"
    match = re.search(pattern, text)
    if not match:
        return ""
    return re.sub(r"\s+", " ", match.group(1)).strip()[:1500]
