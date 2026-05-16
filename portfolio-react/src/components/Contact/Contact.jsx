import { useState } from 'react';
import { socialLinks, personalInfo } from '../../data/social';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For demo purposes - in production, connect to a backend service
        setStatus('Thanks for reaching out! This is a demo form.');
        setTimeout(() => setStatus(''), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(personalInfo.email);
        setStatus('Email copied to clipboard!');
        setTimeout(() => setStatus(''), 2000);
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">
                        <span className="title-accent">{'<'}</span>
                        Get In Touch
                        <span className="title-accent">{'/>'}</span>
                    </h2>
                    <p className="section-description">
                        Have a project in mind or want to collaborate? Feel free to reach out!
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info" data-aos="fade-right">
                        <div className="availability-badge">
                            <span className="status-dot"></span>
                            {personalInfo.availability}
                        </div>

                        <div className="contact-methods">
                            <div className="contact-method">
                                <span className="method-icon">📧</span>
                                <div className="method-content">
                                    <h4>Email</h4>
                                    <p>{personalInfo.email}</p>
                                    <button onClick={copyEmail} className="copy-btn">
                                        Copy Email
                                    </button>
                                </div>
                            </div>

                            <div className="contact-method">
                                <span className="method-icon">📍</span>
                                <div className="method-content">
                                    <h4>Location</h4>
                                    <p>{personalInfo.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
                            <h4>Connect with me</h4>
                            <div className="social-icons">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon"
                                        style={{ borderColor: social.color }}
                                    >
                                        {social.name.charAt(0)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-left">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                placeholder="Your message..."
                            ></textarea>
                        </div>

                        {status && <div className="form-status">{status}</div>}

                        <button type="submit" className="btn btn-primary btn-full">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
