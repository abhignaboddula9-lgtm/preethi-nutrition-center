import React, { useState, useEffect } from 'react'
import { Sparkles, ChevronLeft, ChevronRight, Apple, Activity, Sun, Moon } from 'lucide-react'

export default function DailyTipsWidget() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  const tips = [
    {
      category: 'Skin Care',
      icon: <Sun size={18} />,
      title: 'Hydration is Key for Skin Radiance',
      content: 'Drinking 3 liters of water daily helps flush out toxins, keeping your skin naturally hydrated and glowing. Pair it with water-rich fruits like watermelon or cucumbers.'
    },
    {
      category: 'Weight Loss from Home',
      icon: <Activity size={18} />,
      title: 'Active NEAT (Non-Exercise Activity Thermogenesis)',
      content: 'Boost your metabolism by standing up every hour, pacing during calls, or doing 10 air squats. These small movements add up to burn significant calories daily.'
    },
    {
      category: 'Children Nutrition',
      icon: <Apple size={18} />,
      title: 'Sneaking Veggies into Fun Foods',
      content: 'Puree spinach, carrots, and zucchini to mix into tomato pasta sauce or pancake batters. Your children get the essential micronutrients without the mealtime struggle!'
    },
    {
      category: 'Exercise from Home',
      icon: <Activity size={18} />,
      title: 'The Power of 15-Minute HIIT',
      content: 'Short on time? A 15-minute high-intensity interval circuit (Jumping Jacks, Squats, Pushups, Plank) burns calories, raises heart rate, and requires zero equipment.'
    },
    {
      category: 'Old-Age Nutrition',
      icon: <Sparkles size={18} />,
      title: 'Focus on Calcium & Vitamin D',
      content: 'As bones age, they lose density. Combine low-fat dairy, ragi, or fortified plant milks with 15 minutes of early morning sun exposure for optimal bone health.'
    },
    {
      category: 'Women Nutrition',
      icon: <Sparkles size={18} />,
      title: 'Iron-Rich Diet During Cycles',
      content: 'Prevent fatigue by consuming iron-rich foods like spinach, beetroot, pomegranate, and lentils. Always pair them with Vitamin C (like lemon juice) for better absorption.'
    }
  ]

  // Automatically cycle tips every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [tips.length])

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + tips.length) % tips.length)
  }

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length)
  }

  const currentTip = tips[currentTipIndex]

  return (
    <div className="glass-card" style={{
      padding: '24px',
      borderRadius: 'var(--radius-md)',
      position: 'relative',
      overflow: 'hidden',
      borderLeft: '4px solid var(--primary-light)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-body)'
    }}>
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {currentTip.icon}
            <span>{currentTip.category}</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'var(--primary-glow)',
            color: 'var(--primary)',
            padding: '4px 8px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            <Sparkles size={12} />
            <span>Daily Health Tip</span>
          </div>
        </div>

        <h4 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.15rem',
          marginBottom: '10px',
          lineHeight: '1.3'
        }}>
          {currentTip.title}
        </h4>
        <p style={{
          fontSize: '0.9rem',
          lineHeight: '1.5',
          color: 'var(--text-dark-muted)'
        }} className="muted-text-selector">
          {currentTip.content}
        </p>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        paddingTop: '12px',
        borderTop: '1px solid var(--border-light)'
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {tips.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentTipIndex(idx)}
              style={{
                width: idx === currentTipIndex ? '16px' : '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: idx === currentTipIndex ? 'var(--primary)' : 'rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={prevTip}
            style={{
              background: 'none',
              border: '1px solid var(--border-light)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'inherit'
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextTip}
            style={{
              background: 'none',
              border: '1px solid var(--border-light)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'inherit'
            }}
          >
            <ChevronRight size={16} />
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
