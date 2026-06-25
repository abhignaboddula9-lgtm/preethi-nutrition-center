import React, { useState } from 'react'

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50)

  const handleSliderChange = (e) => {
    setSliderPos(e.target.value)
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '550px',
      height: '350px',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      userSelect: 'none',
      margin: '0 auto'
    }}>
      {/* Before Layer (Background) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #475569, #1e293b)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '4px solid #475569',
          background: 'rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          filter: 'grayscale(1)',
          marginBottom: '16px'
        }}>
          😴
        </div>
        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '8px' }}>Before: Lethargic & Unhealthy Habits</h4>
        <p style={{ fontSize: '0.85rem', maxWidth: '300px' }}>
          Low energy levels, irregular sleep patterns, high BMI, and poor diet choices.
        </p>
        <span style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '4px 12px',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.8rem',
          fontWeight: 700
        }}>
          BEFORE
        </span>
      </div>

      {/* After Layer (Foreground, clipped) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0d9488, #115e59)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ccfbf1',
        padding: '20px',
        textAlign: 'center',
        clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '4px solid #14b8a6',
          background: 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3.5rem',
          marginBottom: '16px',
          boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)'
        }}>
          🏃‍♀️✨
        </div>
        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '8px' }}>After: Fit, Active & Radiantly Healthy!</h4>
        <p style={{ fontSize: '0.85rem', maxWidth: '300px' }}>
          Energetic mindset, balanced nutrition, normal BMI range, and glowing skin.
        </p>
        <span style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '4px 12px',
          background: 'var(--primary-light)',
          color: 'var(--bg-dark)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.8rem',
          fontWeight: 700
        }}>
          AFTER
        </span>
      </div>

      {/* Handle Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${sliderPos}%`,
        width: '4px',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        cursor: 'ew-resize',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        {/* Handle Button */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '3px solid var(--primary-light)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          fontWeight: 'bold',
          fontSize: '0.85rem'
        }}>
          ↔
        </div>
      </div>

      {/* Invisible HTML range input for dragging */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={handleSliderChange}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'ew-resize',
          zIndex: 20
        }}
      />
    </div>
  )
}
