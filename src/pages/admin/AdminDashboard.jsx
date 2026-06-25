import React, { useState, useEffect } from 'react'
import { Calendar, Users, FileText, PlusCircle, Check, X, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react'
import { DEFAULT_BLOGS } from '../Blog'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('appointments')
  const [appointments, setAppointments] = useState([])
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedUserLogs, setSelectedUserLogs] = useState([])
  
  // Blog Form State
  const [blogTitle, setBlogTitle] = useState('')
  const [blogCategory, setBlogCategory] = useState('Old-Age Nutrition')
  const [blogSummary, setBlogSummary] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const [blogSuccess, setBlogSuccess] = useState(false)

  // Tip Form State
  const [tipCategory, setTipCategory] = useState('Skin Care')
  const [tipTitle, setTipTitle] = useState('')
  const [tipContent, setTipContent] = useState('')
  const [tipSuccess, setTipSuccess] = useState(false)

  // Load Admin Data on mount
  useEffect(() => {
    // 1. Load Appointments
    const allApps = JSON.parse(localStorage.getItem('preethi_appointments') || '[]')
    setAppointments(allApps)

    // 2. Load Users
    const registeredUsers = JSON.parse(localStorage.getItem('preethi_users') || '[]')
    const customersOnly = registeredUsers.filter(u => u.role === 'customer')
    setUsers(customersOnly)
  }, [])

  // Action: Approve Appointment
  const handleApprove = (appId) => {
    const updated = appointments.map(app => {
      if (app.id === appId) {
        return { ...app, status: 'Approved' }
      }
      return app
    })
    setAppointments(updated)
    localStorage.setItem('preethi_appointments', JSON.stringify(updated))
  }

  // Action: Cancel Appointment
  const handleCancel = (appId) => {
    const updated = appointments.map(app => {
      if (app.id === appId) {
        return { ...app, status: 'Cancelled' }
      }
      return app
    })
    setAppointments(updated)
    localStorage.setItem('preethi_appointments', JSON.stringify(updated))
  }

  // Action: Select User for progress tracking inspection
  const handleInspectUser = (userEmail) => {
    const targetUser = users.find(u => u.email === userEmail)
    setSelectedUser(targetUser)

    const allLogs = JSON.parse(localStorage.getItem('preethi_customer_logs') || '{}')
    const userLogs = allLogs[userEmail] || []
    setSelectedUserLogs(userLogs)
  }

  // Action: Submit Blog Post
  const handleBlogSubmit = (e) => {
    e.preventDefault()
    if (!blogTitle || !blogSummary || !blogContent) return

    const newPost = {
      id: Date.now(),
      title: blogTitle,
      category: blogCategory,
      summary: blogSummary,
      content: blogContent,
      author: 'Preethi Raghavan (Admin)',
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.ceil(blogContent.split(' ').length / 150)} min read`
    }

    const customBlogs = JSON.parse(localStorage.getItem('preethi_custom_blogs') || '[]')
    const updatedBlogs = [newPost, ...customBlogs]
    localStorage.setItem('preethi_custom_blogs', JSON.stringify(updatedBlogs))

    setBlogSuccess(true)
    setBlogTitle('')
    setBlogSummary('')
    setBlogContent('')
    setTimeout(() => setBlogSuccess(false), 3000)
  }

  // Action: Submit Daily Tip
  const handleTipSubmit = (e) => {
    e.preventDefault()
    if (!tipTitle || !tipContent) return

    const newTip = {
      id: Date.now(),
      category: tipCategory,
      title: tipTitle,
      content: tipContent
    }

    const customTips = JSON.parse(localStorage.getItem('preethi_custom_tips') || '[]')
    const updatedTips = [newTip, ...customTips]
    localStorage.setItem('preethi_custom_tips', JSON.stringify(updatedTips))

    setTipSuccess(true)
    setTipTitle('')
    setTipContent('')
    setTimeout(() => setTipSuccess(false), 3000)
  }

  // Key metrics calculations
  const pendingCount = appointments.filter(app => app.status === 'Pending').length
  const approvedCount = appointments.filter(app => app.status === 'Approved').length
  const totalUsersCount = users.length

  const categories = ['Old-Age Nutrition', 'Skin Care', 'Children Nutrition', 'Exercise from Home', 'Women Nutrition', 'Male Nutrition']

  return (
    <div className="admin-dashboard section-padding animate-fade-in" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="container">
        
        {/* Banner */}
        <div className="glass-card" style={{
          padding: '30px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.08) 0%, rgba(20, 184, 166, 0.08) 100%)'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>
              🛠️ Administrator Panel
            </h1>
            <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.9rem', marginTop: '4px' }} className="muted-text-selector">
              Manage client appointments, publish articles, and inspect client weight loss progress.
            </p>
          </div>
          <div style={{
            backgroundColor: '#0d9488',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ShieldAlert size={16} />
            <span>Preethi Raghavan (Chief Admin)</span>
          </div>
        </div>

        {/* Admin stats counters */}
        <div className="grid-3" style={{ marginBottom: '40px' }}>
          <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#d97706', padding: '12px', borderRadius: '50%' }}>
              <Calendar size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Pending Bookings</span>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{pendingCount}</h4>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px', borderRadius: '50%' }}>
              <Calendar size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Approved Consultations</span>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{approvedCount}</h4>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: 'var(--primary-glow)', color: 'var(--primary-light)', padding: '12px', borderRadius: '50%' }}>
              <Users size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Registered Clients</span>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{totalUsersCount}</h4>
            </div>
          </div>
        </div>

        {/* Layout Tabs */}
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }} className="admin-grid-layout">
          
          {/* Navigation Sidebar */}
          <div className="glass-card flex-sidebar" style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '240px',
            flexShrink: 0
          }}>
            <button
              onClick={() => setActiveTab('appointments')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'appointments' ? '#0d9488' : 'transparent',
                color: activeTab === 'appointments' ? 'white' : 'inherit',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                textAlign: 'left',
                transition: 'var(--transition)'
              }}
            >
              <Calendar size={18} />
              <span>Appointments</span>
            </button>

            <button
              onClick={() => setActiveTab('blog-tips')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'blog-tips' ? '#0d9488' : 'transparent',
                color: activeTab === 'blog-tips' ? 'white' : 'inherit',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                textAlign: 'left',
                transition: 'var(--transition)'
              }}
            >
              <FileText size={18} />
              <span>Publish Blog & Tips</span>
            </button>

            <button
              onClick={() => setActiveTab('client-tracking')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'client-tracking' ? '#0d9488' : 'transparent',
                color: activeTab === 'client-tracking' ? 'white' : 'inherit',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                textAlign: 'left',
                transition: 'var(--transition)'
              }}
            >
              <Users size={18} />
              <span>Client Progress Tracker</span>
            </button>
          </div>

          {/* Panel workspace */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            
            {/* Appointments panel */}
            {activeTab === 'appointments' && (
              <div className="glass-card animate-fade-in" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '20px' }}>
                  Manage Bookings
                </h3>

                {appointments.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'var(--text-dark-muted)', padding: '20px 0' }} className="muted-text-selector">
                    No bookings logged in the system.
                  </p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--border-light)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                          <th style={{ padding: '12px 16px', fontWeight: 700 }}>Client Name</th>
                          <th style={{ padding: '12px 16px', fontWeight: 700 }}>Program</th>
                          <th style={{ padding: '12px 16px', fontWeight: 700 }}>Date</th>
                          <th style={{ padding: '12px 16px', fontWeight: 700 }}>Time</th>
                          <th style={{ padding: '12px 16px', fontWeight: 700 }}>Status</th>
                          <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((app) => (
                          <tr key={app.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ fontWeight: 600 }}>{app.customerName}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                                {app.customerEmail}
                              </div>
                            </td>
                            <td style={{ padding: '12px 16px' }}>{app.service}</td>
                            <td style={{ padding: '12px 16px' }}>{app.date}</td>
                            <td style={{ padding: '12px 16px' }}>{app.time}</td>
                            <td style={{ padding: '12px 16px' }}>
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
                            <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                              {app.status === 'Pending' && (
                                <div style={{ display: 'inline-flex', gap: '8px' }}>
                                  <button
                                    onClick={() => handleApprove(app.id)}
                                    style={{
                                      backgroundColor: '#10b981',
                                      color: 'white',
                                      border: 'none',
                                      padding: '6px',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      display: 'flex'
                                    }}
                                    title="Approve booking"
                                  >
                                    <Check size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleCancel(app.id)}
                                    style={{
                                      backgroundColor: '#ef4444',
                                      color: 'white',
                                      border: 'none',
                                      padding: '6px',
                                      borderRadius: '4px',
                                      cursor: 'pointer',
                                      display: 'flex'
                                    }}
                                    title="Cancel booking"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Publish Blog & Tips panel */}
            {activeTab === 'blog-tips' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} className="animate-fade-in">
                
                {/* Blog Publisher */}
                <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <PlusCircle size={20} style={{ color: 'var(--primary)' }} />
                    <span>Publish Nutrition Blog Post</span>
                  </h3>

                  {blogSuccess && (
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.85rem', fontWeight: 600 }}>
                      Blog post published successfully! It is now live on the public Blog section.
                    </div>
                  )}

                  <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="grid-2">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Blog Title</label>
                        <input
                          type="text"
                          value={blogTitle}
                          onChange={(e) => setBlogTitle(e.target.value)}
                          placeholder="e.g. 5 Benefits of Hydration"
                          className="form-input"
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Category</label>
                        <select
                          value={blogCategory}
                          onChange={(e) => setBlogCategory(e.target.value)}
                          className="form-input"
                          style={{ cursor: 'pointer' }}
                        >
                          {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Short Summary</label>
                      <input
                        type="text"
                        value={blogSummary}
                        onChange={(e) => setBlogSummary(e.target.value)}
                        placeholder="Brief 1-line description displayed on the blog list page..."
                        className="form-input"
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Full Article Content</label>
                      <textarea
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="Write your article details here..."
                        className="form-input"
                        style={{ minHeight: '150px', resize: 'vertical' }}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Publish Article
                    </button>
                  </form>
                </div>

                {/* Daily Tip Publisher */}
                <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={20} style={{ color: 'var(--secondary)' }} />
                    <span>Publish Daily Health Tip</span>
                  </h3>

                  {tipSuccess && (
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.85rem', fontWeight: 600 }}>
                      Daily tip updated successfully!
                    </div>
                  )}

                  <form onSubmit={handleTipSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="grid-2">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Topic Category</label>
                        <select
                          value={tipCategory}
                          onChange={(e) => setTipCategory(e.target.value)}
                          className="form-input"
                          style={{ cursor: 'pointer' }}
                        >
                          <option value="Skin Care">Skin Care</option>
                          <option value="Weight Loss from Home">Weight Loss from Home</option>
                          <option value="Children Nutrition">Children Nutrition</option>
                          <option value="Exercise from Home">Exercise from Home</option>
                          <option value="Old-Age Nutrition">Old-Age Nutrition</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Tip Title</label>
                        <input
                          type="text"
                          value={tipTitle}
                          onChange={(e) => setTipTitle(e.target.value)}
                          placeholder="e.g. Eat vitamin C for skin collagen"
                          className="form-input"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Tip Instruction (Short & Punchy)</label>
                      <textarea
                        value={tipContent}
                        onChange={(e) => setTipContent(e.target.value)}
                        placeholder="Write a short 1-2 sentence tip description..."
                        className="form-input"
                        style={{ minHeight: '80px', resize: 'vertical' }}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
                      Publish Daily Tip
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* Client progress tracking panel */}
            {activeTab === 'client-tracking' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} className="animate-fade-in">
                
                {/* User List Panel */}
                <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '20px' }}>
                    Select Client Profile
                  </h3>

                  {users.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-dark-muted)', padding: '20px 0' }} className="muted-text-selector">
                      No customer profiles registered in local database.
                    </p>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                      {users.map((u) => (
                        <div 
                          key={u.email}
                          onClick={() => handleInspectUser(u.email)}
                          style={{
                            padding: '16px',
                            borderRadius: 'var(--radius-sm)',
                            border: selectedUser && selectedUser.email === u.email ? '2px solid #0d9488' : '1px solid var(--border-light)',
                            backgroundColor: selectedUser && selectedUser.email === u.email ? 'rgba(13, 148, 136, 0.05)' : 'rgba(255, 255, 255, 0.3)',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                          }}
                        >
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{u.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                            {u.email}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Inspected client details and log history chart */}
                {selectedUser && (
                  <div className="glass-card animate-fade-in" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Inspecting progress profile</span>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#0d9488' }}>{selectedUser.name}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Email: {selectedUser.email}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Weight Deficit Target</span>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>Active Weight Loss Program</div>
                      </div>
                    </div>

                    {selectedUserLogs.length === 0 ? (
                      <p style={{ textAlign: 'center', color: 'var(--text-dark-muted)', padding: '20px 0' }} className="muted-text-selector">
                        No health measurements logged by this client yet.
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {/* CSS Progress Trend */}
                        <div>
                          <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <TrendingUp size={18} style={{ color: '#0d9488' }} />
                            <span>Client Weight Trend</span>
                          </h4>
                          
                          <div style={{ 
                            height: '140px', 
                            display: 'flex', 
                            alignItems: 'flex-end', 
                            justifyContent: 'space-between',
                            gap: '12px',
                            borderBottom: '2px solid var(--border-light)',
                            paddingBottom: '8px',
                            maxWidth: '500px'
                          }}>
                            {selectedUserLogs.slice(-7).map((log, idx) => {
                              const weights = selectedUserLogs.map(l => l.weight)
                              const maxW = Math.max(...weights) * 1.1
                              const minW = Math.min(...weights) * 0.9
                              const percentage = ((log.weight - minW) / (maxW - minW)) * 80 + 20
                              
                              return (
                                <div key={idx} style={{ 
                                  flex: 1, 
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  alignItems: 'center',
                                  gap: '8px'
                                }}>
                                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0d9488' }}>{log.weight}</span>
                                  <div style={{
                                    width: '100%',
                                    height: `${percentage}px`,
                                    background: 'linear-gradient(to top, #0d9488, #2dd4bf)',
                                    borderRadius: '4px 4px 0 0',
                                    boxShadow: '0 4px 10px rgba(13, 148, 136, 0.15)'
                                  }} />
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                                    {log.date.substring(5)}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Raw Logs History */}
                        <div>
                          <h4 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>Checkup Logs Database</h4>
                          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                            <thead>
                              <tr style={{ borderBottom: '2px solid var(--border-light)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Date</th>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Weight</th>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>BMI</th>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Daily Steps</th>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Water Intake</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedUserLogs.map((log) => (
                                <tr key={log.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{log.date}</td>
                                  <td style={{ padding: '10px 12px' }}>{log.weight} kg</td>
                                  <td style={{ padding: '10px 12px' }}>{log.bmi}</td>
                                  <td style={{ padding: '10px 12px' }}>{log.steps.toLocaleString()}</td>
                                  <td style={{ padding: '10px 12px' }}>{log.water} L</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .admin-grid-layout { flex-direction: column !important; }
          .flex-sidebar { width: 100% !important; flex-direction: row !important; overflow-x: auto; }
        }
        .dark-mode .muted-text-selector {
          color: var(--text-light-muted) !important;
        }
      `}} />
    </div>
  )
}
export { DEFAULT_BLOGS }
