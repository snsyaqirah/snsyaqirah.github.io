import PropTypes from 'prop-types';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
    return (
        <div
            className={`project-card ${project.featured ? 'featured' : ''}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
        >
            <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                    <div className="project-links">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm"
                            >
                                Live Demo
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline btn-sm"
                            >
                                GitHub
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="project-content">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                    {project.tech.map((tech, idx) => (
                        <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        tech: PropTypes.arrayOf(PropTypes.string).isRequired,
        category: PropTypes.string.isRequired,
        featured: PropTypes.bool,
        liveUrl: PropTypes.string,
        githubUrl: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default ProjectCard;
