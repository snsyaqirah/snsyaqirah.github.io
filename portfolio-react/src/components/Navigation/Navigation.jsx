import { useState, useEffect } from 'react';
import { navLinks } from '../../data/social';
import './Navigation.css';

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Handle scroll for sticky nav
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navLinks.map(link => link.href.substring(1));
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container container">
                <div className="nav-logo">
                    <a href="#home" onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('home');
                    }}>
                        <span className="logo-bracket">{'<'}</span>
                        <span className="logo-text">Portfolio</span>
                        <span className="logo-bracket">{'/>'}</span>
                    </a>
                </div>

                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(link.href.substring(1));
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="nav-mobile-toggle" onClick={toggleMobileMenu}>
                    <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
