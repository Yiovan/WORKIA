# 🚀 Workia: IA Job Matcher & CV Analyzer

**Workia** es un sistema automatizado inteligente que analiza un Currículum Vitae (CV) subido por el usuario, extrae las habilidades y años de experiencia clave utilizando Inteligencia Artificial, y automáticamente encuentra las ofertas de empleo relacionadas en distintas plataformas (Computrabajo, LinkedIn, RemoteOK, Remoto Latinos).

---

## 🧠 ¿Cómo funciona?

El sistema está dividido en dos grandes bloques tecnológicos que se comunican entre sí:

1. **Frontend (React + Vite)**: 
   - Provee una interfaz gráfica de aspecto *Premium* donde el usuario interactúa.
   - Envía el documento PDF/DOCX (arrastrado por el usuario) de forma asíncrona hacia nuestro servidor de backend.
   - Renderiza de manera animada el **Dashboard**, mostrando el perfil inferido y las tarjetas con los trabajos compatibles listos para aplicar.

2. **Backend (Python con FastAPI)**:
   - **Módulo `cv_parser.py`**: Utiliza `PyPDF2` y `python-docx` para extraer todo el texto del archivo en crudo.
   - **Integración con IA**: Envía el texto a **Google Gemini** para que lo interprete y lo convierta en datos útiles (`JSON` con habilidades, nivel de seniority, y títulos de trabajo ideales).
   - **Módulo `job_scraper.py`**: Con los títulos devueltos por la IA, el motor busca vacantes reales a través de APIs de empleo (ej. RemoteOK) y simula buscadores proxy para entregar los mejores vínculos directos ordenados por relevancia.

---

## 🛠️ Requisitos Previos

Asegúrate de tener instalados en tu computadora:

- **Python 3.9+**.
- **Node.js** (v16.x o superior).

---

## 🟢 Cómo Activar y Encender Workia

Para arrancar el sistema completo de manera local, debes inicializar tanto la "cara" visual (Frontend) como el "cerebro" (Backend) en **dos consolas (terminales) distintas**.

### 1️⃣ Encender el Backend (Inteligencia de Datos)

Abre tu primera terminal, navega hacia la carpeta raíz del proyecto y sigue estos comandos:

```bash
# 1. Entra a la carpeta backend
cd backend

# 2. Activa el entorno virtual de Python
# En Windows:
.\venv\Scripts\activate

# (Si no tienes el entorno creado ni las dependencias, primero corre:
# python -m venv venv  
# y luego: pip install -r requirements.txt)

# 3. Arranca el servidor FastAPI
uvicorn main:app --reload
```
*Si tienes éxito, verás un mensaje indicando que la aplicación inició en `http://localhost:8000`.*

### 2️⃣ Encender el Frontend (Interfaz Visual)

Abre la **segunda terminal**:

```bash
# 1. Entra a la carpeta del frontend
cd frontend

# (Solo si es la primera vez, instala las dependencias usando: npm install)

# 2. Inicia el servidor de desarrollo de React
npm run dev
```

Una vez ejecutado, aparecerá un mensaje indicando la dirección de Chrome/Edge donde ver la aplicación. Haz clic en **`http://localhost:5173/`** o cópialo y pégalo en tu navegador web. ¡La aplicación ya es funcional!

---

## 🔑 Activar Procesamiento de IA Real (API KEY)

Por defecto, Workia tiene un mecanismo seguro contra fallos. Si no le colocas una clave de inteligencia artificial, usará **datos de simulación predeterminados**.

**Para activar tu IA real:**
1. Ve a la carpeta `backend/`.
2. Abre el archivo llamado `.env` en tu editor de código.
3. Cambia el valor `TU_API_KEY_AQUI` por tu llave gratuita de Google Gemini (puedes obtenerla desde [Google AI Studio](https://aistudio.google.com/app/apikey)).
   ```env
   GEMINI_API_KEY=AIzaxxxxxxxxxxxxxxxx
   ```
4. Reinicia tu Backend (cierra la terminal y vuelve a poner `uvicorn main:app --reload`). 
5. Carga un nuevo CV y ahora la magia será analizada **100% en vivo**.
