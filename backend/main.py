from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv

from cv_parser import extract_text, analyze_cv_with_ai, score_jobs_with_ai
from job_scraper import fetch_jobs_from_platforms

load_dotenv()

app = FastAPI(title="Workia API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite al frontend conectarse
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Workia API is running"}

@app.post("/api/analyze")
async def analyze_and_search(file: UploadFile = File(...)):
    # 1. Leer archivo
    content = await file.read()
    
    # 2. Extraer texto
    cv_text = extract_text(content, file.filename)
    if not cv_text.strip():
        return {"status": "error", "message": "No se pudo extraer texto del CV. Asegúrate de que el PDF no sea una imagen escaneada."}
    
    # 3. Analizar perfil usando IA
    profile = analyze_cv_with_ai(cv_text)
    
    # Obtener el titulo principal sugerido y ubicación
    titles = profile.get("suggested_job_titles", [])
    locations = profile.get("suggested_locations", [])
    main_location = locations[0] if locations else "Remoto"
    
    # 4. Motor de búsqueda
    jobs = await fetch_jobs_from_platforms(titles, main_location)

    # 5. Calcular match score con IA y filtrar < 70%
    jobs = score_jobs_with_ai(profile, jobs)

    return {
        "status": "success",
        "profile": profile,
        "jobs": jobs
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
