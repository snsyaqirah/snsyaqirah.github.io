import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import GalaxyBackground from '../components/Landing/GalaxyBackground';
import { personalInfo, socialLinks } from '../data/social';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import './PortfolioPage.css';

/* ── Random memoji pool ── */
const MEMOJIS = ['👩‍💻','🧑‍💻','👨‍💻'];

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
];

/* ── Sidebar nav items ── */
const SIDEBAR_NAV = [
  { icon: '🏠', label: 'Home',       target: 'home' },
  { icon: '📂', label: 'Projects',   target: 'projects' },
  { icon: '👤', label: 'About Me',   target: 'about' },
];

/* ── Tech marquee items for landing ── */
const TECH_MARQUEE = [
  'PHP', 'PYTHON', 'JAVA', 'JS', 'REACT', 'HTML', 'CSS', 'MYSQL', 'AI TOOLS', 'POWER BI',
];

/* ── Highlight cards for the Home section (3 boxes) ── */
const HOME_CARDS = [
  {
    bg: '#3D3BC1',
    emoji: '🏆',
    title: 'Hackathon SZN',
    sub: 'Currently competing & building cool stuff',
  },
  {
    bg: '#3D3BC1',
    emoji: '🎮',
    title: 'Sims 4 Addict',
    sub: 'Building houses > touching grass · A Sims 4-themed portfolio (meta, I know)',
  },
  {
    bg: '#3D3BC1',
    emoji: '📚',
    title: 'Learning Now',
    sub: 'Oracle Learning Portal for MyDIGITAL — Free learning initiative',
  },
];

