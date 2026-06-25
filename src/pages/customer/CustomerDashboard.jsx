import React, { useState, useEffect } from 'react'
import { LayoutDashboard, Activity, Calendar, Download, User, Flame, Droplet, Scale, ShieldAlert } from 'lucide-react'
import HealthTracker from './HealthTracker'
import AppointmentScheduler from './AppointmentScheduler'

export default function CustomerDashboard({ user, setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [logs, setLogs] = useState([])
  const [appointments, setAppointments] = useState([])

  // Load patient specific measurements and bookings on mount
  useEffect(() => {
    if (user) {
      const allLogs = JSON.parse(localStorage.getItem('preethi_customer_logs') || '{}')
      const userLogs = allLogs[user.email] || [
        { id: 1, date: '2026-06-12', weight: 72.4, steps: 8200, water: 2.5, bmi: 25.1 },
        { id: 2, date: '2026-06-13', weight: 72.1, steps: 10400, water: 3.0, bmi: 25.0 },
        { id: 3, date: '2026-06-14', weight: 71.8, steps: 9000, water: 2.75, bmi: 24.9 }
      ]
      setLogs(userLogs)

      const allAppointments = JSON.parse(localStorage.getItem('preethi_appointments') || '[]')
      const userAppointments = allAppointments.filter(app => app.customerEmail === user.email)
      setAppointments(userAppointments)
    }
  }, [user])

  const handleAddLog = (weight, steps, water) => {
    // Calculate BMI using height (default 170cm if not available, or user height)
    const height = user.height || 170
    const heightInMeters = height / 100
    const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1))

    const newLog = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      weight,
      steps,
      water,
      bmi
    }

    const updatedLogs = [newLog, ...logs]
    setLogs(updatedLogs)

    // Save to localStorage
    const allLogs = JSON.parse(localStorage.getItem('preethi_customer_logs') || '{}')
    allLogs[user.email] = updatedLogs
    localStorage.setItem('preethi_customer_logs', JSON.stringify(allLogs))
  }

  const handleDeleteLog = (logId) => {
    const updatedLogs = logs.filter(log => log.id !== logId)
    setLogs(updatedLogs)

    const allLogs = JSON.parse(localStorage.getItem('preethi_customer_logs') || '{}')
    allLogs[user.email] = updatedLogs
    localStorage.setItem('preethi_customer_logs', JSON.stringify(allLogs))
  }

  const handleAddAppointment = (newApp) => {
    const allAppointments = JSON.parse(localStorage.getItem('preethi_appointments') || '[]')
    const createdApp = {
      id: Date.now(),
      ...newApp
    }
    const updatedGlobal = [createdApp, ...allAppointments]
    localStorage.setItem('preethi_appointments', JSON.stringify(updatedGlobal))

    setAppointments([createdApp, ...appointments])
  }

  // Helper stats
  const latestWeight = logs.length > 0 ? logs[0].weight : '--'
  const latestSteps = logs.length > 0 ? logs[0].steps.toLocaleString() : '--'
  const latestWater = logs.length > 0 ? logs[0].water : '--'

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'tracker', label: 'Health Tracker', icon: <Activity size={18} /> },
    { id: 'scheduler', label: 'Book Appointment', icon: <Calendar size={18} /> },
    { id: 'downloads', label: 'Downloads', icon: <Download size={18} /> }
  ]

  const sampleDietPlans = [
    { title: 'Women\'s Hormonal Balance Diet', cat: 'Women Nutrition' },
    { title: 'Men\'s Shred & Strength Plan', cat: 'Male Nutrition' },
    { title: 'Skin Glow & Collagen Diet', cat: 'Skin Health & Care' },
    { title: 'Weight Loss From Home Guide', cat: 'Weight Loss & Exercise' }
  ]

  const handleSampleDownload = (title) => {
    // Directly download plan
    const element = document.createElement("a");
    const file = new Blob([
      `PREETHI NUTRITION CENTER\n=======================\n\nDIET PLAN: ${title.toUpperCase()}\n\nDisclaimer: This is a sample diet structure. Please schedule a 1-on-1 consultation for personalized calorie adjustment.\n\nRECOMMENDED GENERAL GUIDELINE:\n1. Drink 3-4 liters of water daily.\n2. Include 2 portions of colored vegetables in lunch and dinner.\n3. Take 15 minutes of direct morning sunlight for Vitamin D.\n4. Avoid refined flour and processed vegetable oils.\n\nThank you for choosing Preethi Nutrition Center!`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_guide.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="customer-dashboard section-padding animate-fade-in">
      <div className="container">
        
        {/* Welcome Banner */}
        <div className="glass-card" style={{
          padding: '30px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%)'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>
              Welcome back, {user.name}!
            </h1>
            <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.9rem', marginTop: '4px' }} className="muted-text-selector">
              Track progress, consult Preethi, or access dietary plans.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Active Program</span>
              <div style={{ color: 'var(--primary)', fontWeight: 700 }}>Weight Loss Program</div>
            </div>
            <div style={{ 
              backgroundColor: 'var(--primary-glow)', 
              color: 'var(--primary)', 
              padding: '10px', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={24} />
            </div>
          </div>
        </div>

        {/* Workspace Layout */}
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }} className="dashboard-grid">
          
          {/* Side Tabs */}
          <div className="glass-card flex-sidebar" style={{ 
            padding: '16px', 
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '240px',
            flexShrink: 0
          }}>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: activeTab === item.id ? 'var(--primary)' : 'transparent',
                  color: activeTab === item.id ? 'white' : 'inherit',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  transition: 'var(--transition)'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Core Panel Content */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} className="animate-fade-in">
                {/* Visual Stats Widgets */}
                <div className="grid-3">
                  <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ backgroundColor: 'var(--primary-glow)', color: 'var(--primary-light)', padding: '10px', borderRadius: '50%' }}>
                      <Scale size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Latest Weight</span>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{latestWeight} {latestWeight !== '--' ? 'kg' : ''}</h4>
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ backgroundColor: 'var(--secondary-glow)', color: 'var(--secondary)', padding: '10px', borderRadius: '50%' }}>
                      <Flame size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Today's Steps</span>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{latestSteps}</h4>
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '10px', borderRadius: '50%' }}>
                      <Droplet size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Hydration Log</span>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{latestWater} {latestWater !== '--' ? 'L' : ''}</h4>
                    </div>
                  </div>
                </div>

                {/* Appointment Status Overview */}
                <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '20px' }}>Your Appointments</h3>

                  {appointments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                      <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>No consultations booked yet.</p>
                      <button onClick={() => setActiveTab('scheduler')} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                        Schedule Your First Session
                      </button>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border-light)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                            <th style={{ padding: '12px 16px', fontWeight: 700 }}>Service</th>
                            <th style={{ padding: '12px 16px', fontWeight: 700 }}>Date</th>
                            <th style={{ padding: '12px 16px', fontWeight: 700 }}>Time</th>
                            <th style={{ padding: '12px 16px', fontWeight: 700 }}>Specialist</th>
                            <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((app) => (
                            <tr key={app.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                              <td style={{ padding: '12px 16px', fontWeight: 600 }}>{app.service}</td>
                              <td style={{ padding: '12px 16px' }}>{app.date}</td>
                              <td style={{ padding: '12px 16px' }}>{app.time}</td>
                              <td style={{ padding: '12px 16px' }}>{app.consultant}</td>
                              <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                                <span style={{
                                  padding: '4px 10px',
                                  borderRadius: '999px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  backgroundColor: app.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : (app.status === 'Cancelled' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'),
                                  color: app.status === 'Approved' ? '#10b981' : (app.status === 'Cancelled' ? '#ef4444' : '#d97706')
                                }}>
                                  {app.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Health Tracker Tab */}
            {activeTab === 'tracker' && (
              <HealthTracker 
                user={user} 
                logs={logs} 
                onAddLog={handleAddLog} 
                onDeleteLog={handleDeleteLog} 
              />
            )}

            {/* Scheduler Tab */}
            {activeTab === 'scheduler' && (
              <AppointmentScheduler 
                user={user} 
                onAddAppointment={handleAddAppointment} 
              />
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <div className="glass-card animate-fade-in" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '20px' }}>Your Diet PDF Downloads</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-dark-muted)', marginBottom: '24px' }} className="muted-text-selector">
                  Fast access center. Select a diet guide matching your active targets below to generate a text copy configuration.
                </p>

                <div className="grid-2">
                  {sampleDietPlans.map((plan, idx) => (
                    <div 
                      key={idx}
                      style={{
                        padding: '20px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--primary-light)' }}>{plan.cat}</span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px' }}>{plan.title}</h4>
                      </div>
                      <button
                        onClick={() => handleSampleDownload(plan.title)}
                        className="btn btn-outline"
                        style={{ padding: '6px 12px', fontSize: '0.75rem', width: 'max-content', display: 'flex', gap: '6px' }}
                      >
                        <Download size={12} />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .dashboard-grid { flex-direction: column !important; }
          .flex-sidebar { width: 100% !important; flex-direction: row !important; overflow-x: auto; }
        }
        .dark-mode .muted-text-selector {
          color: var(--text-light-muted) !important;
        }
      `}} />
    </div>
  )
}
