import { useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import GalaxyBackground from '../components/Landing/GalaxyBackground';
import Plumbob from '../components/Landing/Plumbob';
import './LandingPage.css';

/* ── Cursor stardust trail ────────────────── */
function useCursorTrail() {
  const handleMove = useCallback((e) => {
    const dot = document.createElement('div');
    dot.className = 'landing__cursor-trail';
    dot.style.left = `${e.clientX - 3}px`;
    dot.style.top = `${e.clientY - 3}px`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [handleMove]);
}

/* ── Landing Page ─────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useCursorTrail();

  /* Simulate a brief loading screen */
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing">
      {/* ── Loading Screen ─── */}
      <div className={`landing__loader ${loaded ? 'landing__loader--hidden' : ''}`}>
        <svg className="landing__loader-plumbob" viewBox="0 0 40 60" fill="none">
          <polygon points="20,0 40,25 20,40 0,25" fill="#2dff6e" opacity="0.85" />
          <polygon points="20,40 40,25 20,60 0,25" fill="#1aff50" opacity="0.7" />
        </svg>
        <span className="landing__loader-text">Loading Universe…</span>
      </div>

      {/* ── 3D Canvas ─── */}
      <div className="landing__canvas">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <GalaxyBackground />
            <Plumbob position={[-6, 2, 5]} scale={1.2} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── UI Overlay ─── */}
      <div className="landing__overlay">
        {/* Top bar — Sims-style tabs */}
        <nav className="landing__topbar">
          <button className="landing__tab landing__tab--active">My World</button>
          <button className="landing__tab" onClick={() => navigate('/portfolio')}>Portfolio</button>
          <button className="landing__tab" onClick={() => navigate('/portfolio#projects')}>Projects</button>
          <button className="landing__tab" onClick={() => navigate('/portfolio#contact')}>Contact</button>
          <span className="landing__welcome">Welcome back, Explorer!</span>
        </nav>

        {/* Left content area */}
        <div className="landing__content">
          {/* Featured card */}
          <div className="landing__featured">
            <span className="landing__featured-label">✦ Featured</span>
            <h2>Syaqirah&apos;s Digital Universe</h2>
            <p>
              Frontend developer crafting immersive web experiences.
              Currently exploring Three.js, React, and the intersection of
              design and code.
            </p>
            <button
              className="landing__featured-btn"
              onClick={() => navigate('/portfolio')}
            >
              ▸ Explore Now
            </button>
          </div>

          {/* Bundle card */}
          <div className="landing__bundle">
            <h3>✦ Bundle &amp; Skills</h3>
            <p>
              React · Three.js · JavaScript · CSS · Node.js — and always levelling up.
            </p>
            <button
              className="landing__featured-btn"
              onClick={() => navigate('/portfolio#about')}
            >
              ▸ View Skills
            </button>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="landing__sidebar">
          {/* Logo */}
          <div className="landing__logo">
            <div className="landing__logo-title">Syaqirah</div>
            <div className="landing__logo-sub">Web Developer</div>
          </div>

          {/* Moodlet */}
          <div className="landing__moodlet">
            <strong>Mood: Inspired ✨</strong>
            <br />
            Star-gazing buff active (+2 Creativity)
          </div>

          {/* Menu */}
          <div className="landing__menu">
            <button
              className="landing__menu-btn landing__menu-btn--primary"
              onClick={() => navigate('/portfolio')}
            >
              <span className="landing__menu-icon">▶</span>
              Enter Portfolio
            </button>
            <button
              className="landing__menu-btn"
              onClick={() => navigate('/portfolio#projects')}
            >
              <span className="landing__menu-icon">◈</span>
              Projects
            </button>
            <button
              className="landing__menu-btn"
              onClick={() => navigate('/portfolio#about')}
            >
              <span className="landing__menu-icon">◎</span>
              About Me
            </button>
            <button
              className="landing__menu-btn"
              onClick={() => navigate('/portfolio#contact')}
            >
              <span className="landing__menu-icon">✉</span>
              Contact
            </button>
            <a
              className="landing__menu-btn"
              href="https://github.com/snsyaqirah"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="landing__menu-icon">⚙</span>
              GitHub
            </a>
          </div>
        </aside>

        {/* Bottom bar */}
        <footer className="landing__bottom">
          <div className="landing__socials">
            <a
              className="landing__social-link"
              href="https://github.com/snsyaqirah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              G
            </a>
            <a
              className="landing__social-link"
              href="https://www.linkedin.com/in/snsyaqirah/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>
          <span className="landing__version">Version 1.0 · Built with React & Three.js</span>
        </footer>
      </div>
    </div>
  );
}
