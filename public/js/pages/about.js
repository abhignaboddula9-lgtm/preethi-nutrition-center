/* ==========================================
   PREETHI NUTRITION CENTER - ABOUT JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  loadAboutContent();
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

/* --- 2. Mobile Navigation Menu --- */
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

/* --- 3. Dynamic About Content Loader --- */
async function loadAboutContent() {
  const heroTitle = document.getElementById('aboutHeroTitle');
  const heroSubtitle = document.getElementById('aboutHeroSubtitle');
  const mainContent = document.getElementById('aboutMainContent');
  const mission = document.getElementById('aboutMission');
  const vision = document.getElementById('aboutVision');
  const experience = document.getElementById('aboutExperience');

  try {
    const response = await fetch('/api/about');
    const data = await response.json();

    if (data.success && data.data) {
      const about = data.data;

      // Update elements dynamically
      if (about.aboutHeroTitle && heroTitle) heroTitle.innerText = about.aboutHeroTitle;
      if (about.aboutHeroSubtitle && heroSubtitle) heroSubtitle.innerText = about.aboutHeroSubtitle;
      
      if (about.aboutMainContent && mainContent) {
        // Convert double newlines into paragraph tags for structured layout
        const paragraphs = about.aboutMainContent
          .split('\n\n')
          .filter(p => p.trim() !== '')
          .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
          .join('');
        mainContent.innerHTML = paragraphs;
      }
      
      if (about.aboutMission && mission) mission.innerText = about.aboutMission;
      if (about.aboutVision && vision) vision.innerText = about.aboutVision;
      if (about.aboutExperienceYears !== undefined && experience) {
        experience.innerText = `${about.aboutExperienceYears}+`;
      }
    }
  } catch (error) {
    console.log('Failed to fetch dynamic About content from API. Staying with default HTML details.', error);
  }
}
