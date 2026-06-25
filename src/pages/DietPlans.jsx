import React from 'react'
import { Download, Lock, Check, Sparkles, Smile, ShieldAlert } from 'lucide-react'

export default function DietPlans({ setCurrentPage, user, onOpenLoginModal }) {
  const plans = [
    {
      id: 'women-nutr',
      title: 'Women\'s Hormonal Balance Diet',
      category: 'Women Nutrition',
      desc: 'Specifically designed to manage PCOS, thyroid fluctuations, and iron deficiencies. Emphasizes cruciferous greens, seed cycling routines, and low-glycemic complexes.',
      benefits: ['Balances estrogen levels', 'Improves daily energy', 'Supports cycle regularity']
    },
    {
      id: 'men-fit',
      title: 'Men\'s Shred & Strength Plan',
      category: 'Male Nutrition',
      desc: 'Optimized macronutrient ratios for high stamina and lean muscle development. Promotes clean proteins, essential minerals, and high-electrolyte snacks.',
      benefits: ['Supports muscle synthesis', 'Accelerates recovery rates', 'Enhances vascular stamina']
    },
    {
      id: 'skin-health',
      title: 'Skin Glow & Collagen Diet',
      category: 'Skin Health & Care',
      desc: 'Rich in vitamin C, omega-3, and antioxidants to naturally boost collagen, reduce eczema flare-ups, and clear acne by healing the gut lining.',
      benefits: ['Reduces systemic inflammation', 'Promotes gut-skin axis health', 'Boosts natural skin radiance']
    },
    {
      id: 'kids-growth',
      title: 'Children\'s Growth & Focus Diet',
      category: 'Children Nutrition',
      desc: 'Combats picky eating by packing micronutrients into delicious kid-friendly meals. Focuses on healthy fats (DHA), calcium, and magnesium for brain growth.',
      benefits: ['Supports cognitive focus', 'Strengthens bone density', 'No artificial sugars or dyes']
    },
    {
      id: 'old-age',
      title: 'Active Senior Bone & Joint Diet',
      category: 'Old-Age Nutrition',
      desc: 'Easily digestible, fiber-rich diets designed to combat bone density loss, slow digestion, and cholesterol spikes. High in calcium and anti-inflammatory spices.',
      benefits: ['Relieves joint stiffness', 'Optimizes digestive motility', 'Controls blood glucose spikes']
    },
    {
      id: 'home-weight',
      title: 'Weight Loss From Home Guide',
      category: 'Weight Loss & Exercise',
      desc: 'A complete calorie-deficit program tailored for homemakers and remote workers. Emphasizes simple portion control tricks and 15-minute home workout meals.',
      benefits: ['Easy pantry-friendly meals', 'No expensive superfoods', 'High satiety recipes']
    }
  ]

  const handleDownload = (planTitle) => {
    if (!user) {
      onOpenLoginModal()
      return
    }
    
    // Simulate a PDF download
    const element = document.createElement("a");
    const file = new Blob([
      `PREETHI NUTRITION CENTER\n=======================\n\nDIET PLAN: ${planTitle.toUpperCase()}\n\nDisclaimer: This is a sample diet structure. Please schedule a 1-on-1 consultation for personalized calorie adjustment.\n\nRECOMMENDED GENERAL GUIDELINE:\n1. Drink 3-4 liters of water daily.\n2. Include 2 portions of colored vegetables in lunch and dinner.\n3. Take 15 minutes of direct morning sunlight for Vitamin D.\n4. Avoid refined flour and processed vegetable oils.\n\nThank you for choosing Preethi Nutrition Center!`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${planTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_guide.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="diet-plans-page animate-fade-in section-padding">
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>Specialized Diet Plans</h1>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '1.05rem' }} className="muted-text-selector">
            Browse through our nutrition programs. Log in as a registered customer to download the full dietary guides directly.
          </p>
        </div>

        {/* Lock warning for guests */}
        {!user && (
          <div className="glass-card animate-pulse" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            backgroundColor: 'rgba(249, 115, 22, 0.05)',
            marginBottom: '40px'
          }}>
            <Lock style={{ color: 'var(--secondary)', flexShrink: 0 }} size={20} />
            <div style={{ flex: 1, fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>Exclusive Client Access:</span>
              <span style={{ marginLeft: '6px' }}>Full nutrition guides and grocery shopping lists require a client account. Registration is free!</span>
            </div>
            <button 
              onClick={onOpenLoginModal}
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.8rem' }}
            >
              Sign Up / Login
            </button>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid-3">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className="glass-card" 
              style={{
                padding: '30px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                height: '100%'
              }}
            >
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  backgroundColor: 'var(--primary-glow)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  textTransform: 'uppercase'
                }}>
                  {plan.category}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  marginTop: '10px',
                  lineHeight: '1.3'
                }}>
                  {plan.title}
                </h3>
              </div>

              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-dark-muted)',
                lineHeight: '1.5',
                flexGrow: 1
              }} className="muted-text-selector">
                {plan.desc}
              </p>

              {/* Benefits checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {plan.benefits.map((benefit, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                    <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleDownload(plan.title)}
                  className="btn btn-primary"
                  style={{ width: '100%', display: 'flex', gap: '8px', justifyContent: 'center' }}
                >
                  {user ? (
                    <>
                      <Download size={16} />
                      <span>Download Diet PDF</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Log In to Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
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
