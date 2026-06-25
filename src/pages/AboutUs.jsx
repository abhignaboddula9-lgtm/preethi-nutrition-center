import React from 'react'
import { Award, Compass, ShieldCheck, Heart, User, CheckCircle } from 'lucide-react'

export default function AboutUs({ setCurrentPage }) {
  const coreValues = [
    {
      icon: <Award size={28} style={{ color: 'var(--primary)' }} />,
      title: 'Scientific Method',
      desc: 'No fad diets or crash starve routines. We construct dietary plans using evidence-based nutrition science.'
    },
    {
      icon: <Heart size={28} style={{ color: 'var(--secondary)' }} />,
      title: 'Holistic Wellness',
      desc: 'True health involves balancing nutrition, functional exercise, mental peace, and sustainable lifestyle practices.'
    },
    {
      icon: <Compass size={28} style={{ color: '#8b5cf6' }} />,
      title: 'Tailored Approach',
      desc: 'Every metabolism, lifestyle, and food preference is different. We craft customized guidelines just for you.'
    }
  ]

  return (
    <div className="about-page animate-fade-in section-padding">
      <div className="container">
        {/* Intro */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>About Preethi Nutrition Center</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
            We are dedicated to helping individuals restore energy, manage chronic metabolic conditions, lose weight safely, and achieve peak physical performance through dietary plans and coaching.
          </p>
        </div>

        {/* Founder Bio Block */}
        <div className="grid-2" style={{ alignItems: 'center', marginBottom: '80px', gap: '50px' }}>
          {/* Avatar Graphic placeholder */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-card" style={{
              width: '100%',
              maxWidth: '400px',
              padding: '30px',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(249, 115, 22, 0.05))',
              border: '2px solid rgba(255,255,255,0.3)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-glow)',
                border: '4px solid var(--primary-light)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4.5rem',
                marginBottom: '20px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}>
                👩‍⚕️
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>Preethi Raghavan</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
                Chief Dietitian & Zumba Coach
              </p>
              <div style={{ 
                marginTop: '16px',
                fontSize: '0.8rem',
                color: 'var(--text-dark-muted)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }} className="muted-text-selector">
                <span>• M.Sc. Clinical Nutrition & Dietetics</span>
                <span>• Certified Zumba Fitness Instructor (ZIN)</span>
                <span>• 8+ Years Clinical Practice Experience</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-dark)' }}>Meet Our Founder</h2>
            <p style={{ color: 'var(--text-dark-muted)', fontSize: '1rem' }} className="muted-text-selector">
              Preethi Raghavan established the center with a single vision: **making nutrition approachable, delightful, and scientific**. After helping hundreds of patients in hospital environments, she realized that long-term healthy habits fail when diets are too restrictive and exercises feel like chores.
            </p>
            <p style={{ color: 'var(--text-dark-muted)', fontSize: '1rem' }} className="muted-text-selector">
              By combining custom metabolic dietary scheduling with high-energy cardiovascular Zumba routines, the Preethi Nutrition Center offers a unique combination of science-backed clinical nutrition and fun fitness guidance.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
                <CheckCircle size={18} style={{ color: 'var(--primary-light)' }} />
                <span>Tailored diabetic & thyroid diet control plans</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
                <CheckCircle size={18} style={{ color: 'var(--primary-light)' }} />
                <span>Active Zumba sessions suitable for all age brackets</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600 }}>
                <CheckCircle size={18} style={{ color: 'var(--primary-light)' }} />
                <span>Empathetic, non-judgmental health checkup tracking</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Values Block */}
        <section style={{ 
          borderTop: '1px solid var(--border-light)', 
          paddingTop: '60px' 
        }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px' }}>Our Core Philosophies</h2>
          <div className="grid-3">
            {coreValues.map((val, idx) => (
              <div 
                key={idx} 
                className="glass-card" 
                style={{ 
                  padding: '30px', 
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  padding: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginTop: '8px' }}>{val.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <div style={{
          marginTop: '80px',
          textAlign: 'center'
        }}>
          <button 
            onClick={() => {
              setCurrentPage('contact')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }} 
            className="btn btn-primary"
          >
            Schedule a Meeting with Preethi
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
