import urllib.parse
import asyncio
import aiohttp
import logging

logger = logging.getLogger(__name__)

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; Workia/1.0)"}


async def fetch_remoteok(session: aiohttp.ClientSession, job_title: str) -> list:
    """Busca en RemoteOK API (gratuita, sin auth)."""
    jobs = []
    try:
        url = f"https://remoteok.com/api?tag={urllib.parse.quote(job_title)}"
        async with session.get(url, headers=HEADERS, timeout=aiohttp.ClientTimeout(total=8)) as res:
            if res.status == 200:
                data = await res.json(content_type=None)
                for d in data[1:11]:  # hasta 10 resultados por título
                    if isinstance(d, dict) and d.get("position"):
                        salary = (
                            f'${d["salary_min"]} - ${d["salary_max"]}'
                            if d.get("salary_min") and d.get("salary_max")
                            else "A convenir"
                        )
                        jobs.append({
                            "title": d.get("position", ""),
                            "company": d.get("company", ""),
                            "location": d.get("location") or "Remoto",
                            "url": d.get("url", ""),
                            "platform": "RemoteOK",
                            "salary": salary,
                            "logo": d.get("company_logo", ""),
                            "tags": d.get("tags", []),
                            "description": d.get("description", ""),
                        })
    except Exception as e:
        logger.warning(f"RemoteOK error para '{job_title}': {e}")
    return jobs


async def fetch_remotive(session: aiohttp.ClientSession, job_title: str) -> list:
    """Busca en Remotive API (gratuita, sin auth)."""
    jobs = []
    try:
        url = f"https://remotive.com/api/remote-jobs?search={urllib.parse.quote(job_title)}&limit=10"
        async with session.get(url, headers=HEADERS, timeout=aiohttp.ClientTimeout(total=8)) as res:
            if res.status == 200:
                data = await res.json(content_type=None)
                for d in data.get("jobs", [])[:10]:
                    jobs.append({
                        "title": d.get("title", ""),
                        "company": d.get("company_name", ""),
                        "location": d.get("candidate_required_location") or "Remoto",
                        "url": d.get("url", ""),
                        "platform": "Remotive",
                        "salary": d.get("salary") or "A convenir",
                        "logo": d.get("company_logo", ""),
                        "tags": d.get("tags", []),
                        "description": d.get("description", "")[:500],
                    })
    except Exception as e:
        logger.warning(f"Remotive error para '{job_title}': {e}")
    return jobs


def build_aggregator_links(titles: list, location: str) -> list:
    """
    Para plataformas sin API pública gratuita genera links de búsqueda directa
    por cada título sugerido (Computrabajo, LinkedIn, Remoto Latinos, Indeed).
    """
    jobs = []
    platforms = [
        {
            "name": "LinkedIn",
            "url_fn": lambda t, l: (
                f"https://www.linkedin.com/jobs/search?keywords={urllib.parse.quote(t)}"
                f"&location={urllib.parse.quote(l)}"
            ),
        },
        {
            "name": "Computrabajo",
            "url_fn": lambda t, l: (
                f"https://ar.computrabajo.com/trabajo-de-{urllib.parse.quote(t.lower().replace(' ', '-'))}"
            ),
        },
        {
            "name": "Remoto Latinos",
            "url_fn": lambda t, l: (
                f"https://remotolatinos.com/?s={urllib.parse.quote(t)}"
            ),
        },
        {
            "name": "Indeed",
            "url_fn": lambda t, l: (
                f"https://www.indeed.com/jobs?q={urllib.parse.quote(t)}&l={urllib.parse.quote(l)}"
            ),
        },
    ]
    for title in titles:
        for p in platforms:
            jobs.append({
                "title": f"{title}",
                "company": f"Ver ofertas en {p['name']}",
                "location": location or "Remoto",
                "url": p["url_fn"](title, location or "Remoto"),
                "platform": p["name"],
                "salary": "Ver en plataforma",
                "logo": "",
                "tags": [],
                "description": f"Búsqueda de {title} en {p['name']}",
            })
    return jobs


async def fetch_jobs_from_platforms(titles: list, location: str) -> list:
    """
    Busca en paralelo en todas las fuentes disponibles usando todos los títulos sugeridos.
    """
    all_jobs = []

    async with aiohttp.ClientSession() as session:
        tasks = []
        for title in titles[:3]:  # máximo 3 títulos para no saturar
            tasks.append(fetch_remoteok(session, title))
            tasks.append(fetch_remotive(session, title))

        results = await asyncio.gather(*tasks, return_exceptions=True)
        for r in results:
            if isinstance(r, list):
                all_jobs.extend(r)

    # Deduplicar por URL
    seen_urls = set()
    unique_jobs = []
    for job in all_jobs:
        url = job.get("url", "")
        if url and url not in seen_urls:
            seen_urls.add(url)
            unique_jobs.append(job)

    # Agregar links de plataformas sin API
    aggregator = build_aggregator_links(titles[:3], location)
    unique_jobs.extend(aggregator)

    return unique_jobs
