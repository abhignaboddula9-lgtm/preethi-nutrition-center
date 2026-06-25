import React from 'react'
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react'

const PINK = '#E75480'
const LAVENDER = '#C8A2C8'
const WHITE = '#FFFFFF'
const WHITE85 = 'rgba(255,255,255,0.85)'
const WHITE70 = 'rgba(255,255,255,0.70)'
const WHITE20 = 'rgba(255,255,255,0.20)'
const WHITE15 = 'rgba(255,255,255,0.15)'
const WHITE28 = 'rgba(255,255,255,0.28)'

const SocialIcon = ({ icon: Icon, label }) => (
  <a
    href="#"
    aria-label={label}
    style={{
      width: '38px', height: '38px', borderRadius: '50%',
      background: WHITE15, display: 'flex', alignItems: 'center',
      justifyContent: 'center', textDecoration: 'none',
      transition: 'background 0.2s ease'
    }}
    onMouseOver={e => e.currentTarget.style.background = WHITE28}
    onMouseOut={e => e.currentTarget.style.background = WHITE15}
  >
    <Icon size={16} color={WHITE} strokeWidth={2} />
  </a>
)

const LinkItem = ({ label, onClick }) => (
  <li>
    <button
      onClick={onClick}
      style={{
        background: 'none', border: 'none', color: WHITE85,
        cursor: 'pointer', padding: 0, textAlign: 'left',
        fontWeight: 500, fontSize: '0.9rem', fontFamily: "'Inter', sans-serif",
        transition: 'color 0.2s ease'
      }}
      onMouseOver={e => e.currentTarget.style.color = WHITE}
      onMouseOut={e => e.currentTarget.style.color = WHITE85}
    >
      {label}
    </button>
  </li>
)

export default function Footer({ setCurrentPage }) {
  const handleNav = (pageId) => {
    setCurrentPage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{
      background: `linear-gradient(135deg, ${PINK} 0%, #C86DD7 60%, ${LAVENDER} 100%)`,
      color: WHITE,
      padding: '80px 0 32px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 28px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '44px',
          marginBottom: '56px'
        }}>

          {/* Col 1: Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div onClick={() => handleNav('home')} style={{ cursor: 'pointer', display: 'inline-flex' }}>
              <img 
                src="/uploads/logo.jpg" 
                alt="Preethi Nutrition Logo" 
                style={{ 
                  height: '55px', width: 'auto', display: 'block',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.95
                }}
              />
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', margin: 0, color: WHITE85 }}>
              Empowering you to live your healthiest life through science-backed nutrition, personalised diet plans, and energetic Zumba sessions.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <SocialIcon icon={Instagram} label="Instagram" />
              <SocialIcon icon={Facebook} label="Facebook" />
              <SocialIcon icon={MessageCircle} label="WhatsApp" />
            </div>
          </div>

          {/* Col 2: Programs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '1rem', fontWeight: 700,
              color: WHITE, margin: 0, letterSpacing: '0.5px'
            }}>Programs</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <LinkItem label="Weight Loss Program"    onClick={() => handleNav('services')} />
              <LinkItem label="Weight Gain Program"    onClick={() => handleNav('services')} />
              <LinkItem label="Zumba Classes"          onClick={() => handleNav('zumba')} />
              <LinkItem label="Diet Consultation"      onClick={() => handleNav('services')} />
              <LinkItem label="Meal Planning"          onClick={() => handleNav('services')} />
            </ul>
          </div>

          {/* Col 3: Diet Plans */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '1rem', fontWeight: 700,
              color: WHITE, margin: 0, letterSpacing: '0.5px'
            }}>Diet Plans</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <LinkItem label="Women's Nutrition"         onClick={() => handleNav('diet-plans')} />
              <LinkItem label="Men's Nutrition"           onClick={() => handleNav('diet-plans')} />
              <LinkItem label="Children's Nutrition"      onClick={() => handleNav('diet-plans')} />
              <LinkItem label="Senior Wellness"           onClick={() => handleNav('diet-plans')} />
              <LinkItem label="Skin Health & Radiance"    onClick={() => handleNav('diet-plans')} />
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '1rem', fontWeight: 700,
              color: WHITE, margin: 0, letterSpacing: '0.5px'
            }}>Get In Touch</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={15} color={WHITE85} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.875rem', color: WHITE85, lineHeight: '1.5' }}>Main Road, Block A, Bangalore, India</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={15} color={WHITE85} />
                <span style={{ fontSize: '0.875rem', color: WHITE85 }}>+91 98765 43210</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={15} color={WHITE85} />
                <span style={{ fontSize: '0.875rem', color: WHITE85 }}>info@preethinutrition.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Clock size={15} color={WHITE85} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.875rem', color: WHITE85, lineHeight: '1.6' }}>
                  Mon–Fri: 6am–11:30am &amp; 4:30pm–8:30pm<br />
                  Sat: 6am–12pm &nbsp;|&nbsp; Sun: Closed
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: `1px solid ${WHITE20}`,
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <p style={{ fontSize: '0.82rem', color: WHITE70, margin: 0 }}>
            &copy; {new Date().getFullYear()} Preethi Nutrition Center. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service'].map(label => (
              <button
                key={label}
                style={{ background: 'none', border: 'none', color: WHITE70, cursor: 'pointer', fontSize: '0.82rem', padding: 0, fontFamily: "'Inter', sans-serif", transition: 'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = WHITE}
                onMouseOut={e => e.currentTarget.style.color = WHITE70}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
