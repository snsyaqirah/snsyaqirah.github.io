import { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { personalInfo, socialLinks } from '../data/social';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { hackathons } from '../data/hackathons';
import './PortfolioPage.css';

const GalaxyCanvas = lazy(() => import('../components/Landing/GalaxyCanvas'));

/* ── Random memoji pool ── */
const MEMOJIS = ['👩‍💻','🧑‍💻','👨‍💻'];

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

/* ── Fun cards under the hackathon journey ── */
const HOME_CARDS = [
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [filterCat, setFilterCat] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [galaxyReady, setGalaxyReady] = useState(false);


  /* Auto-generate unique categories from project data */
  const categories = useMemo(() => {
    const cats = [...new Set(projects.flatMap(p => p.categories))];
    return ['All', ...cats];
  }, []);

  /* Filtered projects */
  const filteredProjects = filterCat === 'All'
    ? projects
    : projects.filter(p => p.categories.includes(filterCat));

  /* Pick one random memoji per mount */
  const memoji = useMemo(() => MEMOJIS[Math.floor(Math.random() * MEMOJIS.length)], []);

  /* Mount the WebGL galaxy after first paint so it never blocks LCP/FCP */
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setGalaxyReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  /* Hide FAB on landing hero, show once scrolled past */
  useEffect(() => {
    const hero = document.querySelector('.landing-hero');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

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
    setMenuOpen(false);
  };

  return (
    <div className="sims-portfolio">
      {/* ── 3D galaxy background — mounted after first paint, render loop paused once scrolled past the hero ── */}
      <div className="sims-portfolio__canvas">
        {galaxyReady && (
          <Suspense fallback={null}>
            <GalaxyCanvas frameloop={pastHero ? 'never' : 'always'} />
          </Suspense>
        )}
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

        {/* ── Mobile FAB + overlay — inside sims-layout so z-index stacking works ── */}
        {pastHero && (
          <>
            <button
              className={`sims-fab${menuOpen ? ' sims-fab--open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
            {menuOpen && (
              <div className="sims-drawer-overlay" onClick={() => setMenuOpen(false)} />
            )}
          </>
        )}

        {/* ═══════ LEFT: Content area ═══════ */}
        <main className="sims-content">

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
            <div className="sims-section-header">
              <h2 className="sims-section-header__title">Hackathon Career</h2>
            </div>
            <p className="sims-journey__intro">
              Regret #1: not joining physical hackathons sooner. So now I'm making up for it, one level at a time.
            </p>

            <ol className="sims-journey">
              {hackathons.map(h => (
                <li className="sims-journey__item" key={h.level}>
                  <div className="sims-journey__level">
                    <span className="sims-journey__level-num">Level {h.level}</span>
                    <span className="sims-journey__level-name">{h.levelName}</span>
                  </div>
                  <div className="sims-journey__card">
                    <div className="sims-journey__top">
                      <span className="sims-journey__emoji">{h.emoji}</span>
                      <span className="sims-journey__result">{h.result}</span>
                      {h.year && <span className="sims-journey__year">{h.year}</span>}
                    </div>
                    <h3 className="sims-journey__event">{h.event}</h3>
                    {h.built && (
                      <p className="sims-journey__built"><strong>Built:</strong> {h.built}</p>
                    )}
                    <p className="sims-journey__story">{h.story}</p>
                    {(h.projectSlug || h.githubUrl) && (
                      <div className="sims-journey__links">
                        {h.projectSlug && (
                          <button
                            className="sims-journey__link sims-journey__link--primary"
                            onClick={() => navigate(`/projects/${h.projectSlug}`)}
                          >
                            View Project →
                          </button>
                        )}
                        {h.githubUrl && (
                          <a className="sims-journey__link" href={h.githubUrl} target="_blank" rel="noopener noreferrer">
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>

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

            <div className="sims-packs-grid">
              {filteredProjects.map(p => (
                <div
                  className="sims-pack"
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate(`/projects/${p.slug}`)}
                >
                  <div className="sims-pack__art">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        className="sims-pack__img"
                        loading="lazy"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="sims-pack__placeholder">{p.title}</span>
                    )}
                    {p.ribbon && <span className="sims-pack__ribbon">{p.ribbon}</span>}
                    <div className="sims-pack__overlay">
                      <span className="sims-pack__overlay-desc">{p.description}</span>
                      <span className="sims-pack__overlay-tech">
                        {p.tech.slice(0, 4).join(' · ')}
                      </span>
                      <span className="sims-pack__overlay-btn sims-pack__overlay-btn--primary">
                        View Details →
                      </span>
                    </div>
                  </div>
                  <div className="sims-pack__label">
                    <span className="sims-pack__title">{p.title}</span>
                    <span className="sims-pack__cats">
                      {p.categories.map(c => (
                        <span className="sims-pack__cat" key={c}>{c}</span>
                      ))}
                    </span>
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
        </main>

        {/* ═══════ RIGHT: Static sidebar ═══════ */}
        <aside className={`sims-sidebar${menuOpen ? ' sims-sidebar--open' : ''}`}>
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
