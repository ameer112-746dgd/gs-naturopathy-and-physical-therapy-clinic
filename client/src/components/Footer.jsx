import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Solid icons
import { faMapMarkerAlt, faClock, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Brand icons
import { faInstagram, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { generateWhatsAppLink } from '../utils/whatsapp';
import './Footer.css';

const Footer = () => {
    // Clinic WhatsApp
    const clinicInquiry = () => {
        window.location.href = generateWhatsAppLink(
            "Hello G'S Clinic, I want to make an inquiry about your services."
        );
    };

    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-grid">

                    {/* 1. Clinic Info & Socials */}
                    <div className="footer-section">
                        <h3 className="footer-logo">G’S Wellness & Therapy</h3>
                        <p className="footer-desc">
                            Providing professional natural healing and therapy services to restore your health and mobility. Your wellness is our primary mission.
                        </p>

                        <div className="social-links">
                            <a href="https://www.instagram.com/gsnaturopathyphys" target="_blank" rel="noreferrer" className="social-icon insta">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                            <a href="https://www.tiktok.com/@gsnaturopathyphys" target="_blank" rel="noreferrer" className="social-icon tiktok">
                                <FontAwesomeIcon icon={faTiktok} size="lg" />
                            </a>
                            <button onClick={clinicInquiry} className="social-icon whatsapp">
                                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                            </button>
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div className="footer-section">
                        <h4>Explore</h4>
                        <ul className="footer-links">
                            {['Home', 'Services', 'Products', 'About Us', 'Contact'].map((item, idx) => (
                                <li key={idx}>
                                    <Link to={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '')}`}>
                                        <FontAwesomeIcon icon={faChevronRight} /> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Our Services */}
                    <div className="footer-section">
                        <h4>Services</h4>
                        {['Physical Therapy', 'Meridian Therapy', 'Laser Therapy', 'Reflexology', 'QRMA Diagnosis'].map((service, idx) => (
                            <ul className="footer-links" key={idx}>
                                <li>
                                    <Link to={service === 'QRMA Diagnosis' ? '/book' : '/services'}>
                                        <FontAwesomeIcon icon={faChevronRight} /> {service}
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    </div>

                    {/* 4. Contact Information */}
                    <div className="footer-section footer-contact-info">
                        <h4>Get In Touch</h4>
                        <div className="contact-item">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" />
                            <span>Alakuko Ikeja, F8QX+3WX, Iganmu, Lagos 101241, Lagos, Nigeria</span>
                        </div>
                        <div className="business-hours-footer">
                            <FontAwesomeIcon icon={faClock} />
                            <span>Mon - Sat: 8am - 6pm</span>
                        </div>
                    </div>

                </div>

                    {/* Footer Bottom Bar */}
                    <div className="footer-bottom">
                        <div className="copyright">
                            &copy; {new Date().getFullYear()} G’S Wellness & Physical Therapy Centre
                            {/* Secret Admin Link hidden in the period */}
                            <Link to="/admin-gs" className="admin-secret-link">.</Link>
                        </div>

                        <div className="developer-credit">
                            <span>Built by <strong>DDIGITALGUY</strong></span>
                            <a
                                href="https://wa.me/2348131179102"
                                target="_blank"
                                rel="noreferrer"
                                className="dev-whatsapp-icon"
                                title="Chat on WhatsApp">
                                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                            </a>
                        </div>
                    </div>
            </div>
        </footer>
    );
};

export default Footer;