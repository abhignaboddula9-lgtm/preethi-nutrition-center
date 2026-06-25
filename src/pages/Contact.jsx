import React, { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Weight Loss Program',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate API Submission
    setTimeout(() => {
      setSubmitted(true)
      // Reset after some time or keep showing success card
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'Weight Loss Program',
        message: ''
      })
    }, 800)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="contact-page animate-fade-in section-padding">
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>Contact & Book Consultation</h1>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '1.05rem' }} className="muted-text-selector">
            Have questions about our Zumba schedules or diet plans? Send us an inquiry, and Preethi's team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid-2">
          {/* Info Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '20px', color: 'var(--primary)' }}>
                Center Details
              </h3>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={20} style={{ color: 'var(--primary-light)', flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Clinic Address</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                      123 Wellness Blvd, Health City, HC 560001
                    </p>
                  </div>
                </li>
                
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Phone size={20} style={{ color: 'var(--primary-light)', flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Phone Lines</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                      +1 (234) 567-890 <br />
                      +1 (234) 567-891
                    </p>
                  </div>
                </li>

                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Mail size={20} style={{ color: 'var(--primary-light)', flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Email Support</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                      contact@preethinutrition.com <br />
                      support@preethinutrition.com
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '16px', color: 'var(--secondary)' }}>
                Operating Hours
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Monday - Friday:</strong>
                  <span>7:00 AM - 8:00 PM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Saturday:</strong>
                  <span>7:00 AM - 7:00 PM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Sunday:</strong>
                  <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>7:00 AM - 10:00 AM (Zumba Only)</span>
                </li>
              </ul>
            </div>
            
          </div>

          {/* Form Side */}
          <div>
            <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
              {submitted ? (
                <div className="animate-fade-in" style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    padding: '20px',
                    borderRadius: '50%',
                    width: 'max-content',
                    margin: '0 auto 20px auto'
                  }}>
                    <CheckCircle size={48} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '10px' }}>Inquiry Submitted!</h2>
                  <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.95rem', marginBottom: '20px' }} className="muted-text-selector">
                    Thank you for contacting Preethi Nutrition Center. A member of our clinical team will get in touch with you shortly.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-primary">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '4px' }}>
                    Send an Inquiry
                  </h3>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Aditi Sharma"
                      className="form-input"
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. aditi@example.com"
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 9876543210"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Area of Interest</label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="form-input"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="Weight Loss Program">Weight Loss Program</option>
                      <option value="Weight Gain Program">Weight Gain Program</option>
                      <option value="Zumba Classes">Zumba Classes</option>
                      <option value="Diet Consultation">Diet Consultation</option>
                      <option value="Healthy Meal Planning">Healthy Meal Planning</option>
                      <option value="Fitness Guidance">Fitness Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Your Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your health goals or conditions..."
                      className="form-input"
                      style={{ minHeight: '120px', resize: 'vertical' }}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                    <Send size={16} />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .dark-mode .muted-text-selector {
          color: var(--text-light-muted) !important;
        }
      `}} />
    </div>
  )
}
