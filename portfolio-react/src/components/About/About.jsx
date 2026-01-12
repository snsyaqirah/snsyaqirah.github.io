import { personalInfo } from '../../data/social';
import { skills } from '../../data/skills';
import './About.css';

const About = () => {
    const topSkills = Object.values(skills).flat().filter(skill => skill.proficiency >= 85);

    return (
        <section id="about" className="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-text" data-aos="fade-right">
                        <h2 className="section-title">
                            <span className="title-accent">{'<'}</span>
                            About Me
                            <span className="title-accent">{'/>'}</span>
                        </h2>

                        <div className="about-bio">
                            <p>{personalInfo.bio}</p>
                            <p>
                                I specialize in creating responsive, user-friendly applications using modern
                                technologies. My goal is to write clean, maintainable code that solves real-world problems.
                            </p>
                        </div>

                        <div className="about-info">
                            <div className="info-item">
                                <span className="info-icon">📍</span>
                                <span className="info-text">{personalInfo.location}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">💼</span>
                                <span className="info-text">{personalInfo.availability}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">📧</span>
                                <span className="info-text">{personalInfo.email}</span>
                            </div>
                        </div>

                        {personalInfo.resumeUrl && (
                            <a
                                href={personalInfo.resumeUrl}
                                className="btn btn-primary"
                                download
                            >
                                Download Resume
                            </a>
                        )}
                    </div>

                    <div className="about-skills" data-aos="fade-left">
                        <h3 className="skills-title">Top Skills</h3>
                        <div className="skills-list">
                            {topSkills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="skill-item"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 50}
                                >
                                    <div className="skill-header">
                                        <span className="skill-icon">{skill.icon}</span>
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-percentage">{skill.proficiency}%</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div
                                            className="skill-progress"
                                            style={{ width: `${skill.proficiency}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
