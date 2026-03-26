import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, Home, User, Send, Smartphone } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsapp';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const fullMessage = `*INQUIRY FROM WEBSITE* 📧\n--------------------------\n👤 *Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n💬 *Message:* ${formData.message}\n--------------------------`;
        window.location.href = generateWhatsAppLink(fullMessage);
    };

    const quickInquiry = () => {
        window.location.href = generateWhatsAppLink("Hello G'S Clinic, I want to make an inquiry about your services.");
    };

    return (
        <div className="contact-page">
            {/* 1. Page Header */}
            <header className="contact-hero">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We’re here to help you. Reach out to us anytime for consultations, bookings, or inquiries.</p>
                </div>
            </header>

            <div className="container main-content-shift">
                {/* 2. Contact Information Cards */}
                <section className="contact-info-grid">
                    <div className="info-card">
                        <div className="icon-box"><Phone size={28} /></div>
                        <h3>Call Us</h3>
                        <p><a href="tel:07079797317">07079797317</a></p>
                    </div>
                    <div className="info-card" onClick={quickInquiry} style={{cursor: 'pointer'}}>
                        <div className="icon-box"><MessageSquare size={28} /></div>
                        <h3>WhatsApp</h3>
                        <p>Chat with us now</p>
                    </div>
                    <div className="info-card">
                        <div className="icon-box"><MapPin size={28} /></div>
                        <h3>Visit Us</h3>
                        <p>Lagos, Nigeria</p>
                    </div>
                </section>

                <div className="contact-layout-grid">
                    {/* 3. Contact Form */}
                    <section className="contact-form-section">
                        <div className="section-header">
                            <h2>Send a Message</h2>
                            <p>Prefer writing? Fill this form and we'll reply on WhatsApp.</p>
                        </div>
                        <form onSubmit={handleFormSubmit} className="contact-form">
                            <div className="form-group">
                                <label className="form-label"><User size={18} /> Full Name</label>
                                <input 
                                    type="text" required placeholder="Enter your name"
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><Smartphone size={18} /> Phone Number</label>
                                <input 
                                    type="text" required placeholder="e.g. 07079797317"
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label"><MessageSquare size={18} /> Your Message</label>
                                <textarea 
                                    rows="5" required placeholder="How can we help you today?"
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>
                            <button type="submit" className="contact-submit-btn">
                                <Send size={20} /> Send via WhatsApp
                            </button>
                        </form>
                    </section>

                    {/* 4. Business Hours & Extras */}
                    <aside className="contact-sidebar">
                        <div className="sidebar-card business-hours">
                            <h3><Clock size={22} /> Business Hours</h3>
                            <div className="hour-row"><span>Monday – Friday</span> <strong>9am – 6pm</strong></div>
                            <div className="hour-row"><span>Saturday</span> <strong>10am – 4pm</strong></div>
                            <div className="hour-row no-border"><span>Sunday</span> <span className="closed-tag">Closed</span></div>
                        </div>

                        <div className="sidebar-card home-service-alert">
                            <h4><Home size={22} /> Home Service</h4>
                            <p>We provide specialized home services for stroke recovery, arthritis, and physical therapy within Lagos.</p>
                            <button 
                                onClick={() => window.location.href = generateWhatsAppLink("I want to book a home service session.")}
                                className="sidebar-btn"
                            >
                                Request Home Visit
                            </button>
                        </div>
                    </aside>
                </div>

                {/* 5. Quick Help Section */}
                <section className="quick-assist-section">
                    <h2>Need Quick Assistance?</h2>
                    <p>Our team is available for instant consultations during business hours.</p>
                    <div className="assist-btns">
                        <a href="tel:07079797317" className="assist-btn call">
                            <Phone size={20} /> Call Now
                        </a>
                        <button onClick={quickInquiry} className="assist-btn whatsapp">
                            <MessageSquare size={20} /> WhatsApp Now
                        </button>
                    </div>
                </section>
            </div>

            {/* Sticky WhatsApp Floating Button */}
            <a 
                href={generateWhatsAppLink("Hello G'S Clinic, I need help with an inquiry.")} 
                className="floating-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
            >
                <MessageSquare size={30} />
            </a>
        </div>
    );
};

export default Contact;