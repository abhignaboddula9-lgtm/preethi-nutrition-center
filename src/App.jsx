import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Import pages
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import DietPlans from './pages/DietPlans'
import ZumbaClasses from './pages/ZumbaClasses'
import SuccessStories from './pages/SuccessStories'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'

// Icons
import { X, Lock, Mail, User, Info, Scale } from 'lucide-react'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  
  // Auth Modal States
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [authTab, setAuthTab] = useState('login') // 'login' or 'register'
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Register Form States
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerHeight, setRegisterHeight] = useState('')
  const [registerWeight, setRegisterWeight] = useState('')
  const [registerError, setRegisterError] = useState('')

  // Global theme (Forced to light mode)
  const darkMode = false
  const setDarkMode = () => {}

  // Notification Alert States
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('success') // 'success' or 'error'

  // Load user session on mount
  useEffect(() => {
    const session = localStorage.getItem('preethi_user_session')
    if (session) {
      setUser(JSON.parse(session))
    }

    // Initialize default admin account if not exists
    const usersList = JSON.parse(localStorage.getItem('preethi_users') || '[]')
    const adminExists = usersList.some(u => u.role === 'admin')
    if (!adminExists) {
      const defaultAdmin = {
        name: 'Preethi Raghavan (Admin)',
        email: 'admin',
        password: 'admin',
        role: 'admin'
      }
      localStorage.setItem('preethi_users', JSON.stringify([defaultAdmin, ...usersList]))
    }
  }, [])

  // Force light mode class on body element
  useEffect(() => {
    document.body.classList.remove('dark-mode')
  }, [])

  // Trigger alert messages
  const showAlert = (msg, type = 'success') => {
    setAlertMsg(msg)
    setAlertType(type)
    setTimeout(() => {
      setAlertMsg('')
    }, 4000)
  }

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setLoginError('')

    const usersList = JSON.parse(localStorage.getItem('preethi_users') || '[]')
    
    // Check credentials (supports local storage customer list + static admin)
    const matchedUser = usersList.find(
      u => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword
    )

    if (matchedUser) {
      setUser(matchedUser)
      localStorage.setItem('preethi_user_session', JSON.stringify(matchedUser))
      setShowLoginModal(false)
      showAlert(`Welcome back, ${matchedUser.name}!`)
      
      // Redirect based on role
      if (matchedUser.role === 'admin') {
        setCurrentPage('admin-dashboard')
      } else {
        setCurrentPage('customer-dashboard')
      }
      
      // Reset forms
      setLoginEmail('')
      setLoginPassword('')
    } else {
      setLoginError('Invalid credentials. Use admin / admin for the Admin dashboard, or register a customer account.')
    }
  }

  // Handle Register submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    setRegisterError('')

    const usersList = JSON.parse(localStorage.getItem('preethi_users') || '[]')
    const emailExists = usersList.some(
      u => u.email.toLowerCase() === registerEmail.toLowerCase()
    )

    if (emailExists) {
      setRegisterError('Email is already registered. Try logging in.')
      return
    }

    const newCustomer = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      height: parseFloat(registerHeight) || 170,
      weight: parseFloat(registerWeight) || 70,
      role: 'customer'
    }

    const updatedUsers = [newCustomer, ...usersList]
    localStorage.setItem('preethi_users', JSON.stringify(updatedUsers))

    // Automatically initialize first health tracker log for the customer
    const initialBmi = parseFloat((newCustomer.weight / ((newCustomer.height / 100) * (newCustomer.height / 100))).toFixed(1))
    const initialLog = [{
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      weight: newCustomer.weight,
      steps: 5000,
      water: 2.0,
      bmi: initialBmi
    }]
    
    const allLogs = JSON.parse(localStorage.getItem('preethi_customer_logs') || '{}')
    allLogs[newCustomer.email] = initialLog
    localStorage.setItem('preethi_customer_logs', JSON.stringify(allLogs))

    // Set Session
    setUser(newCustomer)
    localStorage.setItem('preethi_user_session', JSON.stringify(newCustomer))
    setShowLoginModal(false)
    showAlert(`Registration successful! Welcome, ${registerName}!`)
    setCurrentPage('customer-dashboard')

    // Reset forms
    setRegisterName('')
    setRegisterEmail('')
    setRegisterPassword('')
    setRegisterHeight('')
    setRegisterWeight('')
  }

  // Handle Logout
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('preethi_user_session')
    setCurrentPage('home')
    showAlert('Logged out successfully.')
  }

  // Direct BMI save connector from Home/DietPlans page
  const handleSaveBMILink = (bmi, weight, height) => {
    if (!user || user.role !== 'customer') return
    
    const allLogs = JSON.parse(localStorage.getItem('preethi_customer_logs') || '{}')
    const userLogs = allLogs[user.email] || []

    const newLog = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      weight,
      steps: userLogs.length > 0 ? userLogs[0].steps : 8000,
      water: userLogs.length > 0 ? userLogs[0].water : 3.0,
      bmi
    }

    const updatedLogs = [newLog, ...userLogs]
    allLogs[user.email] = updatedLogs
    localStorage.setItem('preethi_customer_logs', JSON.stringify(allLogs))
    showAlert('BMI calculated and logged to your progress tracking history!')
  }

  return (
    <div className={darkMode ? 'dark-theme-wrapper' : 'light-theme-wrapper'} style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      transition: 'var(--transition)'
    }}>
      {/* Sticky Header Nav */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user} 
        onLogout={handleLogout}
        onOpenLoginModal={() => {
          setAuthTab('login')
          setShowLoginModal(true)
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Page Area */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <Home 
            setCurrentPage={setCurrentPage} 
            user={user} 
            onSaveBMI={handleSaveBMILink} 
          />
        )}
        {currentPage === 'about' && (
          <AboutUs setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'services' && (
          <Services setCurrentPage={setCurrentPage} user={user} />
        )}
        {currentPage === 'diet-plans' && (
          <DietPlans 
            setCurrentPage={setCurrentPage} 
            user={user} 
            onOpenLoginModal={() => {
              setAuthTab('login')
              setShowLoginModal(true)
            }} 
          />
        )}
        {currentPage === 'zumba' && (
          <ZumbaClasses setCurrentPage={setCurrentPage} user={user} />
        )}
        {currentPage === 'success-stories' && (
          <SuccessStories />
        )}
        {currentPage === 'blog' && (
          <Blog />
        )}
        {currentPage === 'contact' && (
          <Contact />
        )}
        {currentPage === 'customer-dashboard' && user && user.role === 'customer' && (
          <CustomerDashboard user={user} setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'admin-dashboard' && user && user.role === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Toast Alert popup */}
      {alertMsg && (
        <div className={`alert-popup alert-${alertType}`}>
          <span>{alertMsg}</span>
        </div>
      )}

      {/* Login & Register Modal Dialog */}
      {showLoginModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: '100%',
            maxWidth: '450px',
            padding: '30px',
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            background: darkMode ? 'var(--bg-dark-card)' : 'white'
          }}>
            {/* Close */}
            <button 
              onClick={() => setShowLoginModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>

            {/* Modal Switch Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', marginBottom: '24px' }}>
              <button
                onClick={() => setAuthTab('login')}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  fontSize: '1rem',
                  fontWeight: authTab === 'login' ? 700 : 500,
                  color: authTab === 'login' ? 'var(--primary)' : 'inherit',
                  border: 'none',
                  borderBottom: authTab === 'login' ? '2px solid var(--primary)' : 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer'
                }}
              >
                Log In
              </button>
              <button
                onClick={() => setAuthTab('register')}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  fontSize: '1rem',
                  fontWeight: authTab === 'register' ? 700 : 500,
                  color: authTab === 'register' ? 'var(--primary)' : 'inherit',
                  border: 'none',
                  borderBottom: authTab === 'register' ? '2px solid var(--primary)' : 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer'
                }}
              >
                Register
              </button>
            </div>

            {/* LOGIN FORM */}
            {authTab === 'login' && (
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '4px' }}>
                  Client/Admin Access
                </h3>

                {loginError && (
                  <div style={{ color: '#ef4444', fontSize: '0.8rem', backgroundColor: 'rgba(239,68,68,0.08)', padding: '10px', borderRadius: '4px' }}>
                    {loginError}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark-muted)' }} />
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. client@mail.com or 'admin'"
                      className="form-input"
                      style={{ paddingLeft: '44px' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark-muted)' }} />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="form-input"
                      style={{ paddingLeft: '44px' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', backgroundColor: 'var(--primary-glow)', padding: '10px', borderRadius: '4px', fontSize: '0.75rem' }}>
                  <Info size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--primary-dark)', fontWeight: 500 }}>
                    Tip: Use email <strong>admin</strong> and password <strong>admin</strong> to explore the Admin Dashboard.
                  </span>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                  Log In
                </button>
              </form>
            )}

            {/* REGISTER FORM */}
            {authTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '4px' }}>
                  Create Client Account
                </h3>

                {registerError && (
                  <div style={{ color: '#ef4444', fontSize: '0.8rem', backgroundColor: 'rgba(239,68,68,0.08)', padding: '10px', borderRadius: '4px' }}>
                    {registerError}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark-muted)' }} />
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="e.g. Aditi Sharma"
                      className="form-input"
                      style={{ paddingLeft: '44px' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark-muted)' }} />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="e.g. aditi@example.com"
                      className="form-input"
                      style={{ paddingLeft: '44px' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark-muted)' }} />
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="form-input"
                      style={{ paddingLeft: '44px' }}
                      required
                      minLength="4"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Height (cm)</label>
                    <div style={{ position: 'relative' }}>
                      <Scale size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark-muted)' }} />
                      <input
                        type="number"
                        value={registerHeight}
                        onChange={(e) => setRegisterHeight(e.target.value)}
                        placeholder="e.g. 165"
                        className="form-input"
                        style={{ paddingLeft: '36px' }}
                        required
                        min="50"
                        max="250"
                      />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Weight (kg)</label>
                    <div style={{ position: 'relative' }}>
                      <Scale size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dark-muted)' }} />
                      <input
                        type="number"
                        value={registerWeight}
                        onChange={(e) => setRegisterWeight(e.target.value)}
                        placeholder="e.g. 62"
                        className="form-input"
                        style={{ paddingLeft: '36px' }}
                        required
                        min="10"
                        max="300"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
