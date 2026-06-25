import React from 'react'
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Heart, Award, ShieldAlert } from 'lucide-react'
import BMICalculator from '../components/BMICalculator'
import DailyTipsWidget from '../components/DailyTipsWidget'

export default function Home({ setCurrentPage, user, onSaveBMI }) {
  const handleCTA = () => {
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

  const features = [
    {
      title: 'Weight Loss Programs',
      desc: 'Scientific, sustainable approaches to shred excess body fat and retain lean muscle without starving.',
      icon: '🥗',
      page: 'services'
    },
    {
      title: 'Weight Gain Programs',
      desc: 'Clean bulking and muscle-mass building guides with healthy calorie-dense planning.',
      icon: '💪',
      page: 'services'
    },
    {
      title: 'Zumba & Fitness Classes',
      desc: 'High-energy cardio dance workouts led by certified coaches. Burn calories while having fun!',
      icon: '💃',
      page: 'zumba'
    },
    {
      title: 'Personalized Diet Plans',
      desc: 'Customized diets for Old-age, Women, Men, Kids, Skin health, and Weight loss from home.',
      icon: '🍱',
      page: 'diet-plans'
    }
  ]

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section style={{
        padding: '100px 0 80px 0',
        background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.08) 0%, rgba(249, 115, 22, 0.05) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              alignSelf: 'flex-start',
              padding: '6px 16px',
              backgroundColor: 'var(--primary-glow)',
              color: 'var(--primary)',
              borderRadius: '999px',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}>
              <Sparkles size={14} style={{ color: 'var(--primary-light)' }} />
              <span>Transform Your Health & Fitness</span>
            </div>
            
            <h1 style={{
              fontSize: '3.5rem',
              lineHeight: '1.1',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800
            }}>
              Preethi <br />
              <span style={{ color: 'var(--primary)' }}>Nutrition Center</span>
            </h1>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
              Your comprehensive destination for science-backed nutrition counseling, dynamic Zumba workouts, and structured wellness plans tailored to your busy lifestyle.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={handleCTA} className="btn btn-primary">
                <Calendar size={18} />
                <span>Book Appointment</span>
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('services')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }} 
                className="btn btn-outline"
              >
                <span>Explore Programs</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Quick trust indicators */}
            <div style={{ 
              display: 'flex', 
              gap: '24px', 
              marginTop: '16px',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Certified Nutritionists</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={20} style={{ color: 'var(--secondary)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>1000+ Success Stories</span>
              </div>
            </div>
          </div>

          {/* Graphic Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'var(--primary-glow)',
              filter: 'blur(60px)',
              top: '-50px',
              right: '-50px',
              zIndex: -1
            }} />
            
            {/* Visual Panel Showcase */}
            <div className="glass-card" style={{
              padding: '30px',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid rgba(255,255,255,0.4)',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))'
            }}>
              <div style={{
                fontSize: '4.5rem',
                margin: '10px 0',
                display: 'inline-block',
                animation: 'pulse 3s infinite'
              }}>
                🍍🥗💃
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-dark)', fontSize: '1.5rem', marginBottom: '8px' }}>
                Eat Well. Move Often. Feel Great.
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                From specialized old-age care, children dietary planning, to high-energy Zumba classes, we have programs crafted for every age group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Section */}
      <section className="section-padding" style={{ backgroundColor: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>Take Your First Health Step</h2>
            <p style={{ color: 'var(--text-dark-muted)' }} className="muted-text-selector">
              Calculate your body mass index instantly using our smart tool, and read today's wellness and fitness tips.
            </p>
          </div>
          
          <div className="grid-2">
            <div>
              <BMICalculator user={user} onSaveBMI={onSaveBMI} />
            </div>
            <div>
              <DailyTipsWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="section-padding" style={{
        background: 'rgba(15, 118, 110, 0.03)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>Our Featured Programs</h2>
            <p style={{ color: 'var(--text-dark-muted)' }} className="muted-text-selector">
              Discover nutrition & fitness routines curated by professionals to match your personal body structure and goals.
            </p>
          </div>

          <div className="grid-4">
            {features.map((feat, index) => (
              <div 
                key={index} 
                className="glass-card" 
                style={{ 
                  padding: '30px', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setCurrentPage(feat.page)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <div style={{ fontSize: '2.5rem' }}>{feat.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>{feat.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-muted)', flexGrow: 1 }} className="muted-text-selector">
                  {feat.desc}
                </p>
                <div style={{ 
                  color: 'var(--primary)', 
                  fontWeight: 700, 
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Testimonial Banner */}
      <section className="section-padding">
        <div className="container">
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            color: 'white',
            padding: '50px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '12px' }}>
                Join the Healthy Living Revolution
              </h2>
              <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                "Preethi's custom plans completely revolutionized how I view healthy meals. I lost 12 kgs from home while eating delicious food!"
              </p>
              <div style={{ marginTop: '12px', fontWeight: 700 }}>
                — Aditi K., Tech Professional
              </div>
            </div>
            <div>
              <button 
                onClick={() => {
                  setCurrentPage('success-stories')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }} 
                className="btn btn-secondary"
                style={{ fontSize: '1rem' }}
              >
                Read Success Stories
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .dark-mode .muted-text-selector {
          color: var(--text-light-muted) !important;
        }
      `}} />
    </div>
  )
}
