import React, { useState } from 'react'
import { Calendar, Clock, User, CheckCircle, FileText } from 'lucide-react'

export default function AppointmentScheduler({ user, onAddAppointment }) {
  const [service, setService] = useState('Weight Loss Program')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('09:00 AM')
  const [consultant, setConsultant] = useState('Preethi Raghavan (Dietitian)')
  const [notes, setNotes] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!date) return

    onAddAppointment({
      service,
      date,
      time,
      consultant,
      notes,
      customerName: user.name,
      customerEmail: user.email,
      status: 'Pending'
    })

    setSuccess(true)
    // Clear
    setDate('')
    setNotes('')
  }

  const services = [
    'Weight Loss Program',
    'Weight Gain Program',
    'Zumba Class Booking',
    'General Diet Consultation',
    'Healthy Meal Planning',
    'Fitness Guidance Session',
    'Skin Health consultation'
  ]

  const consultants = [
    'Preethi Raghavan (Diet & Zumba)',
    'Dr. Neha Sen (Skin Care)',
    'Sameer Khan (Fitness Assistant)'
  ]

  const timeslots = [
    '07:00 AM', '09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'
  ]

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '30px', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)' }}>
      {success ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
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
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '10px' }}>
            Appointment Requested!
          </h3>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.95rem', marginBottom: '20px' }} className="muted-text-selector">
            Your booking request has been submitted to the Admin Panel. You can view its approval status under your Dashboard overview page.
          </p>
          <button onClick={() => setSuccess(false)} className="btn btn-primary">
            Book Another Slot
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ backgroundColor: 'var(--primary-glow)', color: 'var(--primary-light)', padding: '8px', borderRadius: '50%' }}>
              <Calendar size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>Schedule Appointment</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                Book a consultation or join a live exercise class.
              </p>
            </div>
          </div>

          <div className="grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Select Program / Service
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="form-input"
                style={{ cursor: 'pointer' }}
              >
                {services.map((srv, idx) => (
                  <option key={idx} value={srv}>{srv}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Preferred Specialist
              </label>
              <select
                value={consultant}
                onChange={(e) => setConsultant(e.target.value)}
                className="form-input"
                style={{ cursor: 'pointer' }}
              >
                {consultants.map((con, idx) => (
                  <option key={idx} value={con}>{con}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Choose Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Select Time Slot
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {timeslots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    style={{
                      padding: '10px 4px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-sm)',
                      border: time === slot ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                      backgroundColor: time === slot ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.4)',
                      color: time === slot ? 'var(--primary)' : 'inherit',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Add Notes / Health Complaints (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. I have high thyroid symptoms and lactose intolerance."
              className="form-input"
              style={{ minHeight: '80px', resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Confirm Booking Request
          </button>
        </form>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .dark-mode .muted-text-selector {
          color: var(--text-light-muted) !important;
        }
      `}} />
    </div>
  )
}
