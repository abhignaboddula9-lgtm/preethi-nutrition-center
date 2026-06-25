import React from 'react'
import { Sparkles, Calendar, Apple, Scale, Activity, ClipboardList, HelpCircle, Dumbbell } from 'lucide-react'

export default function Services({ setCurrentPage, user }) {
  const servicesList = [
    {
      icon: <Scale size={28} />,
      title: 'Weight Loss Programs',
      tagline: 'Lose fat, gain energy',
      desc: 'Our structured weight loss plans focus on calorie control, metabolic acceleration, and muscle preservation. We customize meal portions around your local ingredients so you never have to eat tasteless, expensive health food.',
      color: 'var(--primary)'
    },
    {
      icon: <Dumbbell size={28} />,
      title: 'Weight Gain Programs',
      tagline: 'Build lean bulk safely',
      desc: 'Targeted muscle mass development program. Focuses on safe caloric surpluses, macro-nutrient density calculation, and high-protein scheduling paired with home/gym strength training.',
      color: 'var(--secondary)'
    },
    {
      icon: <ClipboardList size={28} />,
      title: 'Diet Consultation',
      tagline: '1-on-1 metabolic assessment',
      desc: 'Personalized assessment of your metabolic rate, lifestyle profile, body measurements, and genetic conditions (Thyroid, Diabetes, PCOS). Receive clear food guides and habit tracking sheets.',
      color: '#8b5cf6'
    },
    {
      icon: <Apple size={28} />,
      title: 'Nutrition Counseling',
      tagline: 'Rebuild your relation with food',
      desc: 'Understand the psychological aspects of eating. We address emotional bingeing, stress eating, and late-night cravings. We teach you how to read nutrition labels and eat out guilt-free.',
      color: '#ec4899'
    },
    {
      icon: <Activity size={28} />,
      title: 'Zumba Classes',
      tagline: 'Dance off the calories',
      desc: 'Energetic, rhythmic dance workouts combining Latin and international beats. Perfect cardiovascular training that burns up to 600 calories an hour while elevating endorphins.',
      color: '#f59e0b'
    },
    {
      icon: <Apple size={28} />,
      title: 'Healthy Meal Planning',
      tagline: 'Macro-balanced kitchen guides',
      desc: 'We map out your weekly kitchen routine. Includes grocery shopping checklists, healthy substitution guides (e.g. swapping processed oils), and quick, high-nutrient recipes.',
      color: '#06b6d4'
    },
    {
      icon: <Activity size={28} />,
      title: 'Fitness Guidance',
      tagline: 'Body conditioning & coaching',
      desc: 'Tailored mobility, posture correction, and stamina-building exercise programs that can be executed from home with zero specialized workout gear.',
      color: '#10b981'
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
    <div className="services-page animate-fade-in section-padding">
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>Our Programs & Services</h1>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '1.05rem' }} className="muted-text-selector">
            Professional nutrition coaching and fitness planning. Choose a specialized program designed to match your body type and fitness aspirations.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '60px' }}>
          {servicesList.map((srv, idx) => (
            <div 
              key={idx} 
              className="glass-card" 
              style={{
                padding: '30px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                borderLeft: `5px solid ${srv.color}`
              }}
            >
              {/* Icon Panel */}
              <div style={{
                backgroundColor: `${srv.color}15`,
                color: srv.color,
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {srv.icon}
              </div>

              {/* Description Panel */}
              <div style={{ flex: 1, minWidth: '280px' }}>
                <span style={{ 
                  color: srv.color, 
                  fontWeight: 700, 
                  fontSize: '0.8rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}>
                  {srv.tagline}
                </span>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: '1.5rem', 
                  marginTop: '4px',
                  marginBottom: '10px'
                }}>
                  {srv.title}
                </h3>
                <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.9rem' }} className="muted-text-selector">
                  {srv.desc}
                </p>
              </div>

              {/* Action Button */}
              <div style={{ alignSelf: 'center' }}>
                <button 
                  onClick={handleBooking} 
                  className="btn btn-outline"
                  style={{ 
                    borderColor: srv.color, 
                    color: srv.color,
                    padding: '10px 20px',
                    fontSize: '0.85rem'
                  }}
                >
                  <Calendar size={14} />
                  <span>Schedule Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Callout box */}
        <div className="glass-card" style={{
          backgroundColor: 'var(--primary-glow)',
          border: '1px dashed var(--primary)',
          padding: '40px',
          textAlign: 'center',
          borderRadius: 'var(--radius-md)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '12px' }}>
            Unsure which program fits your structure?
          </h2>
          <p style={{ color: 'var(--text-dark-muted)', maxWidth: '650px', margin: '0 auto 20px auto', fontSize: '0.95rem' }} className="muted-text-selector">
            Get an in-depth metabolic screening session where our chief dietitian assesses your muscle-to-fat index and constructs a custom pathway report.
          </p>
          <button onClick={() => {
            setCurrentPage('contact')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }} className="btn btn-primary">
            Request Wellness Screening
          </button>
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
