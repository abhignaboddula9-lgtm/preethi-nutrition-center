/* ==========================================
   PREETHI NUTRITION CENTER - ADMIN LOGIN JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initAdminLogin();
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
    if (!icon) return;
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

/* --- 3. Admin Authentication Logic --- */
function initAdminLogin() {
  const loginForm = document.getElementById('adminLoginForm');
  const errorAlert = document.getElementById('errorAlert');

  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value;

    if (!email || !password) return;

    // Reset error display
    if (errorAlert) {
      errorAlert.style.display = 'none';
      errorAlert.innerText = '';
    }

    try {
      // Call unified admin login endpoint from window.PreethiAPI
      const data = await window.PreethiAPI.adminLogin(email, password);

      if (data.success) {
        // Save administrative credentials in localStorage
        window.PreethiAPI.saveToken(data.token);
        window.PreethiAPI.saveUser(data.user);

        // Redirect to admin control panel dashboard
        window.location.href = '/admin';
      } else {
        showError(data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (error) {
      showError(error.message || 'Server error. Failed to authenticate admin.');
      console.error('Admin login error:', error);
    }
  });

  function showError(message) {
    if (!errorAlert) return;
    errorAlert.innerText = message;
    errorAlert.style.display = 'block';

    // Trigger alert shake animation
    errorAlert.style.animation = 'none';
    errorAlert.offsetHeight; /* Trigger reflow */
    errorAlert.style.animation = 'shake 0.3s ease';
  }
}
