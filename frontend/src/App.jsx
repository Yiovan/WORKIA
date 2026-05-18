import { useState, useRef, useEffect } from 'react'
import 'material-symbols/outlined.css'

function Icon({ name, size = 24, color, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: size, color: color, lineHeight: 1 }}
    >
      {name}
    </span>
  )
}
import './App.css'

// ─── Landing Sections ────────────────────────────────────────────────────────

function Navbar({ onCTAClick }) {
  return (
    <nav className="navbar">
      <span className="nav-logo">Workia</span>
      <ul className="nav-links">
        <li><a href="#how-it-works">Cómo funciona</a></li>
        <li><a href="#features">Características</a></li>
        <li><a href="#testimonials">Testimonios</a></li>
        <li><a href="#app" className="nav-cta" onClick={onCTAClick}>Probar gratis</a></li>
      </ul>
    </nav>
  )
}

function Hero({ onCTAClick }) {
  return (
    <section className="hero">
      <div className="hero-badge">
        <span className="dot" />
        Impulsado por Gemini AI
      </div>

      <h1 className="hero-title">
        Tu próximo trabajo
        <span className="gradient-text">te está esperando</span>
      </h1>

      <p className="hero-subtitle">
        Sube tu CV y en segundos nuestra IA analiza tu perfil, detecta tus fortalezas
        y encuentra las mejores ofertas laborales del mercado para ti.
      </p>

      <div className="hero-actions">
        <button className="btn-primary" onClick={onCTAClick}>
          <Icon name="auto_awesome" size={18} /> Analizar mi CV gratis
        </button>
        <a href="#how-it-works" className="btn-secondary">
          Ver cómo funciona <Icon name="expand_more" size={18} />
        </a>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">3s</span>
          <span className="stat-label">Análisis de CV</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">+50</span>
          <span className="stat-label">Ofertas por búsqueda</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">4</span>
          <span className="stat-label">Plataformas integradas</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Gratis</span>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: '1',
      icon: <Icon name="description" size={22} />,
      title: 'Sube tu CV',
      desc: 'Arrastra tu archivo PDF o DOCX. Soportamos todos los formatos de currículum modernos.'
    },
    {
      number: '2',
      icon: <Icon name="psychology" size={22} />,
      title: 'La IA lo analiza',
      desc: 'Gemini AI extrae tus habilidades, experiencia y nivel profesional en segundos.'
    },
    {
      number: '3',
      icon: <Icon name="search" size={22} />,
      title: 'Recibe ofertas',
      desc: 'Buscamos en RemoteOK, LinkedIn, Computrabajo y más para encontrar tu match perfecto.'
    }
  ]

  return (
    <section className="section" id="how-it-works">
      <p className="section-label">Proceso</p>
      <h2 className="section-title">Tan simple como 1, 2, 3</h2>
      <p className="section-subtitle">
        Sin registros, sin formularios interminables. Solo sube tu CV y deja que la IA haga el trabajo.
      </p>
      <div className="steps-grid">
        {steps.map((s) => (
          <div className="step-card" key={s.number}>
            <div className="step-number">{s.number}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      icon: '🧠', cls: 'blue',
      title: 'Análisis con IA de última generación',
      desc: 'Usamos Gemini 1.5 Pro para entender tu perfil profesional con precisión de recruiter senior.'
    },
    {
      icon: '⚡', cls: 'purple',
      title: 'Resultados en tiempo real',
      desc: 'En menos de 10 segundos tienes tu perfil analizado y ofertas laborales personalizadas.'
    },
    {
      icon: '🌎', cls: 'pink',
      title: 'Búsqueda multi-plataforma',
      desc: 'Agregamos resultados de RemoteOK, LinkedIn, Computrabajo y Remoto Latinos en un solo lugar.'
    },
    {
      icon: '🎯', cls: 'green',
      title: 'Match inteligente de roles',
      desc: 'La IA sugiere los títulos de trabajo exactos que maximizan tus chances de ser contratado.'
    },
    {
      icon: '🔒', cls: 'blue',
      title: 'Tu CV es privado',
      desc: 'No almacenamos tu información. El análisis ocurre en tiempo real y no guardamos datos.'
    },
    {
      icon: '📊', cls: 'purple',
      title: 'Perfil profesional detallado',
      desc: 'Obtén un resumen de tus habilidades clave, nivel de experiencia y áreas de mejora.'
    }
  ]

  return (
    <section className="section" id="features">
      <p className="section-label">Características</p>
      <h2 className="section-title">Todo lo que necesitas para conseguir trabajo</h2>
      <p className="section-subtitle">
        Workia combina inteligencia artificial con búsqueda de empleo en tiempo real.
      </p>
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className={`feature-icon ${f.cls}`}>{f.icon}</div>
            <div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Platforms() {
  const platforms = ['RemoteOK', 'LinkedIn', 'Computrabajo', 'Remoto Latinos', 'Gemini AI']
  return (
    <div className="platforms-section">
      <p className="platforms-label">Integrado con las mejores plataformas</p>
      <div className="platforms-list">
        {platforms.map(p => <span className="platform-pill" key={p}>{p}</span>)}
      </div>
    </div>
  )
}

function Testimonials() {
  const testimonials = [
    {
      stars: '★★★★★',
      text: '"Subí mi CV y en 5 segundos tenía 10 ofertas relevantes. Conseguí entrevistas en empresas que ni sabía que buscaban mi perfil."',
      name: 'Martina G.',
      role: 'Diseñadora UX · Buenos Aires',
      initials: 'MG'
    },
    {
      stars: '★★★★★',
      text: '"La IA detectó habilidades en mi CV que yo ni había destacado. Los roles sugeridos fueron exactamente lo que buscaba."',
      name: 'Carlos R.',
      role: 'Desarrollador Backend · México',
      initials: 'CR'
    },
    {
      stars: '★★★★★',
      text: '"Increíble que sea gratis. Antes pasaba horas buscando en LinkedIn, ahora en segundos tengo todo centralizado."',
      name: 'Valentina S.',
      role: 'Data Analyst · Colombia',
      initials: 'VS'
    }
  ]

  return (
    <section className="section" id="testimonials">
      <p className="section-label">Testimonios</p>
      <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
      <p className="section-subtitle">Personas reales que encontraron trabajo con Workia.</p>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <div className="testimonial-stars">{t.stars}</div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="author-avatar">{t.initials}</div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTASection({ onCTAClick }) {
  return (
    <div className="cta-section">
      <div className="cta-card">
        <h2>¿Listo para encontrar tu próximo trabajo?</h2>
        <p>Únete a miles de profesionales que ya usan Workia para acelerar su búsqueda laboral. Gratis, sin registro.</p>
        <button className="btn-primary" onClick={onCTAClick}>
          <Icon name="auto_awesome" size={18} /> Analizar mi CV ahora
        </button>
      </div>
    </div>
  )
}

// ─── App Section (original functionality) ────────────────────────────────────

function getScoreColor(score) {
  if (score >= 90) return { color: '#34d399', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)' }
  if (score >= 80) return { color: '#60a5fa', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)' }
  return { color: '#c084fc', bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.25)' }
}

function getPlatformEmoji(platform) {
  const map = { 'RemoteOK': '🌐', 'LinkedIn': '💼', 'Computrabajo': '🏢', 'Remoto Latinos': '🌎' }
  return map[platform] || '💡'
}

function getExperienceClass(level) {
  if (!level) return 'mid'
  const l = level.toLowerCase()
  if (l.includes('junior')) return 'junior'
  if (l.includes('senior')) return 'senior'
  return 'mid'
}

function AppSection({ appRef }) {
  const [file, setFile] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const fileInputRef = useRef(null)

  const loadingSteps = [
    'Extrayendo texto del CV...',
    'Analizando perfil con Gemini AI...',
    'Buscando ofertas en plataformas...',
    'Preparando resultados...'
  ]

  useEffect(() => {
    if (!loading) return
    setLoadingStep(0)
    const intervals = loadingSteps.map((_, i) =>
      setTimeout(() => setLoadingStep(i), i * 2200)
    )
    return () => intervals.forEach(clearTimeout)
  }, [loading])

  const handleDragOver = (e) => { e.preventDefault(); setIsHovering(true) }
  const handleDragLeave = () => setIsHovering(false)
  const handleDrop = (e) => {
    e.preventDefault(); setIsHovering(false)
    const f = e.dataTransfer.files[0]
    if (f) processFile(f)
  }
  const handleFileChange = (e) => {
    const f = e.target.files[0]
    if (f) processFile(f)
  }

  const processFile = async (selectedFile) => {
    const name = selectedFile.name.toLowerCase()
    if (!name.endsWith('.pdf') && !name.endsWith('.docx')) {
      setError('Por favor sube un archivo PDF o DOCX válido.')
      return
    }
    setFile(selectedFile)
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const apiBase = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${apiBase}/api/analyze`, {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      if (result.status === 'error') {
        setError(result.message || 'Error al analizar el CV.')
      } else {
        setData(result)
      }
    } catch (err) {
      setError('Error conectando con el servidor. ¿Está el backend iniciado en el puerto 8000?')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setData(null); setFile(null); setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div ref={appRef} id="app">
      <div className="section-divider">
        <div className="divider-line" />
        <span className="divider-label">Pruébalo ahora</span>
        <div className="divider-line" />
      </div>

      <div className="app-section">
        {!data && !loading && (
          <>
            <div className="app-section-header">
              <h2>Analiza tu CV con IA</h2>
              <p>Sube tu currículum y encuentra las mejores ofertas laborales para tu perfil</p>
            </div>

            <div
              className={`upload-container ${isHovering ? 'drag-active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-icon-wrapper">
                <Icon name="cloud_upload" className="upload-icon" />
              </div>
              <h3>Sube tu Currículum Vitae</h3>
              <p>Arrastra y suelta aquí, o haz clic para buscar</p>
              <div className="upload-formats">
                <span className="format-badge">PDF</span>
                <span className="format-badge">DOCX</span>
              </div>
              {error && (
                <p className="upload-error">⚠ {error}</p>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".pdf,.docx"
              />
            </div>
          </>
        )}

        {loading && (
          <div className="loading-state">
            <div className="loading-orb" />
            <h3>Analizando tu CV</h3>
            <p>Esto solo toma unos segundos...</p>
            <div className="loading-steps">
              {loadingSteps.map((step, i) => (
                <div key={i} className={`loading-step ${i <= loadingStep ? 'active' : ''}`}>
                  <div className="step-dot" />
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {data && (
          <div className="dashboard">
            {/* Profile Sidebar */}
            <div className="card profile-card">
              <div className="profile-header">
                <h2>Tu Perfil</h2>
                <button onClick={handleReset} className="back-btn">
                  <Icon name="arrow_back" size={14} /> Volver
                </button>
              </div>

              <div className={`experience-badge ${getExperienceClass(data.profile.experience_level)}`}>
                <Icon name="star" size={14} />
                {data.profile.experience_level}
              </div>

              <div className="profile-section">
                <h4>Roles Sugeridos</h4>
                <div className="tag-list">
                  {data.profile.suggested_job_titles?.map((role, i) => (
                    <span key={i} className="tag">{role}</span>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <h4>Habilidades Clave</h4>
                <div className="tag-list">
                  {data.profile.skills?.map((skill, i) => (
                    <span key={i} className="tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <h4>Análisis de la IA</h4>
                <p className="summary-text">"{data.profile.match_summary}"</p>
              </div>
            </div>

            {/* Jobs List */}
            <div>
              <div className="jobs-header">
                <Icon name="work" size={22} color="#6366f1" />
                Ofertas Recomendadas
                <span className="jobs-count">{data.jobs?.length || 0}</span>
              </div>

              <div className="job-list">
                {data.jobs?.length > 0 ? (
                  data.jobs.map((job, idx) => (
                    <div className="job-card" key={idx}>
                      <div className="job-logo">
                        {job.logo
                          ? <img src={job.logo} alt={job.company} />
                          : getPlatformEmoji(job.platform)
                        }
                      </div>
                      <div className="job-info">
                        <h3>{job.title}</h3>
                        <div className="job-meta">
                          <span className="meta-item"><Icon name="domain" size={14} /> {job.company}</span>
                          <span className="meta-item"><Icon name="location_on" size={14} /> {job.location}</span>
                          <span className="meta-item"><Icon name="attach_money" size={14} /> {job.salary}</span>
                          <span className="platform-tag">{job.platform}</span>
                        </div>
                        {job.match_reason && (
                          <p className="match-reason">✦ {job.match_reason}</p>
                        )}
                      </div>
                      <div className="job-right">
                        {job.match_score != null && (() => {
                          const s = getScoreColor(job.match_score)
                          return (
                            <div className="match-score-badge" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
                              <span className="score-number">{job.match_score}%</span>
                              <span className="score-label">match</span>
                            </div>
                          )
                        })()}
                        <a href={job.url} target="_blank" rel="noopener noreferrer" className="apply-btn">
                          Postular →
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>
                      No se encontraron trabajos exactos. Intenta añadir más habilidades a tu CV.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────

function App() {
  const appRef = useRef(null)

  const scrollToApp = () => {
    appRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="ambient-blob blob-1" />
      <div className="ambient-blob blob-2" />
      <div className="ambient-blob blob-3" />

      <div className="page-wrapper">
        <Navbar onCTAClick={scrollToApp} />
        <Hero onCTAClick={scrollToApp} />
        <Platforms />
        <HowItWorks />
        <Features />
        <Testimonials />
        <CTASection onCTAClick={scrollToApp} />
        <AppSection appRef={appRef} />

        <footer className="footer">
          <div className="footer-logo">Workia</div>
          <p>Potenciando carreras con Inteligencia Artificial · {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  )
}

export default App
