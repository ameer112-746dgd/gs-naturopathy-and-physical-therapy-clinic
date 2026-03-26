import React from 'react';
import { Users, Leaf, Home, MapPin, Phone, Mail, CheckCircle } from 'lucide-react'; // Professional Icons
import { generateWhatsAppLink } from '../utils/whatsapp';
import './About.css';

const About = () => {
    const handleContact = () => {
        const msg = "Hello G'S Clinic, I'd like to learn more about your treatments and home services.";
        window.location.href = generateWhatsAppLink(msg);
    };

    const conditions = [
        "Stroke Recovery", "Arthritis", "Chronic Waist Pain", 
        "Leg Pain", "Paralysis", "Sciatica", 
        "High Blood Pressure", "Kidney Disease", 
        "Liver Problems", "General Detoxification"
    ];

    return (
        <div className="about-page">
            {/* 1. Page Header */}
            <header className="about-hero">
                <div className="container">
                    <h1 className="animate-fade">About Our Clinic</h1>
                    <p>Committed to natural healing and professional physical therapy solutions.</p>
                </div>
            </header>

            <div className="container">
                {/* 2. About the Clinic Main Section */}
                <section className="about-intro section">
                    <div className="about-intro-text">
                        <h2>Dedicated to Your Wellness</h2>
                        <p>
                            Thank you for choosing <strong>G's Wellness and Physical Therapy Centre</strong>. 
                            We are dedicated to helping you achieve better health through natural and effective treatments.
                        </p>
                        <p>
                            Our clinic specializes in non-invasive healing methods, combining modern diagnostic 
                            technology with traditional wisdom to restore your body's natural balance.
                        </p>
                        <p>
                            We understand that mobility and health are vital to your quality of life. That’s why 
                            we also offer <strong>convenient home services</strong> to ensure you receive 
                            expert care in the comfort of your own environment.
                        </p>
                    </div>
                    <div className="about-image-wrapper">
                        <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" 
                            alt="Therapy Session" 
                        />
                    </div>
                </section>

                {/* 3. Mission & Vision */}
                <section className="mv-container section">
                    <div className="mv-box">
                        <h3>Our Mission</h3>
                        <p>To provide natural, affordable, and highly effective therapy solutions that empower our patients to live pain-free lives.</p>
                    </div>
                    <div className="mv-box">
                        <h3>Our Vision</h3>
                        <p>To become a leading center for holistic healing and physical wellness, trusted by families for generations.</p>
                    </div>
                </section>

                {/* 4. What We Treat */}
                <section className="conditions-section section">
                    <h2 className="section-title">Specialized Treatment For:</h2>
                    <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 30px auto' }}>
                        We provide expert natural remedies and physical therapy for a wide range of conditions:
                    </p>
                    <div className="conditions-grid">
                        {conditions.map((item, index) => (
                            <div key={index} className="condition-item">
                                <CheckCircle size={16} color="var(--primary-green)" />
                                {item}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Why Choose Us */}
                <section className="section">
                    <h2 className="section-title">The G's Clinic Difference</h2>
                    <div className="grid">
                        <div className="card about-card">
                            <div className="icon-wrapper"><Users size={40} /></div>
                            <h4>Experienced Therapists</h4>
                            <p>Our team consists of professionals dedicated to your recovery journey.</p>
                        </div>
                        <div className="card about-card">
                            <div className="icon-wrapper"><Leaf size={40} /></div>
                            <h4>Safe & Natural</h4>
                            <p>We avoid harsh chemicals or invasive surgeries, focusing on what the body needs to heal itself.</p>
                        </div>
                        <div className="card about-card">
                            <div className="icon-wrapper"><Home size={40} /></div>
                            <h4>Home Services</h4>
                            <p>We bring our world-class therapy sessions directly to your doorstep in Lagos.</p>
                        </div>
                    </div>
                </section>

                {/* 6. Call To Action */}
                <section className="trust-banner section">
                    <h2>Let us help you feel better again.</h2>
                    <p>Your health is an investment, not an expense. Start your natural healing process today.</p>
                    <button className="btn btn-white" onClick={handleContact}>
                        Contact Us on WhatsApp
                    </button>
                </section>

                {/* 7. Contact Info */}
                <section className="contact-info section">
                    <h3>Visit Our Clinic</h3>
                    <div className="contact-details-grid">
                        <p><MapPin size={20} /> Lagos, Nigeria</p>
                        <p><Phone size={20} /> 07079797317</p>
                        <p><Mail size={20} /> gsnaturopathyandphysicaltherap@gmail.com</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;