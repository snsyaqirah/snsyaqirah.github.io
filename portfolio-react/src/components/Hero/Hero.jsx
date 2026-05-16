import { useState, useEffect } from 'react';
import { personalInfo } from '../../data/social';
import './Hero.css';

const Hero = () => {
    const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typing animation effect
    useEffect(() => {
        const taglines = personalInfo.taglines;
        const currentTagline = taglines[currentTaglineIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseDuration = 2000;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (displayedText.length < currentTagline.length) {
                    setDisplayedText(currentTagline.slice(0, displayedText.length + 1));
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            } else {
                // Deleting
                if (displayedText.length > 0) {
                    setDisplayedText(currentTagline.slice(0, displayedText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentTaglineIndex]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="particles"></div>
                <div className="gradient-overlay"></div>
            </div>

            <div className="hero-content container">
                <div className="hero-text">
                    <div className="greeting fade-in-down">
                        <span className="wave">👋</span>
                        <span>Hi, I'm</span>
                    </div>

                    <h1 className="hero-name fade-in-up">
                        {personalInfo.name}
                    </h1>

                    <div className="hero-tagline">
                        <span className="typing-text">{displayedText}</span>
                        <span className="cursor">|</span>
                    </div>

                    <p className="hero-description fade-in-up">
                        {personalInfo.bio}
                    </p>

                    <div className="hero-cta fade-in-up">
                        <button
                            className="btn btn-primary"
                            onClick={() => scrollToSection('projects')}
                        >
                            View My Work
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() => scrollToSection('contact')}
                        >
                            Get In Touch
                        </button>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="code-window">
                        <div className="window-header">
                            <div className="window-buttons">
                                <span className="btn-close"></span>
                                <span className="btn-minimize"></span>
                                <span className="btn-maximize"></span>
                            </div>
                            <div className="window-title">portfolio.js</div>
                        </div>
                        <div className="window-content">
                            <pre>
                                <code>
                                    {`const developer = {
  name: "${personalInfo.name}",
  role: "${personalInfo.title}",
  location: "${personalInfo.location}",
  status: "${personalInfo.availability}",
  
  skills: [
    "React", "Node.js",
    "TypeScript", "MongoDB"
  ],
  
  passion: "Building amazing things",
  coffee: "☕".repeat(3)
};

console.log(developer);`}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <div className="scroll-text">Scroll Down</div>
            </div>
        </section>
    );
};

export default Hero;