export default function PortfolioPage() {
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState('home');
  const [filterCat, setFilterCat] = useState('All');


  /* Auto-generate unique categories from project data */
  const categories = useMemo(() => {
    const cats = [...new Set(projects.map(p => p.category))];
    return ['All', ...cats];
  }, []);

  /* Filtered projects */
  const filteredProjects = filterCat === 'All'
    ? projects
    : projects.filter(p => p.category === filterCat);

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

  return (
    <div className="sims-portfolio">
      {/* ── 3D galaxy background ── */}
      <div className="sims-portfolio__canvas">
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }} gl={{ antialias: true, alpha: false }} dpr={[1, 1.5]}>
          <Suspense fallback={null}><GalaxyBackground /></Suspense>
        </Canvas>
      </div>

      {/* ── Landing hero (full viewport, dark + stars) ── */}
      <section className="landing-hero">
        <div className="landing-hero__center">
          <h1 className="landing-hero__name">SYAQIRAH</h1>
          <p className="landing-hero__role">SOFTWARE DEVELOPER</p>
          <button
            className="landing-hero__cta"
            onClick={() => document.getElementById('portfolio-start')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Go to Portfolio
          </button>
        </div>

        <div className="landing-hero__marquee-wrap">
          <div className="landing-hero__marquee">
            <span className="landing-hero__marquee-text">
              {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
                <span key={i}>{t} &bull; </span>
              ))}
            </span>
          </div>
        </div>

      </section>

      {/* ── Two-column layout ── */}
      <div id="portfolio-start" className="sims-layout">

        {/* ═══════ LEFT: Content area ═══════ */}
        <div className="sims-content">

          {/* Top navigation — fixed, not scrollable */}
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

          {/* Scrollable sections area */}
          <div className="sims-scroll-area" ref={contentRef}>

          {/* ══════ HOME ══════ */}
          <section id="home">
            {/* 3 highlight boxes */}
            <div className="sims-wip-wrapper">
              <div className="sims-home-cards sims-wip-blur">
                {HOME_CARDS.map((c, i) => (
                  <div className="sims-home-card" key={i} style={{ background: c.bg }}>
                    <span className="sims-home-card__emoji">{c.emoji}</span>
                    <h3 className="sims-home-card__title">{c.title}</h3>
                    <p className="sims-home-card__sub">{c.sub}</p>
                  </div>
                ))}
              </div>
              <div className="sims-wip-notice">
                🚧 In Progress &nbsp;·&nbsp; Tengah Update &nbsp;·&nbsp; Sabo jap 🚧
              </div>
            </div>
          </section>

          {/* ══════ PROJECTS ══════ */}
          <section id="projects">
            <div className="sims-projects-header">
              <div className="sims-section-header">
                <h2 className="sims-section-header__title">Projects</h2>
              </div>
              <div className="sims-filter-pills">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`sims-filter-pill${filterCat === cat ? ' sims-filter-pill--active' : ''}`}
                    onClick={() => setFilterCat(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="sims-wip-wrapper">
              <div className="sims-packs-grid sims-wip-blur">
                {filteredProjects.map(p => (
                  <div className="sims-pack" key={p.id}>
                    <div
                      className="sims-pack__art"
                      style={{ background: CAT_COLOR[p.category] || CAT_COLOR.Frontend }}
                    >
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
              <div className="sims-wip-notice">
                🚧 In Progress &nbsp;·&nbsp; Tengah Update &nbsp;·&nbsp; Sabo jap 🚧
              </div>
            </div>
          </section>

          {/* ══════ ABOUT / SKILLS / RESUME ══════ */}
          <section id="about">
            <div className="sims-section-header">
              <h2 className="sims-section-header__title">About Me</h2>
            </div>

            <div className="sims-about-grid">
              {/* Bio + Quick Stats card */}
              <div className="sims-info-card">
                <h3 className="sims-info-card__title">Who Am I?</h3>
                <p className="sims-info-card__line">{personalInfo.bio} To me, everything is figure-out-able as long as there's enough coffee and documentation.</p>
                <p className="sims-info-card__line">Software developer by day, The Sims architect by night. My design inspiration? Literally the Sims 4 menu you’re looking at right now. I’ve been a hardcore fan since I was a kid, so I figured why not turn my portfolio into a UI mod? (No regrets!).</p>
                <p className="sims-info-card__line">I'm the type of dev who loves to explore new tech, whether it's at hackathons or building random side projects. When I’m not debugging or joining hackathons, you’ll probably find me looking up. I have a massive obsession with stargazing—basically anything up in the sky amaze, amaze, amaze! (except ghosts, we don't talk about those).</p>
                <ul className="sims-info-card__list" style={{ marginTop: '0.7rem' }}>
                  <li>🎯 <strong>Current Quest:</strong> Striving to be a reliable Full Stack developer.</li>
                  <li>⚡ <strong>Vibe:</strong> 100% redah-first, figure-it-out-later.</li>
                  <li>😩 <strong>Regrets:</strong> Not joining physical hackathons sooner! ughhh.</li>
                </ul>
              </div>

              {/* All Skills breakdown */}
              <div className="sims-info-card">
                <h3 className="sims-info-card__title">Skills Breakdown</h3>
                <div className="sims-skills-grid">
                  {Object.entries(skills).map(([cat, list]) => (
                    <div className="sims-skill-group" key={cat}>
                      <h4 className="sims-skill-group__title">{cat}</h4>
                      <div className="sims-skill-group__items">
                        {list.map(s => (
                          <span className="sims-skill-tag" key={s.name}>{s.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>


          <footer className="sims-footer">
            <div className="sims-footer__marquee">
              <span className="sims-footer__marquee-text">
                &copy; {new Date().getFullYear()} SITI NURSYAQIRAH BINTI OSMAN &bull; SOFTWARE DEVELOPER &bull; MALAYSIA &nbsp;&nbsp;&nbsp;&nbsp;
                &copy; {new Date().getFullYear()} SITI NURSYAQIRAH BINTI OSMAN &bull; SOFTWARE DEVELOPER &bull; MALAYSIA &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </footer>
          </div>{/* end sims-scroll-area */}
        </div>

        {/* ═══════ RIGHT: Static sidebar ═══════ */}
        <aside className="sims-sidebar">
          {/* Logo */}
          <div className="sims-sidebar__logo">
            <span className="sims-sidebar__logo-the">The</span>
            <span className="sims-sidebar__logo-main">Syaqirah</span>
          </div>

          {/* Resume CTA — disabled for now */}
          <span className="sims-sidebar__resume sims-sidebar__resume--disabled">
            Resume
          </span>

          {/* Tooltip */}
          <div className="sims-sidebar__tooltip sims-sidebar__tooltip--dark">
            <strong>Unsupervised Syaqirah?</strong>{' '}
            Oops. you better check out what she have been up to.
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
