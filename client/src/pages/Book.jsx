import React, { useState } from 'react';
import { User, Phone, MapPin, Home, Building2, Activity, Clock, Calendar, MessageCircle, AlertCircle } from 'lucide-react'; 
import { generateWhatsAppLink } from '../utils/whatsapp';
import './Book.css'; 

const Book = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        visitType: 'Clinic Visit',
        preferredTime: '', 
        additionalNotes: ''
    });

    const [selectedServices, setSelectedServices] = useState([]);

        const availableServices = [
            "Physical therapy",
            "Home service (home treatment visits)",
            "Massage therapy (in-office)"
        ];

    const handleServiceChange = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const formatTime = (time) => {
        if(!time) return "Not specified";
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const formattedHours = h % 12 || 12;
        return `${formattedHours}:${minutes} ${ampm}`;
    };

    const handleBooking = (e) => {
        e.preventDefault();

        // 1. Service selection check
        if (selectedServices.length === 0) {
            alert("Please select at least one service.");
            return;
        }

        // 2. TIME RANGE VALIDATION (8 AM to 6 PM)
        const selectedTime = formData.preferredTime;
        if (selectedTime < "08:00" || selectedTime > "18:00") {
            alert("Our clinic hours are 8:00 AM to 6:00 PM. Please pick a time within this range.");
            return;
        }

        const locationInfo = formData.visitType === 'Home Service' 
            ? `📍 *Address:* ${formData.location}` 
            : `📍 *Location:* Clinic Office (Lagos)`;

        const message = `*NEW APPOINTMENT REQUEST* 🏥\n-----------------------------------\n👤 *Patient Name:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n${locationInfo}\n\n🛠 *Services Requested:*\n${selectedServices.map(s => `• ${s}`).join('\n')}\n\n🏢 *Booking Type:* ${formData.visitType}\n⏰ *Specific Time:* ${formatTime(formData.preferredTime)}\n📅 *Date Request:* Please assign a date (Mon-Sat)\n\n📝 *Notes:* ${formData.additionalNotes || 'None'}\n-----------------------------------\n_Sent from G'S Clinic Website_`;

        window.location.href = generateWhatsAppLink(message);
    };

    return (
        <div className="booking-page">
            <div className="booking-hero">
                <div className="container">
                    <h1>Book Your Appointment</h1>
                    <p>Professional therapy from 8:00 AM to 6:00 PM. We assign dates between Mon - Sat.</p>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-50px' }}>
                <div className="booking-container">
                    <form onSubmit={handleBooking} className="form-grid">
                        
                        <div className="form-group">
                            <label className="form-label"><User size={18} /> Full Name</label>
                            <input 
                                type="text" required className="form-input" placeholder="Enter your name"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label"><Phone size={18} /> Phone Number</label>
                            <input 
                                type="tel" required className="form-input" placeholder="07079797317"
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label className="form-label">Appointment Type</label>
                            <div className="visit-type-toggle">
                                <button 
                                    type="button"
                                    className={`type-btn ${formData.visitType === 'Clinic Visit' ? 'active' : ''}`}
                                    onClick={() => setFormData({...formData, visitType: 'Clinic Visit', location: ''})}
                                >
                                    <Building2 size={20} /> Clinic Visit
                                </button>
                                <button 
                                    type="button"
                                    className={`type-btn ${formData.visitType === 'Home Service' ? 'active' : ''}`}
                                    onClick={() => setFormData({...formData, visitType: 'Home Service'})}
                                >
                                    <Home size={20} /> Home Service
                                </button>
                            </div>
                        </div>

                        {formData.visitType === 'Home Service' && (
                            <div className="form-group full-width animate-fade-in">
                                <label className="form-label"><MapPin size={18} /> Your Home Address</label>
                                <textarea 
                                    required className="form-input" 
                                    placeholder="Full street address in Lagos" rows="3"
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                ></textarea>
                            </div>
                        )}

                        <div className="form-group full-width">
                            <label className="form-label"><Activity size={18} /> Select Services</label>
                            <div className="services-selection-grid">
                                {availableServices.map((service, index) => (
                                    <div key={index} className={`service-chip ${selectedServices.includes(service) ? 'selected' : ''}`}
                                         onClick={() => handleServiceChange(service)}>
                                        {service}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label"><Clock size={18} /> Pick Time (8 AM - 6 PM)</label>
                            <input 
                                type="time" 
                                required 
                                min="08:00" 
                                max="18:00"
                                className="form-input" 
                                onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                            />
                        </div>

                        <div className="form-group">
                            <div className="schedule-notice">
                                <strong><Calendar size={16} /> Monday - Saturday</strong>
                                <p>We operate 8am - 6pm. We will contact you to assign a specific date for your time.</p>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label className="form-label">Additional Information (Optional)</label>
                            <textarea 
                                className="form-input" rows="2" placeholder="Briefly describe your condition..."
                                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                            ></textarea>
                        </div>

                        <button type="submit" className="booking-submit-btn full-width">
                            <MessageCircle size={22} /> Confirm on WhatsApp
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Book;