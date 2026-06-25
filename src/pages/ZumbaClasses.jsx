import React from 'react'
import { Activity, Flame, Heart, Sparkles, Calendar, Clock, Smile } from 'lucide-react'

export default function ZumbaClasses({ setCurrentPage, user }) {
  const schedule = [
    { day: 'Monday', time: '7:00 AM - 8:00 AM', type: 'Morning Energy Booster', level: 'All Levels' },
    { day: 'Wednesday', time: '7:00 AM - 8:00 AM', type: 'Zumba Toning & Cardio', level: 'Intermediate' },
    { day: 'Friday', time: '7:00 AM - 8:00 AM', type: 'Morning Energy Booster', level: 'All Levels' },
    { day: 'Saturday', time: '6:00 PM - 7:00 PM', type: 'Zumba Sunset Party', level: 'All Levels' },
    { day: 'Sunday', time: '7:30 AM - 9:00 AM', type: 'Mega Zumba Masterclass', level: 'Beginner Friendly' }
  ]

  const benefits = [
    {
      icon: <Flame size={24} style={{ color: 'var(--secondary)' }} />,
      title: 'High Calorie Burn',
      desc: 'Burn between 500 to 800 calories in a single, high-energy 60-minute session without feeling like you are grinding.'
    },
    {
      icon: <Heart size={24} style={{ color: '#ef4444' }} />,
      title: 'Cardiovascular Strength',
      desc: 'Build outstanding cardiac endurance and overall stamina by alternating high and low intensity dance rhythms.'
    },
    {
      icon: <Smile size={24} style={{ color: 'var(--primary-light)' }} />,
      title: 'Stress Relief & Joy',
      desc: 'Dance releases dopamine and endorphins. Shake off work fatigue and reset your mental peace in a supportive environment.'
    }
  ]

  const handleBooking = () => {
    if (user) {
      if (user.role === 'admin') {
        setCurrentPage('admin-dashboard')
      } else {
        setCurrentPage('customer-dashboard')
      }
    } else {
      setCurrentPage('contact')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="zumba-page animate-fade-in section-padding">
      <div className="container">
        
        {/* Banner */}
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          color: 'white',
          padding: '60px 40px',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px',
          boxShadow: '0 15px 35px rgba(249, 115, 22, 0.2)'
        }}>
          <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              padding: '4px 12px', 
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              width: 'max-content'
            }}>
              💃 Zumba Fitness ZIN™ Certified
            </span>
            <h1 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-heading)', lineHeight: '1.1' }}>
              Lose Weight Dancing with Preethi!
            </h1>
            <p style={{ fontSize: '1.05rem', opacity: 0.9 }}>
              No dance experience required! Join our highly energetic classes combining Latin, Bollywood, and hip-hop rhythms. Sweat out your stress and sculpt your ideal physique.
            </p>
          </div>
          <div>
            <button 
              onClick={handleBooking} 
              className="btn"
              style={{ 
                backgroundColor: 'white', 
                color: '#ea580c',
                fontSize: '1rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            >
              <Calendar size={18} />
              Book Zumba Session
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px' }}>Why You'll Love Zumba Classes</h2>
          <div className="grid-3">
            {benefits.map((ben, idx) => (
              <div 
                key={idx} 
                className="glass-card" 
                style={{ 
                  padding: '30px', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px' 
                }}
              >
                <div style={{
                  backgroundColor: 'rgba(249, 115, 22, 0.08)',
                  padding: '12px',
                  borderRadius: '50%',
                  width: 'max-content'
                }}>
                  {ben.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>{ben.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                  {ben.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}>Weekly Class Schedule</h2>
          <div className="glass-card animate-fade-in" style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              minWidth: '550px',
              fontSize: '0.95rem'
            }}>
              <thead>
                <tr style={{
                  borderBottom: '2px solid var(--border-light)',
                  backgroundColor: 'rgba(0,0,0,0.02)'
                }}>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>Day</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>Time Slot</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>Class Type</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>Level</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((slot, idx) => (
                  <tr key={idx} style={{
                    borderBottom: idx !== schedule.length - 1 ? '1px solid var(--border-light)' : 'none'
                  }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{slot.day}</td>
                    <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} style={{ color: 'var(--primary-light)' }} />
                      <span>{slot.time}</span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>{slot.type}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: slot.level.includes('Beginner') ? 'rgba(16, 185, 129, 0.1)' : 'var(--primary-glow)',
                        color: slot.level.includes('Beginner') ? '#10b981' : 'var(--primary)'
                      }}>
                        {slot.level}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <button 
                        onClick={handleBooking} 
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--secondary)',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        Book Class
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
