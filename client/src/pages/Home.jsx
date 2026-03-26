import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    Phone, MessageCircle, MapPin, CheckCircle, ArrowRight, 
    MousePointerClick, CalendarCheck, HeartPulse, UserCheck, 
    Stethoscope, ShieldCheck, Truck, Sparkles
} from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsapp';
import './Home.css';

const Home = () => {
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/services').then(res => setServices(res.data.slice(0, 3)));
        axios.get('http://localhost:5000/api/products').then(res => setProducts(res.data.slice(0, 3)));
    }, []);

    const bookNow = () => navigate('/book');

    return (
        <div className="home-page">
            {/* 1. Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="container hero-container">
                    <div className="hero-content">
                        <div className="hero-badge animate-pop">
                            <Sparkles size={16} /> <span>Trusted Naturopathy Center</span>
                        </div>
                        <h1>Revitalize Your Health <br/><span>Naturally.</span></h1>
                        <p>At G’S Clinic, we blend advanced diagnostic technology with time-honored natural therapies to restore your vitality and movement.</p>
                        <div className="hero-btns">
                            <button onClick={bookNow} className="btn btn-primary btn-lg">
                                Book Appointment <CalendarCheck size={18} />
                            </button>
                            <Link to="/services" className="btn btn-primary btn-lg">
                                View Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

                {/* Quick Contact Bar - Horizontal, Empty */}
                <div className="contact-bar-floating">
                <div className="container contact-bar-flex" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {/* Call */}
                    <a href="tel:07079797317" className="contact-item"></a>

                    {/* WhatsApp */}
                    <button
                    onClick={() => window.location.href = generateWhatsAppLink("Hello G'S Clinic, I need an inquiry.")}
                    className="contact-item"
                    ></button>

                    {/* Location */}
                    <div className="contact-item"></div>
                </div>
                </div>

            <div className="container">
                {/* 3. About Preview */}
                <section className="section about-preview">
                    <div className="about-image-stack">
                        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80" alt="Therapy" className="main-img" />
                        <div className="experience-badge">
                            <h3>10+</h3>
                            <p>Years Experience</p>
                        </div>
                    </div>
                    <div className="about-text">
                        <h4 className="sub-heading">About Our Center</h4>
                        <h2 className="section-title-left">Healing Without Surgery.</h2>
                        <p className="lead">We provide professional, non-invasive, and natural healing solutions tailored to your unique biology.</p>
                        <p>Using QRMA diagnostics and Meridian therapy, we target the root cause of pain and illness rather than just masking symptoms.</p>
                        <Link to="/about" className="btn-link">Explore Our Story <ArrowRight size={18} /></Link>
                    </div>
                </section>

                {/* 4. Services Highlight */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">Professional Services</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="services-modern-grid">
                        {services.map(s => (
                            <div key={s._id} className="modern-service-card">
                                <div className="card-top">
                                    <div className="service-icon-box"><HeartPulse size={28} /></div>
                                    <h3 className="card-title">{s.name}</h3>
                                </div>
                                <p>{s.description}</p>
                                <Link to="/services" className="card-footer-link">
                                    Service Details <ArrowRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. How It Works - Visual Timeline */}
                <section className="section steps-section">
                    <h2 className="section-title">Your Path to Wellness</h2>
                    <div className="visual-steps">
                        {[
                            { icon: <MousePointerClick />, title: "Select Service", desc: "Choose from our therapy list" },
                            { icon: <CalendarCheck />, title: "Fill Booking Form", desc: "Provide your basic details" },
                            { icon: <MessageCircle />, title: "Confirm on WA", desc: "Get your date assigned" }
                        ].map((step, idx) => (
                            <div className="visual-step-card" key={idx}>
                                <div className="step-icon-wrap">{step.icon}</div>
                                <h4>{step.title}</h4>
                                <p>{step.desc}</p>
                                <div className="step-count">{idx + 1}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* 6. WhatsApp CTA - Full Width Glass */}
            <section className="whatsapp-banner">
                <div className="container banner-inner">
                    <div className="banner-text">
                        <h2>Feel Better, Live Healthier.</h2>
                        <p>Our specialists are online to answer your health questions.</p>
                    </div>
                    <button onClick={bookNow} className="btn btn-light-glow">
                        <MessageCircle size={20} /> Book Appointment
                    </button>
                </div>
            </section>

            <div className="container">
                {/* 8. Benefits */}
                <section className="section">
                    <div className="benefits-strip">
                        <div className="benefit-pill"><ShieldCheck size={20} /> 100% Natural</div>
                        <div className="benefit-pill"><UserCheck size={20} /> Expert Care</div>
                        <div className="benefit-pill"><CheckCircle size={20} /> Affordable</div>
                        <div className="benefit-pill"><Truck size={20} /> Home Service</div>
                    </div>
                </section>

                    {/* 11. Home Service Banner - Redirects to Booking Page */}
                    <section className="home-service-card-modern">
                        <div className="hs-content">
                            <div className="hs-icon-bg">
                                <Truck size={40} />
                            </div>
                            <div className="hs-text">
                                <h3>Prefer Care at Home?</h3>
                                <p>We bring our diagnostic tools and physical therapy equipment directly to your doorstep for maximum comfort.</p>
                            </div>
                        </div>
                        
                        {/* Using Link to go to the Booking Page instead of WhatsApp directly */}
                        <Link to="/book" className="btn btn-accent">
                            Request Home Visit
                        </Link>
                    </section>
            </div>
        </div>
    );
};

export default Home;