import { useEffect, useState, useMemo, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GalaxyBackground from '../components/Landing/GalaxyBackground';
import MermaidBlock from '../components/MermaidBlock/MermaidBlock';
import { projects } from '../data/projects';
import { socialLinks } from '../data/social';
import './ProjectDetailPage.css';

const MEMOJIS = ['👩‍💻', '🧑‍💻', '👨‍💻'];

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projects.find(p => p.slug === slug);
  const [markdown, setMarkdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mdError, setMdError] = useState(false);

  const memoji = useMemo(() => MEMOJIS[Math.floor(Math.random() * MEMOJIS.length)], []);

  useEffect(() => {
    if (!project?.readmeFile) return;
    setLoading(true);
    setMdError(false);
    fetch(`/docs/${project.readmeFile}`)
      .then(res => {
        if (!res.ok) throw new Error('not found');
        return res.text();
      })
      .then(text => { setMarkdown(text); setLoading(false); })
      .catch(() => { setMdError(true); setLoading(false); });
  }, [project]);

  if (!project) {
    return (
      <div className="pdp-not-found">
        <h2>Project not found</h2>
        <button onClick={() => navigate('/')}>← Back to Portfolio</button>
      </div>
    );
  }

  return (
    <div className="sims-portfolio">
      <div className="sims-portfolio__canvas">
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }} gl={{ antialias: true, alpha: false }} dpr={[1, 1.5]}>
          <Suspense fallback={null}><GalaxyBackground /></Suspense>
        </Canvas>
      </div>

      <div className="sims-layout pdp-layout">

        {/* ═══════ LEFT: Content ═══════ */}
        <div className="sims-content">

          {/* Topbar */}
          <nav className="sims-topbar pdp-topbar">
            <button className="pdp-back-btn" onClick={() => navigate('/')}>
              ← Portfolio
            </button>
            <span className="pdp-topbar-divider">·</span>
            <span className="pdp-topbar-title">{project.title}</span>
            {project.series && (
              <span className="pdp-topbar-series">{project.series}</span>
            )}
            <span className="sims-topbar__user">
              Welcome back, uhhh... You!
              <span className="sims-topbar__avatar">{memoji}</span>
            </span>
          </nav>

          {/* Scrollable content */}
          <div className="sims-scroll-area">

            {/* Project header card */}
            <div className="pdp-header-card">
              <div className="pdp-header-top">
                <div>
                  <div className="pdp-cat-badge">{project.category}</div>
                  <h1 className="pdp-title">{project.title}</h1>
                  {project.series && <p className="pdp-series">{project.series}</p>}
                </div>
                <div className="pdp-header-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pdp-link-btn pdp-link-btn--primary">
                      Live Demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="pdp-link-btn">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>

              <p className="pdp-description">{project.description}</p>

              <div className="pdp-tech-row">
                {project.tech.map((t, i) => (
                  <span key={i} className="pdp-tech-badge">{t}</span>
                ))}
              </div>

              {project.highlights?.length > 0 && (
                <div className="pdp-highlights">
                  <h3 className="pdp-highlights-title">Highlights</h3>
                  <ul className="pdp-highlights-list">
                    {project.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* README section */}
            <div className="pdp-readme-section">
              <div className="sims-section-header" style={{ marginLeft: '2rem' }}>
                <h2 className="sims-section-header__title">README</h2>
              </div>

              <div className="pdp-readme-body">
                {loading && (
                  <div className="pdp-loading">Loading README...</div>
                )}

                {!loading && mdError && (
                  <div className="pdp-no-readme">
                    <p>README coming soon.</p>
                    <p>Full documentation will be available here once published.</p>
                  </div>
                )}

                {!loading && !project.readmeFile && (
                  <div className="pdp-no-readme">
                    <p>README coming soon.</p>
                    <p>Full documentation will be available here once published.</p>
                  </div>
                )}

                {!loading && markdown && (
                  <div className="pdp-markdown">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ className, children }) {
                          const lang = /language-(\w+)/.exec(className || '')?.[1];
                          if (lang === 'mermaid') {
                            return <MermaidBlock code={String(children)} />;
                          }
                          return <code className={className}>{children}</code>;
                        },
                        // Open all links in new tab
                        a({ href, children }) {
                          return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
                        },
                      }}
                    >
                      {markdown}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>

            <footer className="sims-footer">
              <div className="sims-footer__marquee">
                <span className="sims-footer__marquee-text">
                  &copy; {new Date().getFullYear()} SITI NURSYAQIRAH BINTI OSMAN &bull; SOFTWARE DEVELOPER &bull; MALAYSIA &nbsp;&nbsp;&nbsp;&nbsp;
                  &copy; {new Date().getFullYear()} SITI NURSYAQIRAH BINTI OSMAN &bull; SOFTWARE DEVELOPER &bull; MALAYSIA &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </div>
            </footer>
          </div>
        </div>

        {/* ═══════ RIGHT: Sidebar ═══════ */}
        <aside className="sims-sidebar">
          <div className="sims-sidebar__logo">
            <span className="sims-sidebar__logo-the">The</span>
            <span className="sims-sidebar__logo-main">Syaqirah</span>
          </div>

          <span className="sims-sidebar__resume sims-sidebar__resume--disabled">
            Resume
          </span>

          <div className="sims-sidebar__tooltip sims-sidebar__tooltip--dark">
            <strong>Reading the docs?</strong>{' '}
            Appreciate it. Here's what Syaqirah has been up to.
          </div>

          <div className="sims-sidebar__menu">
            <button className="sims-sidebar__btn" onClick={() => navigate('/')}>
              <span className="sims-sidebar__btn-icon">🏠</span>
              <span className="sims-sidebar__btn-text">Home</span>
            </button>
            <button className="sims-sidebar__btn" onClick={() => navigate('/')}>
              <span className="sims-sidebar__btn-icon">📂</span>
              <span className="sims-sidebar__btn-text">Projects</span>
            </button>
            <button className="sims-sidebar__btn" onClick={() => navigate('/')}>
              <span className="sims-sidebar__btn-icon">👤</span>
              <span className="sims-sidebar__btn-text">About Me</span>
            </button>
          </div>

          <div className="sims-sidebar__bottom">
            <div className="sims-sidebar__socials">
              {socialLinks.map(l => (
                <a key={l.name} href={l.url} className="sims-sidebar__social"
                   target="_blank" rel="noopener noreferrer" title={l.name}>
                  {l.icon === 'github' ? '🔗' : l.icon === 'linkedin' ? '💼'
                    : l.icon === 'twitter' ? '🐦' : '✉️'}
                </a>
              ))}
            </div>
            <span className="sims-sidebar__version">Version 1.69.420</span>
            <span className="sims-sidebar__links">
              <button className="sims-sidebar__link" onClick={() => navigate('/')}>
                ← back to portfolio
              </button>
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
