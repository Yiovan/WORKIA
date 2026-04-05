<div align="center">

```
 __        __         _    _
 \ \      / /__  _ __| | _(_) __ _
  \ \ /\ / / _ \| '__| |/ / |/ _` |
   \ V  V / (_) | |  |   <| | (_| |
    \_/\_/ \___/|_|  |_|\_\_|\__,_|
```

**AI-Powered CV Analyzer & Job Matcher**

![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?style=flat-square&logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-8B5CF6?style=flat-square)

*Upload your CV. Get your profile analyzed. Find your next job — in seconds.*

</div>

---

## Overview

Workia is a full-stack application that takes a CV (PDF or DOCX), extracts its content, sends it to **Google Gemini AI** for deep profile analysis, then searches multiple job platforms in parallel and scores each result by compatibility — filtering out anything below 70% match.

```
[ User uploads CV ]
        |
        v
[ Text extraction ]  ──>  PyPDF2 / python-docx
        |
        v
[ AI Profile Analysis ]  ──>  Gemini 2.0 Flash
        |                      skills, titles, level, locations
        v
[ Parallel Job Search ]  ──>  RemoteOK API + Remotive API
        |                      + LinkedIn / Computrabajo / Indeed / Remoto Latinos links
        v
[ AI Match Scoring ]  ──>  Gemini scores each job 0-100%
        |                    filters < 70%, sorts by score
        v
[ Dashboard ]  ──>  Profile card + ranked job listings
```

---

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | React 18, Vite, Lucide Icons                    |
| Backend  | Python 3.9+, FastAPI, Uvicorn                   |
| AI       | Google Gemini 2.0 Flash (`google-genai` SDK)    |
| HTTP     | aiohttp (async parallel requests)               |
| Parsing  | PyPDF2, python-docx                             |
| Job APIs | RemoteOK, Remotive (free, no auth required)     |

---

## Prerequisites

- **Python 3.9+**
- **Node.js 16+**
- A free **Gemini API key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## Getting Started

You need two terminals running simultaneously — one for the backend, one for the frontend.

### 1 — Backend

```bash
cd backend

# First time only
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux
pip install -r requirements.txt

# Every time
venv\Scripts\activate
uvicorn main:app --reload
```

Server starts at `http://localhost:8000`

### 2 — Frontend

```bash
cd frontend

# First time only
npm install

# Every time
npm run dev
```

App available at `http://localhost:5173`

---

## Configuration

Copy the example and set your API key:

```bash
# backend/.env
GEMINI_API_KEY=AIzaSy...your_key_here
```

Get your free key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
The free tier includes 15 requests/min and 1M tokens/day — more than enough.

> Without a key, Workia falls back to mock data so you can still test the UI.

---

## Project Structure

```
workia/
├── backend/
│   ├── main.py          # FastAPI app, /api/analyze endpoint
│   ├── cv_parser.py     # Text extraction + Gemini AI analysis + job scoring
│   ├── job_scraper.py   # Async parallel job search across platforms
│   ├── requirements.txt
│   └── .env             # GEMINI_API_KEY goes here (never commit this)
│
└── frontend/
    ├── src/
    │   ├── App.jsx      # Full UI: landing page + upload flow + dashboard
    │   └── App.css      # Styles
    └── index.html
```

---

## How the AI Scoring Works

After collecting jobs from all platforms, Workia sends them to Gemini in batches of 15 with the candidate's profile. Gemini returns a compatibility score (0–100) and a short reason for each job. Any result below **70%** is discarded. The rest are sorted highest to lowest before being shown.

---

## License

MIT
