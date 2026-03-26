import React, { useState } from 'react';
import { generateWhatsAppLink } from '../utils/whatsapp';
import './BookingForm.css';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        visitType: 'Clinic Visit', // Default
        preferredDate: '',
        preferredTime: 'Morning (9am - 12pm)',
        additionalNotes: ''
    });

    const [selectedServices, setSelectedServices] = useState([]);

    const availableServices = [
        "QRMA Diagnosis",
        "Physical Therapy",
        "Meridian Therapy",
        "Reflexology Therapy",
        "Laser Therapy",
        "Physical Diagnosis"
    ];

    const handleServiceChange = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleBooking = (e) => {
        e.preventDefault();

        if (selectedServices.length === 0) {
            alert("Please select at least one service.");
            return;
        }

        // Building the Professional WhatsApp Message
        const message = `*NEW APPOINTMENT REQUEST* 🏥
-----------------------------------
👤 *Patient Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📍 *Location/Address:* ${formData.location}

🛠 *Services Requested:*
${selectedServices.map(s => `• ${s}`).join('\n')}

🏢 *Booking Type:* ${formData.visitType}
📅 *Preferred Date:* ${formData.preferredDate}
⏰ *Time Slot:* ${formData.preferredTime}

📝 *Additional Notes:* ${formData.additionalNotes || 'None'}
-----------------------------------
_Sent from G'S Clinic Website_`;

        window.location.href = generateWhatsAppLink(message);
    };

    return (
        <div className="booking-container">
            <div className="booking-header">
                <h2>Secure Your Appointment</h2>
                <p>Fill in your details below. We will confirm your time slot on WhatsApp.</p>
            </div>

            <form onSubmit={handleBooking} className="form-grid">
                {/* Name & Phone */}
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                        type="text" required className="form-input" placeholder="John Doe"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                        type="tel" required className="form-input" placeholder="08012345678"
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                </div>

                {/* Visit Type Toggle */}
                <div className="form-group full-width">
                    <label className="form-label">How would you like to see us?</label>
                    <div className="visit-type">
                        <div 
                            className={`type-btn ${formData.visitType === 'Clinic Visit' ? 'active' : ''}`}
                            onClick={() => setFormData({...formData, visitType: 'Clinic Visit'})}
                        >
                            Clinic Visit
                        </div>
                        <div 
                            className={`type-btn ${formData.visitType === 'Home Service' ? 'active' : ''}`}
                            onClick={() => setFormData({...formData, visitType: 'Home Service'})}
                        >
                            Home Service
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="form-group full-width">
                    <label className="form-label">Residential Address / Location</label>
                    <input 
                        type="text" required className="form-input" placeholder="Enter your full address in Lagos"
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                </div>

                {/* Multi-Service Selection */}
                <div className="form-group full-width">
                    <label className="form-label">Select Services (You can pick more than one)</label>
                    <div className="services-selection">
                        {availableServices.map((service, index) => (
                            <label key={index} className="service-option">
                                <input 
                                    type="checkbox" 
                                    checked={selectedServices.includes(service)}
                                    onChange={() => handleServiceChange(service)}
                                />
                                {service}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Date & Time */}
                <div className="form-group">
                    <label className="form-label">Preferred Date</label>
                    <input 
                        type="date" required className="form-input"
                        onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Time Slot</label>
                    <select 
                        className="form-input"
                        onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                    >
                        <option>Morning (9am - 12pm)</option>
                        <option>Afternoon (12pm - 4pm)</option>
                        <option>Evening (4pm - 7pm)</option>
                    </select>
                </div>

                {/* Notes */}
                <div className="form-group full-width">
                    <label className="form-label">Anything else we should know?</label>
                    <textarea 
                        className="form-input" rows="3" placeholder="Explain your condition briefly..."
                        onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                    ></textarea>
                </div>

                <button type="submit" className="submit-booking full-width">
                    <span>Confirm Booking on WhatsApp</span>
                    <i style={{fontSize: '1.2rem'}}>➔</i>
                </button>
            </form>
        </div>
    );
};

export default BookingForm;