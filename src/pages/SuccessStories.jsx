import React from 'react'
import { Award, Heart, MessageSquare, Quote, Star } from 'lucide-react'
import BeforeAfterSlider from '../components/BeforeAfterSlider'

export default function SuccessStories() {
  const testimonials = [
    {
      name: 'Aditi K.',
      title: 'Tech Professional',
      program: 'Weight Loss from Home',
      metric: 'Lost 12 kg in 4 Months',
      text: 'I was skeptical about losing weight while working a desk job, but Preethi created simple, realistic home-cooked diet patterns. The daily checkup logs kept me accountable!',
      rating: 5
    },
    {
      name: 'Rohan Sharma',
      title: 'College Student',
      program: 'Weight Gain & Muscle Building',
      metric: 'Gained 8 kg of Lean Mass',
      text: 'Struggled to gain weight for years due to a high metabolism. Preethi adjusted my macros, suggested healthy dense snacks, and paired it with a home strength training calendar.',
      rating: 5
    },
    {
      name: 'Gayatri Murthy',
      title: 'Retired Teacher (Age 64)',
      program: 'Old-Age Joint & Bone Care',
      metric: 'Relieved Knee Pain & Stabilized sugar',
      text: 'The calcium-rich old-age meal plans completely resolved my persistent knee stiffness, and my HbA1c levels stabilized in just 3 months. Highly recommended senior guidance!',
      rating: 5
    },
    {
      name: 'Dr. Neha Sen',
      title: 'Dermatologist',
      program: 'Skin Health & Radiance Diet',
      metric: 'Cleared Persistent Eczema',
      text: 'As a doctor, I understand the gut-skin axis. Preethi\'s antioxidant & omega-3 anti-inflammatory diet plan cleared up my skin eczema flare-ups faster than topical applications.',
      rating: 5
    }
  ]

  return (
    <div className="success-stories-page animate-fade-in section-padding">
      <div className="container">
        
        {/* Intro */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>Client Success Stories</h1>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '1.05rem' }} className="muted-text-selector">
            Real people, real results. Browse through real transformations from clients who reconstructed their health habits at Preethi Nutrition Center.
          </p>
        </div>

        {/* Visual Slider Interactive Segment */}
        <div className="glass-card" style={{
          padding: '40px',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '80px',
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(249, 115, 22, 0.05))'
        }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: 'var(--primary-glow)',
                color: 'var(--primary)',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                width: 'max-content'
              }}>
                <Award size={14} />
                <span>Drag to Compare</span>
              </div>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>Interactive Transformation Comparison</h2>
              <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.95rem' }} className="muted-text-selector">
                Drag the slider handle on the widget to see how a consistent, structured nutritional diet combined with aerobic Zumba workouts changes energy levels, fat index, and skin vitality.
              </p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>94%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Stamina Increase</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)' }}>-15%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Average Body Fat</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8b5cf6' }}>3+ Years</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Sustained Habits</div>
                </div>
              </div>
            </div>

            <div>
              <BeforeAfterSlider />
            </div>
          </div>
        </div>

        {/* Written testimonies */}
        <div>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '45px' }}>What Our Clients Say</h2>
          <div className="grid-2">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="glass-card" 
                style={{ 
                  padding: '30px', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px',
                  position: 'relative'
                }}
              >
                <Quote size={40} style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  color: 'var(--primary-glow)',
                  opacity: 0.8
                }} />

                {/* Rating stars */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: 'var(--text-dark-muted)',
                  fontStyle: 'italic',
                  position: 'relative',
                  zIndex: 2
                }} className="muted-text-selector">
                  "{test.text}"
                </p>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '16px',
                  marginTop: 'auto'
                }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>{test.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                      {test.title}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      color: 'var(--primary)',
                      backgroundColor: 'var(--primary-glow)',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>
                      {test.program}
                    </span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--secondary)', marginTop: '4px' }}>
                      {test.metric}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
