import React, { useState } from 'react'
import { Plus, Trash2, TrendingUp, Award, Droplet, Flame, Scale } from 'lucide-react'

export default function HealthTracker({ user, logs, onAddLog, onDeleteLog }) {
  const [weight, setWeight] = useState('')
  const [steps, setSteps] = useState('')
  const [water, setWater] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!weight || !steps || !water) return
    onAddLog(parseFloat(weight), parseInt(steps), parseFloat(water))
    setWeight('')
    setSteps('')
    setWater('')
  }

  // Calculate averages for statistics cards
  const avgWeight = logs.length > 0 
    ? (logs.reduce((acc, curr) => acc + curr.weight, 0) / logs.length).toFixed(1) 
    : '0.0'
  const avgSteps = logs.length > 0 
    ? Math.round(logs.reduce((acc, curr) => acc + curr.steps, 0) / logs.length) 
    : 0
  const avgWater = logs.length > 0 
    ? (logs.reduce((acc, curr) => acc + curr.water, 0) / logs.length).toFixed(1) 
    : '0.0'

  // Get max values for graph normalization
  const maxWeight = logs.length > 0 ? Math.max(...logs.map(l => l.weight)) * 1.1 : 100
  const minWeight = logs.length > 0 ? Math.min(...logs.map(l => l.weight)) * 0.9 : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', fontFamily: 'var(--font-body)' }} className="animate-fade-in">
      
      {/* Tracker stats banner */}
      <div className="grid-3">
        <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: 'var(--primary-light)', padding: '12px', borderRadius: '50%' }}>
            <Scale size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Average Weight</span>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{avgWeight} kg</h4>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', color: 'var(--secondary)', padding: '12px', borderRadius: '50%' }}>
            <Flame size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Average Steps</span>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{avgSteps.toLocaleString()}</h4>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '12px', borderRadius: '50%' }}>
            <Droplet size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Average Hydration</span>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{avgWater} L</h4>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'flex-start' }}>
        
        {/* Log Form Panel */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '16px' }}>Log Daily Measurements</h3>
          
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Current Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 68.5"
                className="form-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Daily Steps Count</label>
              <input
                type="number"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="e.g. 8500"
                className="form-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Water Intake (Liters)</label>
              <input
                type="number"
                step="0.25"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                placeholder="e.g. 3.0"
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Plus size={16} />
              <span>Save Today's Log</span>
            </button>
          </form>
        </div>

        {/* Visual Chart Panel */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-md)', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={20} style={{ color: 'var(--primary)' }} />
            <span>Weight Progress Trend</span>
          </h3>

          {logs.length < 2 ? (
            <div style={{ textAlign: 'center', margin: 'auto', padding: '40px 0', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
              <Award size={40} style={{ opacity: 0.5, marginBottom: '10px' }} />
              <p style={{ fontSize: '0.9rem' }}>Log your measurements for at least 2 days to render your progress chart.</p>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
              {/* Graphic Plot using custom CSS bars */}
              <div style={{ 
                height: '180px', 
                display: 'flex', 
                alignItems: 'flex-end', 
                justifyContent: 'space-between',
                gap: '12px',
                borderBottom: '2px solid var(--border-light)',
                paddingBottom: '8px',
                position: 'relative'
              }}>
                {logs.slice(-7).map((log, idx) => {
                  const percentage = ((log.weight - minWeight) / (maxWeight - minWeight)) * 80 + 20
                  return (
                    <div key={idx} style={{ 
                      flex: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{log.weight}</span>
                      <div style={{
                        width: '100%',
                        height: `${percentage}px`,
                        background: 'linear-gradient(to top, var(--primary), var(--primary-light))',
                        borderRadius: '4px 4px 0 0',
                        boxShadow: '0 4px 10px var(--primary-glow)',
                        transition: 'height 0.5s ease'
                      }} />
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                        {log.date.substring(5)}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                <span>Min: {minWeight.toFixed(1)} kg</span>
                <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Showing last 7 readings</span>
                <span>Max: {maxWeight.toFixed(1)} kg</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Log History list */}
      <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '20px' }}>Log History</h3>

        {logs.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-dark-muted)', padding: '20px 0' }} className="muted-text-selector">
            No entries logged yet. Complete the form above to add your first day checkup!
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Date</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Weight</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>BMI</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Steps Walked</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Water Intake</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{log.date}</td>
                    <td style={{ padding: '12px 16px' }}>{log.weight} kg</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: log.bmi < 18.5 || log.bmi >= 25 ? 'rgba(249, 115, 22, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: log.bmi < 18.5 || log.bmi >= 25 ? 'var(--secondary)' : '#10b981'
                      }}>
                        {log.bmi}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>{log.steps.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px' }}>{log.water} L</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => onDeleteLog(log.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '4px',
                          borderRadius: '4px'
                        }}
                        title="Delete log"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .dark-mode .muted-text-selector {
          color: var(--text-light-muted) !important;
        }
      `}} />
    </div>
  )
}
