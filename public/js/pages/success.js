/* ==========================================
   PREETHI NUTRITION CENTER - SUCCESS JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initSuccessStories();
});

/* --- 1. Theme Toggler --- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const htmlEl = document.documentElement;
  const icon = themeToggleBtn.querySelector('i');

  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }
}

/* --- 2. Mobile Menu (Hamburger) --- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  
  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* --- 3. Dynamic Success Stories Catalog --- */
async function initSuccessStories() {
  const storiesGrid = document.getElementById('storiesGrid');
  if (!storiesGrid) return;

  let allStories = [];

  // Offline defaults to show a beautiful page immediately
  const defaultStories = [
    {
      _id: 'story1',
      clientName: 'Sanjana Sharma',
      clientDetails: 'Lost 18 Kgs in 4 Months',
      beforeImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
      afterImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop&hue=120',
      testimonial: "Preethi Ma'am completely changed the way I look at food. The custom diet chart was so easy to follow, and the Zumba sessions made workouts super fun!"
    },
    {
      _id: 'story2',
      clientName: 'Vikram Rao',
      clientDetails: 'Lost 22 Kgs in 5 Months',
      beforeImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop&hue=200',
      afterImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop&hue=280',
      testimonial: "I had severe acidity and heavy weight issues. Combining cellular shake drinks with Zumba workouts helped me reset my body parameters. Excellent guidance!"
    },
    {
      _id: 'story3',
      clientName: 'Neha Mehta',
      clientDetails: 'Lost 12 Kgs in 3 Months',
      beforeImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop&hue=60',
      afterImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop&hue=90',
      testimonial: "Amazing guidance. The custom diet chart was so simple to integrate into my busy office days. The morning shakes kept me full and focused all day."
    },
    {
      _id: 'story4',
      clientName: 'Rohan Malhotra',
      clientDetails: 'Lost 15 Kgs in 3.5 Months',
      beforeImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop&hue=30',
      afterImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop&hue=150',
      testimonial: "I was extremely lethargic and had high cholesterol. Under Preethi Ma'am's training, I reset my nutritional habits and did Zumba regularly. My reports are normal now!"
    }
  ];

  try {
    const response = await fetch('/api/success');
    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      allStories = data.data;
    } else {
      allStories = defaultStories;
    }
  } catch (error) {
    console.log('Failed to fetch success stories from API. Loading defaults.', error);
    allStories = defaultStories;
  }

  // Render items
  renderStories(allStories);

  // Initialize Split Slider Drag listeners for each card
  initializeCardSliders();

  function renderStories(stories) {
    storiesGrid.innerHTML = '';

    stories.forEach(story => {
      const card = document.createElement('div');
      card.className = 'story-card';

      card.innerHTML = `
        <div class="card-ba-container" data-story-id="${story._id}">
          <img src="${story.beforeImageUrl}" alt="Before" class="card-ba-img before-img">
          <div class="card-ba-resize">
            <img src="${story.afterImageUrl}" alt="After">
          </div>
          <div class="card-ba-handle">
            <i class="fa-solid fa-arrows-left-right"></i>
          </div>
          <span class="card-ba-label label-before">Before</span>
          <span class="card-ba-label label-after">After</span>
        </div>
        <div class="story-info">
          <h3 class="story-client-name">${story.clientName}</h3>
          <span class="story-details-badge">
            <i class="fa-solid fa-circle-check"></i> ${story.clientDetails}
          </span>
          <p class="story-quote">"${story.testimonial}"</p>
        </div>
      `;

      storiesGrid.appendChild(card);
    });
  }

  function initializeCardSliders() {
    const baContainers = document.querySelectorAll('.card-ba-container');

    baContainers.forEach(container => {
      const resizeWrap = container.querySelector('.card-ba-resize');
      const handle = container.querySelector('.card-ba-handle');
      
      if (!resizeWrap || !handle) return;

      let isDragging = false;

      const adjustSlider = (clientX) => {
        const rect = container.getBoundingClientRect();
        const x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        
        percentage = Math.min(100, Math.max(0, percentage));

        resizeWrap.style.width = `${100 - percentage}%`;
        handle.style.left = `${percentage}%`;
      };

      // Mouse Listeners
      handle.addEventListener('mousedown', () => { isDragging = true; });
      window.addEventListener('mouseup', () => { isDragging = false; });
      
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        adjustSlider(e.clientX);
      });

      // Touch Listeners
      handle.addEventListener('touchstart', () => { isDragging = true; });
      window.addEventListener('touchend', () => { isDragging = false; });
      
      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        if (e.touches.length > 0) {
          adjustSlider(e.touches[0].clientX);
        }
      });

      // Container Click Listener
      container.addEventListener('click', (e) => {
        if (e.target === handle || handle.contains(e.target)) return;
        adjustSlider(e.clientX);
      });
    });
  }
}
