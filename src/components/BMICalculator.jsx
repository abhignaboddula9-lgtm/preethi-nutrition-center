import React, { useState } from 'react'
import { Calculator, Save, AlertCircle } from 'lucide-react'

export default function BMICalculator({ user, onSaveBMI }) {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [saved, setSaved] = useState(false)

  const calculateBMI = (e) => {
    e.preventDefault()
    if (!weight || !height) return

    const heightInMeters = parseFloat(height) / 100
    const calculatedBmi = parseFloat((parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(1))
    setBmi(calculatedBmi)
    setSaved(false)

    if (calculatedBmi < 18.5) {
      setCategory('Underweight')
      setColor('#3b82f6') // Blue
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setCategory('Normal Weight')
      setColor('#10b981') // Green
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setCategory('Overweight')
      setColor('#f59e0b') // Amber
    } else {
      setCategory('Obese')
      setColor('#ef4444') // Red
    }
  }

  const handleSave = () => {
    if (onSaveBMI && bmi) {
      onSaveBMI(bmi, parseFloat(weight), parseFloat(height))
      setSaved(true)
    }
  }

  const getMarkerPercentage = () => {
    if (!bmi) return 0
    // Range: 15 to 35
    const minBmi = 15
    const maxBmi = 35
    const percentage = ((bmi - minBmi) / (maxBmi - minBmi)) * 100
    return Math.min(Math.max(percentage, 0), 100)
  }

  return (
    <div className="glass-card" style={{
      padding: '30px',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-body)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{
          backgroundColor: 'var(--primary-glow)',
          color: 'var(--primary-light)',
          padding: '10px',
          borderRadius: '50%'
        }}>
          <Calculator size={24} />
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>Interactive BMI Calculator</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
            Know your Body Mass Index in seconds.
          </p>
        </div>
      </div>

      <form onSubmit={calculateBMI} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70"
              className="form-input"
              required
              min="10"
              max="300"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 170"
              className="form-input"
              required
              min="50"
              max="250"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Calculate BMI
        </button>
      </form>

      {bmi !== null && (
        <div className="animate-fade-in" style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px dashed var(--border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Your BMI</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                {bmi}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">Classification</span>
              <div style={{ 
                fontSize: '1.1rem', 
                fontWeight: 700, 
                color: color,
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: `${color}15`,
                marginTop: '4px'
              }}>
                {category}
              </div>
            </div>
          </div>

          {/* Visual BMI Gauge slider */}
          <div style={{ position: 'relative', height: '10px', borderRadius: '999px', background: 'linear-gradient(to right, #3b82f6 0%, #3b82f6 25%, #10b981 25%, #10b981 60%, #f59e0b 60%, #f59e0b 80%, #ef4444 80%, #ef4444 100%)', marginBottom: '30px', marginTop: '20px' }}>
            {/* Pointer Pin */}
            <div style={{
              position: 'absolute',
              left: `${getMarkerPercentage()}%`,
              top: '-6px',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: `4px solid ${color}`,
              boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
              transform: 'translateX(-50%)',
              transition: 'left 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dark-muted)', marginTop: '-20px', marginBottom: '20px' }} className="muted-text-selector">
            <span>15.0</span>
            <span>18.5</span>
            <span>25.0</span>
            <span>30.0</span>
            <span>35.0+</span>
          </div>

          {/* Save to log capability if logged in as customer */}
          {user && user.role === 'customer' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {saved ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
                  Saved successfully to health tracker!
                </span>
              ) : (
                <button 
                  onClick={handleSave} 
                  className="btn btn-outline" 
                  style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', gap: '6px' }}
                >
                  <Save size={14} />
                  Save to Health Tracker
                </button>
              )}
            </div>
          )}

          {!user && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '8px', 
              backgroundColor: 'rgba(249, 115, 22, 0.08)', 
              padding: '12px', 
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem'
            }}>
              <AlertCircle size={16} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ color: 'var(--secondary)' }}>
                <strong>Note:</strong> Log in to save your BMI reading to your Health Checkup Tracker and monitor your progress over time!
              </span>
            </div>
          )}
        </div>
      )}

      {/* Styled components selector override for dark mode text */}
      <style dangerouslySetInnerHTML={{__html: `
        .dark-mode .muted-text-selector {
          color: var(--text-light-muted) !important;
        }
      `}} />
    </div>
  )
}
