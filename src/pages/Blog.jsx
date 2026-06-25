import React, { useState, useEffect } from 'react'
import { Search, Filter, BookOpen, Calendar, User, Clock } from 'lucide-react'

// Default blog posts to boot the app
export const DEFAULT_BLOGS = [
  {
    id: 1,
    title: 'Top 5 Anti-Aging Foods for Active Seniors',
    category: 'Old-Age Nutrition',
    summary: 'Discover the essential calcium, fiber, and antioxidant-rich foods that fight joint stiffness, improve bowel health, and support heart vitality in older age.',
    content: 'As we step into senior years, our metabolic rate slows and nutrient absorption changes. It is critical to adjust meals to support bone density and brain function. Here are the top 5 anti-aging foods you should include: \n\n1. Ragi (Finger Millet): Packed with natural calcium and fiber to support bone strength.\n2. Beetroots: Rich in dietary nitrates that naturally dilate blood vessels and reduce blood pressure.\n3. Walnuts: High in omega-3 fatty acids which support cognitive function and lower inflammation.\n4. Yogurt: Cultured probiotics to aid digestion and restore gut microbiome.\n5. Spinach: Contains lutein and zeaxanthin which protect vision and macular degradation.',
    author: 'Preethi Raghavan',
    date: '2026-06-10',
    readTime: '4 min read'
  },
  {
    id: 2,
    title: 'Juicing for Radiant Skin: Science vs Fiction',
    category: 'Skin Care',
    summary: 'Are green juices actually clearing up your acne? Learn the derm-nutrition truth behind gut-skin connection and what to consume for true cellular glow.',
    content: 'Many skincare routines focus solely on topical creams, but true cellular glow originates inside the gut. Juicing has become popular, but stripping fruits of their fiber can cause insulin spikes, which actually worsens acne! \n\nInstead of high-sugar fruit juices, focus on green smoothies that preserve fiber. Combine cucumbers, celery, mint, and half an apple with lemon juice. The high water content hydrates skin cells, while vitamins A and C boost collagen synthesis directly. Also, remember to eat healthy fats like avocados and pumpkin seeds which lock moisture into skin layers.',
    author: 'Preethi Raghavan',
    date: '2026-06-08',
    readTime: '5 min read'
  },
  {
    id: 3,
    title: 'Picky Eater Hacks: Protein for Growing Children',
    category: 'Children Nutrition',
    summary: 'Protein is essential for childrens muscles and immunity. Learn creative kitchen hacks to sneak healthy proteins into your kids favorite snacks.',
    content: 'Getting kids to eat lentils, eggs, or vegetables can feel like a daily battle. Since protein is the building block of growth, here are three clever recipes to hide high-quality proteins in foods they already love:\n\n1. Paneer/Tofu Pasta Sauce: Blend soft paneer or silken tofu directly into tomato marinara. It makes the sauce creamier while adding 15g of protein.\n2. Sprouted Moong Cutlets: Mash boiled sprouted green gram with potatoes, carrots, and mild spices. Shallow fry them as cutlets. They will love the crispiness!\n3. Nut Butter Smoothies: Blend bananas with natural peanut or almond butter and milk. It is high in healthy fats and protein, perfect for after-school energy.',
    author: 'Preethi Raghavan',
    date: '2026-06-05',
    readTime: '3 min read'
  },
  {
    id: 4,
    title: 'The Ultimate Guide to Starting Home Exercises',
    category: 'Exercise from Home',
    summary: 'No gym membership? No problem. Learn how to design a balanced 20-minute daily home workout routine using zero equipment.',
    content: 'Starting a fitness routine does not require a gym membership or expensive machinery. Consistency is much more valuable than intense, irregular workouts. Here is a balanced 20-minute circuit you can perform right in your living room:\n\n- Warm-up (3 Mins): Head rolls, arm circles, spot marching.\n- Strength (8 Mins): 3 sets of 10 Bodyweight Squats, 10 Wall Pushups, and 12 Glute Bridges.\n- Cardio (5 Mins): 40 seconds of Jumping Jacks or High Knees followed by 20 seconds rest (repeat 5 times).\n- Core (2 Mins): Plank hold (30 seconds, twice) and Bird-Dogs.\n- Cool-down (2 Mins): Deep breathing and hamstring stretches.\n\nPerform this 4 times a week, and pair it with a light walk to burn calories and build cardiovascular stamina.',
    author: 'Preethi Raghavan',
    date: '2026-06-01',
    readTime: '4 min read'
  },
  {
    id: 5,
    title: 'Hormones & Hunger: A Woman\'s Guide to Cycle Eating',
    category: 'Women Nutrition',
    summary: 'Your nutritional needs change across your menstrual cycle. Learn how eating specific foods during cycle phases controls cravings and bloating.',
    content: 'A woman\'s estrogen and progesterone levels fluctuate throughout her 28-day cycle, affecting metabolic rate, energy levels, and cravings. Instead of fighting your body, synchronize your diet with your cycle:\n\n- Follicular Phase (Days 1-13): Estrogen is rising. Eat light, fermented foods, broccoli, and lean proteins.\n- Ovulatory Phase (Days 14-17): Estrogen peaks. Prioritize raw veggies, quinoa, berries, and fiber to assist liver detoxification of excess estrogen.\n- Luteal Phase (Days 18-28): Progesterone increases, raising basal metabolic rate and cravings. Focus on complex carbs like sweet potatoes, oats, and dark chocolate to boost serotonin and avoid crash dieting.\n- Menstrual Phase (Days 1-5): Blood loss occurs. Focus on warm soups, spinach, beetroot, ginger, and iron-dense foods to replenish nutrient stores.',
    author: 'Preethi Raghavan',
    date: '2026-05-28',
    readTime: '6 min read'
  }
]

