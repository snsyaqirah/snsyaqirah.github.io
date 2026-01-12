import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import './styles/global.css';

function App() {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="App">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <footer style={{
        padding: '3rem 0',
        textAlign: 'center',
        borderTop: '2px solid var(--color-primary)',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        <div className="container">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            &copy; 2025 Portfolio. Built with React & ❤️
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Designed and developed with passion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
