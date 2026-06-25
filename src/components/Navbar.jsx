import React, { useState } from 'react'
import { Menu, X, User, ShieldAlert, LogOut } from 'lucide-react'

const PINK = '#E75480'
const LAVENDER = '#C8A2C8'
const BG = '#FFFFFF'
const DARK_TEXT = '#2D2D2D'
const MUTED_TEXT = '#6B7280'

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  user, 
  onLogout, 
  onOpenLoginModal 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'diet-plans', label: 'Diet Plans' },
    { id: 'zumba', label: 'Zumba' },
    { id: 'success-stories', label: 'Success Stories' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: BG,
      borderBottom: `1px solid rgba(231, 84, 128, 0.10)`,
      padding: '0',
      boxShadow: '0 4px 24px rgba(231, 84, 128, 0.08)',
      transition: 'box-shadow 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '14px 28px',
        gap: '24px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <img 
            src="/uploads/logo.jpg" 
            alt="Preethi Nutrition Logo" 
            style={{ 
              height: '55px', 
              width: 'auto', 
              display: 'block',
              objectFit: 'contain',
              transition: 'transform 0.25s ease'
            }}
            onMouseOver={e => e.target.style.transform = 'scale(1.04)'}
            onMouseOut={e => e.target.style.transform = 'scale(1)'}
          />
        </div>

        {/* Desktop Nav */}
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '4px',
          alignItems: 'center',
          margin: 0,
          padding: 0,
          flexWrap: 'nowrap'
        }} className="desktop-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: currentPage === item.id ? `rgba(231, 84, 128, 0.06)` : 'none',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: currentPage === item.id ? PINK : MUTED_TEXT,
                  cursor: 'pointer',
                  padding: '8px 12px',
                  position: 'relative',
                  borderRadius: '8px',
                  transition: 'color 0.2s ease, background 0.2s ease',
                  fontFamily: "'Poppins', sans-serif",
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={e => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.color = LAVENDER
                    e.currentTarget.style.background = `rgba(200, 162, 200, 0.08)`
                  }
                }}
                onMouseOut={e => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.color = MUTED_TEXT
                    e.currentTarget.style.background = 'none'
                  }
                }}
              >
                {item.label}
                {currentPage === item.id && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '12px',
                    right: '12px',
                    height: '2px',
                    background: `linear-gradient(90deg, ${PINK}, ${LAVENDER})`,
                    borderRadius: '2px'
                  }} />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexShrink: 0
        }} className="desktop-menu">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => handleNavClick(user.role === 'admin' ? 'admin-dashboard' : 'customer-dashboard')}
                style={{ 
                  padding: '10px 22px', 
                  fontSize: '0.85rem',
                  background: `linear-gradient(135deg, ${PINK}, #C86DD7)`,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontFamily: "'Poppins', sans-serif",
                  boxShadow: `0 4px 14px rgba(231, 84, 128, 0.30)`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(231, 84, 128, 0.45)' }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(231, 84, 128, 0.30)' }}
              >
                {user.role === 'admin' ? (
                  <><ShieldAlert size={14} color="#FFFFFF" /><span>Admin Panel</span></>
                ) : (
                  <><User size={14} color="#FFFFFF" /><span>My Account</span></>
                )}
              </button>
              <button
                onClick={onLogout}
                title="Log Out"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  color: PINK,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={e => e.currentTarget.style.background = `rgba(231, 84, 128, 0.10)`}
                onMouseOut={e => e.currentTarget.style.background = 'none'}
              >
                <LogOut size={18} color={PINK} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              style={{ 
                padding: '10px 22px', 
                fontSize: '0.85rem', 
                background: `linear-gradient(135deg, ${PINK}, #C86DD7)`,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '50px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                fontFamily: "'Poppins', sans-serif",
                boxShadow: `0 4px 14px rgba(231, 84, 128, 0.30)`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(231, 84, 128, 0.45)' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(231, 84, 128, 0.30)' }}
            >
              <User size={14} color="#FFFFFF" />
              <span>Portal Login</span>
            </button>
          )}
        </div>

        {/* Hamburger */}
        <div style={{ display: 'none', alignItems: 'center' }} className="mobile-toggle">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: PINK,
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={24} color={PINK} /> : <Menu size={24} color={PINK} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '83px',
          left: 0,
          right: 0,
          background: '#FFFFFF',
          borderBottom: `1px solid rgba(231, 84, 128, 0.12)`,
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          zIndex: 999,
          boxShadow: '0 12px 32px rgba(231, 84, 128, 0.10)',
          animation: 'slideDown 0.25s ease'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: currentPage === item.id ? `rgba(231, 84, 128, 0.06)` : 'none',
                border: 'none',
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: currentPage === item.id ? 700 : 600,
                color: currentPage === item.id ? PINK : MUTED_TEXT,
                padding: '12px 16px',
                cursor: 'pointer',
                borderRadius: '10px',
                fontFamily: "'Poppins', sans-serif",
                transition: 'background 0.2s ease'
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {user ? (
              <>
                <button
                  onClick={() => handleNavClick(user.role === 'admin' ? 'admin-dashboard' : 'customer-dashboard')}
                  style={{ 
                    padding: '13px', 
                    fontSize: '0.95rem',
                    background: `linear-gradient(135deg, ${PINK}, #C86DD7)`,
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {user.role === 'admin' ? 'Admin Panel' : 'My Account'}
                </button>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  style={{ 
                    padding: '13px', 
                    fontSize: '0.95rem',
                    color: PINK,
                    border: `2px solid ${PINK}`,
                    borderRadius: '50px',
                    background: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => { onOpenLoginModal(); setMobileMenuOpen(false); }}
                style={{ 
                  padding: '13px', 
                  fontSize: '0.95rem',
                  background: `linear-gradient(135deg, ${PINK}, #C86DD7)`,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Portal Login
              </button>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 960px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}} />
    </nav>
  )
}