export default function Blog() {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState(null)

  // Merge admin-generated posts from localStorage on mount
  useEffect(() => {
    const customBlogs = JSON.parse(localStorage.getItem('preethi_custom_blogs') || '[]')
    if (customBlogs.length > 0) {
      setBlogs([...customBlogs, ...DEFAULT_BLOGS])
    }
  }, [])

  const categories = ['All', 'Old-Age Nutrition', 'Skin Care', 'Children Nutrition', 'Exercise from Home', 'Women Nutrition', 'Male Nutrition']

  const filteredBlogs = blogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="blog-page animate-fade-in section-padding">
      <div className="container">
        
        {/* Detail Modal/Viewer */}
        {selectedPost ? (
          <div className="glass-card animate-fade-in" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
            <button 
              onClick={() => setSelectedPost(null)} 
              className="btn btn-outline" 
              style={{ padding: '8px 16px', fontSize: '0.8rem', marginBottom: '24px' }}
            >
              ← Back to Blog List
            </button>
            
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--primary)',
              backgroundColor: 'var(--primary-glow)',
              padding: '4px 10px',
              borderRadius: '999px',
              textTransform: 'uppercase'
            }}>
              {selectedPost.category}
            </span>

            <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginTop: '12px', marginBottom: '16px', lineHeight: 1.2 }}>
              {selectedPost.title}
            </h1>

            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              color: 'var(--text-dark-muted)', 
              fontSize: '0.85rem',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '20px',
              marginBottom: '30px'
            }} className="muted-text-selector">
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <User size={14} /> By {selectedPost.author}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} /> {selectedPost.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> {selectedPost.readTime}
              </span>
            </div>

            <div style={{ 
              whiteSpace: 'pre-wrap', 
              fontSize: '1.05rem', 
              lineHeight: '1.8',
              color: 'inherit'
            }}>
              {selectedPost.content}
            </div>
          </div>
        ) : (
          /* Normal List View */
          <div>
            {/* Header */}
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
              <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>Blog & Health Tips</h1>
              <p style={{ color: 'var(--text-dark-muted)', fontSize: '1.05rem' }} className="muted-text-selector">
                Stay updated with scientific recipes, bone-care tips, home workouts, and nutritional advices.
              </p>
            </div>

            {/* Filters panel */}
            <div className="glass-card" style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '40px'
            }}>
              {/* Search */}
              <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px', minWidth: '250px' }}>
                <Search size={18} style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-dark-muted)'
                }} className="muted-text-selector" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                />
              </div>

              {/* Category Dropdown/Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={18} style={{ color: 'var(--primary)' }} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input"
                  style={{ width: 'max-content', padding: '10px 30px 10px 14px', cursor: 'pointer' }}
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blog List Grid */}
            {filteredBlogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                <BookOpen size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                <h3>No articles found matching your criteria.</h3>
                <p>Try clearing your search query or selecting a different category.</p>
              </div>
            ) : (
              <div className="grid-2">
                {filteredBlogs.map((post) => (
                  <div 
                    key={post.id} 
                    className="glass-card" 
                    style={{
                      padding: '30px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedPost(post)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        backgroundColor: 'var(--primary-glow)',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }} className="muted-text-selector">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', lineHeight: '1.3' }}>
                      {post.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-dark-muted)',
                      lineHeight: '1.6',
                      flexGrow: 1
                    }} className="muted-text-selector">
                      {post.summary}
                    </p>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: '12px',
                      fontSize: '0.8rem',
                      color: 'var(--text-dark-muted)'
                    }} className="muted-text-selector">
                      <span>By {post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
