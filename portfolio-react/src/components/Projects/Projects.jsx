import { useState } from 'react';
import { projects, getCategories } from '../../data/projects';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const categories = getCategories();

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <section id="projects" className="projects">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">
                        <span className="title-accent">{'<'}</span>
                        My Projects
                        <span className="title-accent">{'/>'}</span>
                    </h2>
                    <p className="section-description">
                        Here are some of my recent projects that showcase my skills and experience
                    </p>
                </div>

                <div className="project-filters" data-aos="fade-up" data-aos-delay="100">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                            onClick={() => setActiveFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
