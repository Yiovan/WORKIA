import os
import json
import logging
from io import BytesIO
import PyPDF2
# pyrefly: ignore [missing-import]
import docx
# pyrefly: ignore [missing-import]
from google import genai

logger = logging.getLogger(__name__)

FALLBACK_PROFILE = {
    "suggested_job_titles": ["Desarrollador de Software", "Programador Web"],
    "skills": ["JavaScript", "Python", "React"],
    "experience_level": "Mid",
    "suggested_locations": ["Remoto"],
    "match_summary": "Perfil tecnológico.",
}


def _get_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "TU_API_KEY_AQUI":
        return None
    return genai.Client(api_key=api_key)


def extract_text(file_content: bytes, filename: str) -> str:
    text = ""
    try:
        if filename.lower().endswith(".pdf"):
            reader = PyPDF2.PdfReader(BytesIO(file_content))
            for page in reader.pages:
                text += page.extract_text() + "\n"
        elif filename.lower().endswith(".docx"):
            doc = docx.Document(BytesIO(file_content))
            for para in doc.paragraphs:
                text += para.text + "\n"
        else:
            text = file_content.decode("utf-8", errors="ignore")
    except Exception as e:
        logger.error(f"Error extracting text: {e}")
    return text


def analyze_cv_with_ai(cv_text: str) -> dict:
    client = _get_client()
    if not client:
        return FALLBACK_PROFILE

    prompt = f"""
Eres un experto recruiter de nivel mundial.
Analiza este CV y devuelve SOLO un JSON válido (sin markdown) con esta estructura exacta:
{{
    "suggested_job_titles": ["titulo1", "titulo2", "titulo3"],
    "skills": ["skill1", "skill2", ...],
    "experience_level": "Junior | Mid | Senior",
    "suggested_locations": ["Remoto", "País si aplica"],
    "match_summary": "Frase motivadora breve sobre el perfil."
}}

CV:
{cv_text[:6000]}
"""
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        content = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(content)
    except Exception as e:
        logger.error(f"Error en análisis de CV: {e}")
        return FALLBACK_PROFILE


def score_jobs_with_ai(profile: dict, jobs: list) -> list:
    client = _get_client()
    if not client:
        for job in jobs:
            job["match_score"] = 75
            job["match_reason"] = "Análisis no disponible sin GEMINI_API_KEY."
        return [j for j in jobs if j.get("match_score", 0) >= 70]

    profile_summary = (
        f"Títulos sugeridos: {', '.join(profile.get('suggested_job_titles', []))}\n"
        f"Habilidades: {', '.join(profile.get('skills', []))}\n"
        f"Nivel: {profile.get('experience_level', '')}\n"
        f"Resumen: {profile.get('match_summary', '')}"
    )

    BATCH = 15
    scored = []

    for i in range(0, len(jobs), BATCH):
        batch = jobs[i: i + BATCH]
        jobs_list = "\n".join(
            f"{idx}. Título: {j.get('title','')} | Empresa: {j.get('company','')} "
            f"| Tags: {', '.join(j.get('tags', [])[:8])} "
            f"| Descripción: {str(j.get('description',''))[:200]}"
            for idx, j in enumerate(batch)
        )

        prompt = f"""
Eres un recruiter experto. Dado el perfil del candidato y la lista de ofertas laborales,
calcula qué tan probable es que el candidato sea aceptado en cada oferta (0-100%).
Considera: coincidencia de título, habilidades, nivel de experiencia y descripción del puesto.

PERFIL DEL CANDIDATO:
{profile_summary}

OFERTAS (índice. datos):
{jobs_list}

Devuelve SOLO un JSON válido (sin markdown) con esta estructura exacta:
[
  {{"index": 0, "score": 85, "reason": "Frase corta explicando el match"}},
  {{"index": 1, "score": 60, "reason": "..."}},
  ...
]
Incluye TODOS los índices del 0 al {len(batch)-1}.
"""
        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
            )
            content = response.text.replace("```json", "").replace("```", "").strip()
            scores = json.loads(content)
            for s in scores:
                idx = s.get("index", -1)
                if 0 <= idx < len(batch):
                    batch[idx]["match_score"] = s.get("score", 0)
                    batch[idx]["match_reason"] = s.get("reason", "")
        except Exception as e:
            logger.error(f"Error en scoring lote {i}: {e}")
            for job in batch:
                job.setdefault("match_score", 70)
                job.setdefault("match_reason", "No se pudo calcular el score.")

        scored.extend(batch)

    filtered = [j for j in scored if j.get("match_score", 0) >= 70]
    filtered.sort(key=lambda x: x.get("match_score", 0), reverse=True)
    return filtered
