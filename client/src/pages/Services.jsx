import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { 
    Stethoscope, 
    Info, 
    CheckCircle2, 
    Clock, 
    Home, 
    HelpCircle, 
    MessageCircle,
    Activity,
    Wind // Icon for massage/relaxation feel
} from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsapp';
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get('http://localhost:5000/api/services')
            .then(res => setServices(res.data))
            .catch(err => console.error(err));
    }, []);

    const goToBooking = () => {
        navigate('/book');
    };

    const handleWhatsAppInquiry = (msgText) => {
        window.location.href = generateWhatsAppLink(msgText);
    };

    // Helper to assign icons based on service name
    const getServiceIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('home')) return <Home size={28} />;
        if (lowerName.includes('massage')) return <Wind size={28} />;
        return <Activity size={28} />;
    };

    return (
        <div className="services-page">
            <header className="services-hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content-alt">
                    <div className="badge-light">
                        <Activity size={14} /> <span>Professional Care</span>
                    </div>
                    <h1>Our Specialized <br/><span>Treatments</span></h1>
                    <p>Advanced non-invasive therapy solutions designed to restore your mobility and natural health.</p>
                </div>
            </header>

            <div className="container">
                <section className="services-modern-grid">
                    {services.map((service) => (
                        <div key={service._id} className="modern-service-card">
                            <div className="s-card-top">
                                <div className="s-icon-box">
                                    {getServiceIcon(service.name)}
                                </div>
                                <h3>{service.name}</h3>
                                <p>{service.description}</p>
                            </div>
                            
                            <div className="s-card-actions">
                                <button className="btn btn-primary-sm" onClick={goToBooking}>
                                    Book Now
                                </button>
                                <button className="btn btn-outline-sm" onClick={() => setSelectedService(service)}>
                                    <Info size={16} /> Details
                                </button>
                            </div>
                        </div>
                    ))}
                </section>

                {selectedService && (
                    <div className="service-modal-overlay">
                        <div className="service-modal animate-pop">
                            <button className="close-modal" onClick={() => setSelectedService(null)}>&times;</button>
                            
                            <div className="modal-header">
                                <div className="modal-icon">{getServiceIcon(selectedService.name)}</div>
                                <h2>{selectedService.name}</h2>
                            </div>

                            <div className="modal-body">
                                <h4>Treatment Overview</h4>
                                <p>{selectedService.description}</p>
                                
                                <div className="modal-benefits">
                                    <span className="benefit-tag"><CheckCircle2 size={14}/> Professional Care</span>
                                    <span className="benefit-tag"><CheckCircle2 size={14}/> Non-Invasive</span>
                                    <span className="benefit-tag"><CheckCircle2 size={14}/> Effective Healing</span>
                                </div>

                                <div className="modal-info-strip">
                                    <Clock size={18} />
                                    <span><strong>Typical Duration:</strong> 45 - 90 Minutes per session</span>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-primary" style={{ width: '100%' }} onClick={goToBooking}>
                                    Proceed to Booking Form
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Features Section */}
                <section className="section-padding">
                    <h2 className="section-title">The G'S Clinic Advantage</h2>
                    <div className="grid">
                        <div className="feature-card">
                            <CheckCircle2 size={32} color="#2e7d32" />
                            <h4>Expert Therapists</h4>
                            <p>Our team consists of certified professionals dedicated to your recovery.</p>
                        </div>
                        <div className="feature-card">
                            <Activity size={32} color="#2e7d32" />
                            <h4>Personalized Plans</h4>
                            <p>We create unique therapy routines based on your specific health needs.</p>
                        </div>
                        <div className="feature-card">
                            <Home size={32} color="#2e7d32" />
                            <h4>Convenience</h4>
                            <p>Choose between visiting our clinic or having us come to you.</p>
                        </div>
                    </div>
                </section>

                <section className="home-service-banner-alt">
                    <div className="hs-left">
                        <Home size={40} />
                        <div>
                            <h3>Need a Home Visit?</h3>
                            <p>Stay where you are. We bring the equipment and therapy to you.</p>
                        </div>
                    </div>
                    <button className="btn btn-white" onClick={goToBooking}>
                        Book Home Visit
                    </button>
                </section>

                <section className="final-cta-section">
                    <HelpCircle size={40} color="#2e7d32" />
                    <h3>Not sure which treatment you need?</h3>
                    <p>Speak with our lead therapist for a quick consultation.</p>
                    <button className="btn btn-primary" onClick={() => handleWhatsAppInquiry("Hello, I need advice on which therapy service is best for me.")}>
                        <MessageCircle size={20} /> Chat with us
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Services;