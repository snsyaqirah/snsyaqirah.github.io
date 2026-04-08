import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import GalaxyBackground from '../components/Landing/GalaxyBackground';
import { personalInfo, socialLinks } from '../data/social';
import { projects } from '../data/projects';
import { skills, getTopSkills } from '../data/skills';
import './PortfolioPage.css';

/* ── Random memoji pool ── */
const MEMOJIS = ['🧑‍💻','👩‍💻','🧑‍🎨','👨‍🚀','🧑‍🔬','👩‍🎤','🧑‍🏫','👨‍💼','👩‍🔧','🧝‍♀️','🧙‍♂️','🦊','🐱','🐻','🤖','👾','🎃','🌸','🍄','🦄'];

/* ── Category color map (flat, 4-color palette) ── */
const CAT_COLOR = {
  Frontend:     '#3D3BC1',
  Backend:      '#3D3BC1',
  'Full Stack': '#3D3BC1',
  Design:       '#3D3BC1',
  Mobile:       '#3D3BC1',
};

/* ── Top-bar tabs ── */
const TABS = [
  { id: 'home',     label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about',    label: 'About' },
  { id: 'contact',  label: 'Contact' },
];

/* ── Sidebar nav items ── */
const SIDEBAR_NAV = [
  { icon: '🏠', label: 'Home',       target: 'home' },
  { icon: '📂', label: 'Projects',   target: 'projects' },
  { icon: '👤', label: 'About Me',   target: 'about' },
  { icon: '✉️', label: 'Contact Me', target: 'contact' },
];

/* ── Feature cards for the Home section (3 boxes) ── */
const HOME_CARDS = [
  {
    bg: '#3D3BC1',
    emoji: '🚀',
    title: 'Full Stack Dev',
    sub: 'React · Node · MongoDB',
  },
  {
    bg: '#3D3BC1',
    emoji: '🎨',
    title: 'Creative Design',
    sub: 'Figma · CSS · Motion',
  },
  {
    bg: '#3D3BC1',
    emoji: '⚡',
    title: 'Fast Learner',
    sub: 'Always exploring new tech',
  },
];

export default function PortfolioPage() {
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  /* Pick one random memoji per mount */
  const memoji = useMemo(() => MEMOJIS[Math.floor(Math.random() * MEMOJIS.length)], []);

  /* Scroll spy */
  useEffect(() => {
    const c = contentRef.current;
    if (!c) return;
    const onScroll = () => {
      for (const { id } of [...TABS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) { setActiveTab(id); break; }
      }
    };
    c.addEventListener('scroll', onScroll, { passive: true });
    return () => c.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const topSkills = getTopSkills();
  const handleSubmit = (e) => { e.preventDefault(); setFormData({ name: '', email: '', message: '' }); };

  return (
    <div className="sims-portfolio">
      {/* ── 3D galaxy background ── */}
      <div className="sims-portfolio__canvas">
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }} gl={{ antialias: true, alpha: false }} dpr={[1, 1.5]}>
          <Suspense fallback={null}><GalaxyBackground /></Suspense>
        </Canvas>
      </div>

      {/* ── Two-column layout ── */}
      <div className="sims-layout">

        {/* ═══════ LEFT: Scrollable content ═══════ */}
        <div className="sims-content" ref={contentRef}>

          {/* Top navigation */}
          <nav className="sims-topbar">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`sims-topbar__tab${activeTab === t.id ? ' sims-topbar__tab--active' : ''}`}
                onClick={() => scrollTo(t.id)}
              >
                {t.label}
              </button>
            ))}
            <span className="sims-topbar__user">
              Welcome back, uhhh... You!
              <span className="sims-topbar__avatar">{memoji}</span>
            </span>
          </nav>

          {/* ══════ HOME ══════ */}
          <section id="home">
            <div className="sims-subfilter">
              <button className="sims-subfilter__btn sims-subfilter__btn--filled">
                <span className="sims-subfilter__arrow">▾</span> Packs
              </button>
              <button className="sims-subfilter__btn sims-subfilter__btn--filled"
                      onClick={() => scrollTo('about')}>
                View Collections
              </button>
            </div>

            {/* 3 featured boxes */}
            <div className="sims-home-cards">
              {HOME_CARDS.map((c, i) => (
                <div className="sims-home-card" key={i} style={{ background: c.bg }}>
                  <span className="sims-home-card__emoji">{c.emoji}</span>
                  <h3 className="sims-home-card__title">{c.title}</h3>
                  <p className="sims-home-card__sub">{c.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ══════ PROJECTS ══════ */}
          <section id="projects">
            <div className="sims-section-header">
              <h2 className="sims-section-header__title">Projects</h2>
            </div>

            <div className="sims-packs-grid">
              {projects.map(p => (
                <div className="sims-pack" key={p.id}>
                  <div
                    className="sims-pack__art"
                    style={{ background: CAT_COLOR[p.category] || CAT_COLOR.Frontend }}
                  >
                    {/* Hover overlay — title + category + tech + links */}
                    <div className="sims-pack__overlay">
                      <span className="sims-pack__overlay-title">{p.title}</span>
                      <span className="sims-pack__overlay-cat">{p.category}</span>
                      <span className="sims-pack__overlay-tech">
                        {p.tech.slice(0, 3).join(' · ')}
                      </span>
                      <div className="sims-pack__overlay-links">
                        {p.liveUrl && (
                          <a href={p.liveUrl} className="sims-pack__overlay-btn sims-pack__overlay-btn--primary"
                             target="_blank" rel="noopener noreferrer">
                            Live Demo
                          </a>
                        )}
                        {p.githubUrl && (
                          <a href={p.githubUrl} className="sims-pack__overlay-btn"
                             target="_blank" rel="noopener noreferrer">
                            Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════ ABOUT / SKILLS / RESUME ══════ */}
          <section id="about">
            <div className="sims-section-header">
              <h2 className="sims-section-header__title">About Me</h2>
            </div>

            <div className="sims-about-grid">
              {/* Bio card */}
              <div className="sims-info-card">
                <h3 className="sims-info-card__title">Who Am I?</h3>
                <p className="sims-info-card__line">{personalInfo.bio}</p>
                <ul className="sims-info-card__list">
                  <li>📍 {personalInfo.location}</li>
                  <li>✉️ {personalInfo.email}</li>
                  <li>💼 {personalInfo.availability}</li>
                </ul>
              </div>

              {/* Top Skills card */}
              <div className="sims-info-card">
                <h3 className="sims-info-card__title">Top Skills</h3>
                <div className="sims-skills">
                  {topSkills.slice(0, 6).map(s => (
                    <div className="sims-skill-row" key={s.name}>
                      <span className="sims-skill-row__icon">{s.icon}</span>
                      <span className="sims-skill-row__name">{s.name}</span>
                      <div className="sims-skill-row__track">
                        <div className="sims-skill-row__fill" style={{ width: `${s.proficiency}%` }} />
                      </div>
                      <span className="sims-skill-row__pct">{s.proficiency}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Skills breakdown */}
              <div className="sims-info-card sims-info-card--wide">
                <h3 className="sims-info-card__title">Skills Breakdown</h3>
                <div className="sims-skills-grid">
                  {Object.entries(skills).map(([cat, list]) => (
                    <div className="sims-skill-group" key={cat}>
                      <h4 className="sims-skill-group__title">{cat}</h4>
                      <div className="sims-skill-group__items">
                        {list.map(s => (
                          <span className="sims-skill-tag" key={s.name}>{s.icon} {s.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume card */}
              <div className="sims-info-card">
                <h3 className="sims-info-card__title">Resume</h3>
                <p className="sims-info-card__line">Download my resume or view it online.</p>
                <a href={personalInfo.resumeUrl} className="sims-resume-btn"
                   target="_blank" rel="noopener noreferrer">
                  📄 Download Resume
                </a>
              </div>
            </div>
          </section>

          {/* ══════ CONTACT ══════ */}
          <section id="contact">
            <div className="sims-section-header">
              <h2 className="sims-section-header__title">Contact Me</h2>
            </div>

            <div className="sims-contact-grid">
              <div className="sims-info-card">
                <h3 className="sims-info-card__title">Get In Touch</h3>
                <p className="sims-info-card__line">✉️ {personalInfo.email}</p>
                <p className="sims-info-card__line">📍 {personalInfo.location}</p>
                <div className="sims-info-card__status">🟢 {personalInfo.availability}</div>
                <div className="sims-info-card__socials">
                  {socialLinks.map(l => (
                    <a key={l.name} href={l.url} className="sims-social-circle"
                       target="_blank" rel="noopener noreferrer" title={l.name}>
                      {l.icon === 'github' ? '🔗' : l.icon === 'linkedin' ? '💼'
                        : l.icon === 'twitter' ? '🐦' : '✉️'}
                    </a>
                  ))}
                </div>
              </div>

              <div className="sims-info-card">
                <h3 className="sims-info-card__title">Send a Message</h3>
                <form className="sims-form" onSubmit={handleSubmit}>
                  <input className="sims-form__input" placeholder="Your Name"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input className="sims-form__input" type="email" placeholder="Your Email"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  <textarea className="sims-form__textarea" placeholder="Your Message" rows="4"
                    value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  <button className="sims-form__submit" type="submit">Send Message ▸</button>
                </form>
              </div>
            </div>
          </section>

          <footer className="sims-footer">
            <p>&copy; 2025 Syaqirah — Built with React, Three.js &amp; ✨</p>
          </footer>
        </div>

        {/* ═══════ RIGHT: Static sidebar ═══════ */}
        <aside className="sims-sidebar">
          {/* Logo */}
          <div className="sims-sidebar__logo">
            <span className="sims-sidebar__logo-the">The</span>
            <span className="sims-sidebar__logo-main">Sims</span>
            <span className="sims-sidebar__logo-4">4</span>
          </div>

          {/* Resume CTA */}
          <a href={personalInfo.resumeUrl} className="sims-sidebar__resume"
             target="_blank" rel="noopener noreferrer">
            Resume
          </a>

          {/* Tooltip */}
          <div className="sims-sidebar__tooltip">
            <strong>snsyaqirah</strong>{' '}
            saw the coolest thing somewhere between Resume and Load Game!
          </div>

          {/* Navigation buttons */}
          <div className="sims-sidebar__menu">
            {SIDEBAR_NAV.map(n => (
              <button className="sims-sidebar__btn" key={n.target} onClick={() => scrollTo(n.target)}>
                <span className="sims-sidebar__btn-icon">{n.icon}</span>
                <span className="sims-sidebar__btn-text">{n.label}</span>
              </button>
            ))}
          </div>

          {/* Bottom */}
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
              View most recent <button className="sims-sidebar__link" onClick={() => scrollTo('projects')}>patch notes</button>
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
