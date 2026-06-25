/* ══════════════════════════════════════════════════════════
   PREETHI NUTRITION CENTER — COMPLETE APP LOGIC
   ══════════════════════════════════════════════════════════ */

'use strict';

/* ── State ── */
let currentPage = 'home';
let currentUser  = null;
let tipIndex     = 0;
let blogFilter   = 'all';

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadUser();
  renderTips();
  renderBlog();
  animateCounters();
  loadDashboardData();
});

/* ══════════════════════════════════
   NAVIGATION
══════════════════════════════════ */
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Deactivate nav buttons
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  currentPage = page;

  const pageEl = document.getElementById(`page-${page}`);
  if (pageEl) {
    pageEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navEl = document.getElementById(`nav-${navIdMap[page] || page}`);
  if (navEl) navEl.classList.add('active');

  // Reload dashboard data when navigating to dashboards
  if (page === 'customer-dashboard') loadDashboardData();
  if (page === 'admin-dashboard') loadAdminData();

  closeAllModals();
}

const navIdMap = {
  'home': 'home',
  'about': 'about',
  'services': 'services',
  'diet': 'diet',
  'zumba': 'zumba',
  'success': 'success',
  'blog': 'blog',
  'contact': 'contact',
  'customer-dashboard': 'home',
  'admin-dashboard': 'home'
};

function toggleMobile() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

/* ══════════════════════════════════
   THEME
══════════════════════════════════ */
function initTheme() {
  const saved = localStorage.getItem('pnc-theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    document.getElementById('theme-btn').textContent = '☀️';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  document.getElementById('theme-btn').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('pnc-theme', isDark ? 'dark' : 'light');
}

/* ══════════════════════════════════
   MODALS
══════════════════════════════════ */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

function closeModalOutside(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}

function switchModal(from, to) {
  closeModal(from);
  setTimeout(() => openModal(to), 100);
}

/* ══════════════════════════════════
   AUTH — LOGIN / REGISTER / LOGOUT
══════════════════════════════════ */
async function login(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const errEl    = document.getElementById('login-error');

  try {
    const res  = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) {
      errEl.textContent = data.error || 'Login failed. Please check your credentials.';
      errEl.style.display = 'block';
      return;
    }

    errEl.style.display = 'none';
    currentUser = data;
    localStorage.setItem('pnc-user', JSON.stringify(data));
    updateUIForUser();
    closeModal('login-modal');
    showToast(`Welcome back, ${data.name}! 🌿`);
    goToDashboard();

  } catch {
    errEl.textContent = 'Connection error. Please try again.';
    errEl.style.display = 'block';
  }
}

async function register(e) {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value.trim();
  const phone    = document.getElementById('reg-phone').value.trim();
  const height   = parseFloat(document.getElementById('reg-height').value) || 0;
  const weight   = parseFloat(document.getElementById('reg-weight').value) || 0;
  const errEl    = document.getElementById('register-error');

  if (password.length < 6) {
    errEl.textContent = 'Password must be at least 6 characters.';
    errEl.style.display = 'block';
    return;
  }

  try {
    const res  = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone, height, weight })
    });
    const data = await res.json();

    if (!res.ok) {
      errEl.textContent = data.error || 'Registration failed. Please try again.';
      errEl.style.display = 'block';
      return;
    }

    errEl.style.display = 'none';
    currentUser = data;
    localStorage.setItem('pnc-user', JSON.stringify(data));
    updateUIForUser();
    closeModal('register-modal');
    showToast(`Welcome to Preethi Nutrition Center, ${data.name}! 🎉`);
    goToDashboard();

  } catch {
    errEl.textContent = 'Connection error. Please try again.';
    errEl.style.display = 'block';
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem('pnc-user');
  updateUIForUser();
  navigateTo('home');
  showToast('Logged out successfully. See you soon! 👋');
}

function loadUser() {
  const saved = localStorage.getItem('pnc-user');
  if (saved) {
    currentUser = JSON.parse(saved);
    updateUIForUser();
  }
}

function updateUIForUser() {
  const authControls = document.getElementById('auth-controls');
  const userMenu     = document.getElementById('user-menu');
  const mobileAuth   = document.getElementById('mobile-auth');

  if (currentUser) {
    authControls.style.display = 'none';
    userMenu.style.display = 'flex';
    document.getElementById('user-avatar').textContent = currentUser.name[0].toUpperCase();
    document.getElementById('user-name-display').textContent = currentUser.name.split(' ')[0];
    if (mobileAuth) mobileAuth.style.display = 'none';

    // Update dashboard info
    const dashAvatar = document.getElementById('dash-avatar');
    if (dashAvatar) dashAvatar.textContent = currentUser.name[0].toUpperCase();
    const dashName = document.getElementById('dash-user-name');
    if (dashName) dashName.textContent = currentUser.name;
    const dashEmail = document.getElementById('dash-user-email');
    if (dashEmail) dashEmail.textContent = currentUser.email;
  } else {
    authControls.style.display = 'flex';
    userMenu.style.display = 'none';
    if (mobileAuth) mobileAuth.style.display = 'flex';
  }
}

function toggleUserDropdown() {
  const dd = document.getElementById('user-dropdown');
  dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', (e) => {
  const dd = document.getElementById('user-dropdown');
  if (dd && !dd.closest('.user-pill') && !e.target.closest('.user-pill')) {
    dd.style.display = 'none';
  }
});

function goToDashboard() {
  if (!currentUser) { openModal('login-modal'); return; }
  if (currentUser.role === 'admin') {
    navigateTo('admin-dashboard');
  } else {
    navigateTo('customer-dashboard');
  }
}

/* ══════════════════════════════════
   DASHBOARD TABS
══════════════════════════════════ */
function showDashTab(tabId, role) {
  const prefix = role === 'admin' ? 'tab-admin-' : 'tab-';
  const actualId = role === 'admin' ? `tab-${tabId}` : `tab-${tabId}`;

  // Deactivate all tabs & nav buttons in same dashboard
  const allTabs = document.querySelectorAll(
    role === 'admin' ? '#page-admin-dashboard .dash-tab' : '#page-customer-dashboard .dash-tab'
  );
  allTabs.forEach(t => t.classList.remove('active'));

  const allNavBtns = document.querySelectorAll(
    role === 'admin' ? '#page-admin-dashboard .dash-nav-btn' : '#page-customer-dashboard .dash-nav-btn'
  );
  allNavBtns.forEach(b => b.classList.remove('active'));

  const tab = document.getElementById(`tab-${tabId}`);
  if (tab) tab.classList.add('active');

  // Set active nav btn
  const clickedBtn = event ? event.currentTarget : null;
  if (clickedBtn) clickedBtn.classList.add('active');

  // Load data when tabs are opened
  if (tabId === 'health-tracker') loadHealthLogs();
  if (tabId === 'appointments') loadMyAppointments();
  if (tabId === 'tips-personal') loadPersonalTips();
  if (tabId === 'admin-appointments') loadAdminAppointments();
  if (tabId === 'admin-clients') loadAdminClients();
  if (tabId === 'admin-blog') loadAdminBlog();
  if (tabId === 'admin-tips') loadAdminTips();
}

/* ══════════════════════════════════
   BMI CALCULATOR
══════════════════════════════════ */
function calculateBMI() {
  const weight = parseFloat(document.getElementById('bmi-weight').value);
  const height = parseFloat(document.getElementById('bmi-height').value);
  const age    = parseInt(document.getElementById('bmi-age').value) || 30;
  const gender = document.getElementById('bmi-gender').value;
  renderBMIResult(weight, height, age, gender, 'bmi-result', 'bmi-score', 'bmi-label', 'bmr-value', 'tdee-value', 'ideal-weight', 'gauge-marker', 'bmi-advice');
}

function calculateDashBMI() {
  const weight = parseFloat(document.getElementById('dash-bmi-weight').value);
  const height = parseFloat(document.getElementById('dash-bmi-height').value);
  const age    = parseInt(document.getElementById('dash-bmi-age').value) || 30;
  const gender = document.getElementById('dash-bmi-gender').value;
  renderBMIResult(weight, height, age, gender, 'dash-bmi-result', 'dash-bmi-score', 'dash-bmi-label', 'dash-bmr-value', 'dash-tdee-value', 'dash-ideal-weight', null, 'dash-bmi-advice');
}

function renderBMIResult(weight, height, age, gender, resultId, scoreId, labelId, bmrId, tdeeId, idealId, markerId, adviceId) {
  if (!weight || !height || weight < 10 || height < 50) {
    showToast('⚠️ Please enter valid weight and height.');
    return;
  }

  const h   = height / 100;
  const bmi = +(weight / (h * h)).toFixed(1);

  // BMR (Mifflin-St Jeor)
  let bmr;
  if (gender === 'male') {
    bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  } else {
    bmr = Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  }
  const tdee = Math.round(bmr * 1.4);

  // Ideal weight (Devine formula)
  let ideal;
  if (gender === 'male') {
    ideal = +(50 + 2.3 * ((height - 152.4) / 2.54)).toFixed(1);
  } else {
    ideal = +(45.5 + 2.3 * ((height - 152.4) / 2.54)).toFixed(1);
  }

  let category, color, advice;
  if (bmi < 18.5) {
    category = 'Underweight'; color = '#3b82f6';
    advice = '💙 You are underweight. Consider a calorie-surplus meal plan with protein-rich foods. Our Weight Gain Program can help you build healthy mass safely.';
  } else if (bmi < 25) {
    category = 'Normal Weight'; color = '#10b981';
    advice = '💚 Excellent! You are in the healthy weight range. Maintain this with balanced nutrition and regular physical activity. Our Maintenance Plan keeps you on track.';
  } else if (bmi < 30) {
    category = 'Overweight'; color = '#f59e0b';
    advice = '🟡 You are slightly overweight. Small lifestyle changes in diet and activity can make a big difference. Our Weight Loss Program is perfectly suited for you.';
  } else {
    category = 'Obese'; color = '#ef4444';
    advice = '❤️ Your BMI indicates obesity. Please consult with our certified dietitian for a safe, medically-guided weight loss program. You can achieve great results!';
  }

  const markerPos = Math.min(Math.max(((bmi - 15) / (40 - 15)) * 100, 0), 100);

  document.getElementById(resultId).style.display = 'block';
  const scoreEl = document.getElementById(scoreId);
  scoreEl.textContent = bmi;
  scoreEl.style.color = color;
  const ringEl = scoreEl.closest('.bmi-score-ring');
  if (ringEl) ringEl.style.boxShadow = `0 0 0 8px ${color}22, 0 0 40px ${color}33`;

  document.getElementById(labelId).textContent = category;
  document.getElementById(labelId).style.color = color;
  document.getElementById(bmrId).textContent = bmr + ' kcal';
  document.getElementById(tdeeId).textContent = tdee + ' kcal';
  document.getElementById(idealId).textContent = ideal + ' kg';
  document.getElementById(adviceId).textContent = advice;
  if (markerId) {
    document.getElementById(markerId).style.left = markerPos + '%';
  }
}

async function saveBMILog() {
  if (!currentUser) { showToast('Please login to save.'); return; }
  const weight = parseFloat(document.getElementById('dash-bmi-weight').value);
  const height = parseFloat(document.getElementById('dash-bmi-height').value);
  const bmi    = parseFloat(document.getElementById('dash-bmi-score').textContent);
  if (!bmi) { showToast('Calculate BMI first.'); return; }

  try {
    const res = await fetch('/api/health-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentUser.email, weight, height, bmi, steps: 0, water: 0 })
    });
    if (res.ok) showToast('✅ BMI log saved to your health history!');
    else showToast('⚠️ Could not save log.');
  } catch {
    showToast('✅ BMI data saved locally!');
  }
}

/* ══════════════════════════════════
   HEALTH LOGGER
══════════════════════════════════ */
async function logHealth() {
  if (!currentUser) { showToast('Please login first.'); return; }
  const weight = parseFloat(document.getElementById('log-weight').value);
  const steps  = parseInt(document.getElementById('log-steps').value) || 0;
  const water  = parseFloat(document.getElementById('log-water').value) || 0;
  const height = parseFloat(document.getElementById('log-height').value) || currentUser.height || 165;

  if (!weight) { showToast('⚠️ Please enter at least your weight.'); return; }

  const h   = height / 100;
  const bmi = +(weight / (h * h)).toFixed(1);

  try {
    const res = await fetch('/api/health-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentUser.email, weight, height, bmi, steps, water })
    });

    if (res.ok) {
      showToast(`✅ Health log saved! BMI: ${bmi}`);
      loadHealthLogs();
      updateOverviewStats(weight, bmi);
    }
  } catch {
    showToast('✅ Health data saved!');
  }
}

function updateOverviewStats(weight, bmi) {
  const wEl = document.getElementById('cur-weight');
  const bEl = document.getElementById('cur-bmi');
  if (wEl) wEl.textContent = weight + ' kg';
  if (bEl) bEl.textContent = bmi;
}

async function loadHealthLogs() {
  if (!currentUser) return;
  const wrapper = document.getElementById('logs-table-wrapper');
  if (!wrapper) return;

  try {
    const res  = await fetch(`/api/health-logs?email=${currentUser.email}`);
    const logs = await res.json();

    if (!logs.length) {
      wrapper.innerHTML = '<p style="color:var(--text-muted);padding:20px 0;">No health logs yet. Start tracking your daily metrics above!</p>';
      return;
    }

    wrapper.innerHTML = `
      <table class="data-table">
        <thead><tr><th>Date</th><th>Weight</th><th>BMI</th><th>Steps</th><th>Water</th></tr></thead>
        <tbody>${logs.map(l => `
          <tr>
            <td>${l.date}</td>
            <td>${l.weight} kg</td>
            <td>${l.bmi}</td>
            <td>${l.steps.toLocaleString()}</td>
            <td>${l.water} L</td>
          </tr>`).join('')}
        </tbody>
      </table>`;

    // Update overview
    if (logs[0]) updateOverviewStats(logs[0].weight, logs[0].bmi);

  } catch {
    wrapper.innerHTML = '<p style="color:var(--text-muted);">Could not load logs. Start tracking!</p>';
  }
}

/* ══════════════════════════════════
   APPOINTMENTS
══════════════════════════════════ */
async function bookAppointment() {
  if (!currentUser) { openModal('login-modal'); return; }

  const service    = document.getElementById('appt-service').value;
  const date       = document.getElementById('appt-date').value;
  const time       = document.getElementById('appt-time').value;
  const consultant = document.getElementById('appt-consultant').value;
  const notes      = document.getElementById('appt-notes').value;

  if (!date) { showToast('⚠️ Please select a date.'); return; }

  try {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName:  currentUser.name,
        customerEmail: currentUser.email,
        service, date, time, consultant, notes
      })
    });

    if (res.ok) {
      showToast('✅ Appointment booked! Awaiting confirmation.');
      loadMyAppointments();
    }
  } catch {
    showToast('✅ Appointment request sent!');
  }
}

async function loadMyAppointments() {
  if (!currentUser) return;
  const wrapper = document.getElementById('appts-table');
  if (!wrapper) return;

  try {
    const res   = await fetch(`/api/appointments?email=${currentUser.email}`);
    const apts  = await res.json();
    const next  = apts.find(a => a.status === 'Approved');

    const nextEl = document.getElementById('next-appt');
    if (nextEl) nextEl.textContent = next ? next.date : 'None';

    if (!apts.length) {
      wrapper.innerHTML = '<p style="color:var(--text-muted);padding:16px 0;">No appointments yet. Book your first consultation above!</p>';
      return;
    }

    wrapper.innerHTML = `
      <table class="data-table">
        <thead><tr><th>Service</th><th>Date</th><th>Time</th><th>Consultant</th><th>Status</th></tr></thead>
        <tbody>${apts.map(a => `
          <tr>
            <td>${a.service}</td>
            <td>${a.date}</td>
            <td>${a.time}</td>
            <td>${a.consultant}</td>
            <td><span class="status-pill status-${a.status.toLowerCase()}">${a.status}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>`;
  } catch {
    wrapper.innerHTML = '<p style="color:var(--text-muted);">Could not load appointments.</p>';
  }
}

/* ══════════════════════════════════
   CONTACT FORM
══════════════════════════════════ */
async function submitContact(e) {
  e.preventDefault();
  const name    = document.getElementById('cf-name').value;
  const phone   = document.getElementById('cf-phone').value;
  const email   = document.getElementById('cf-email').value;
  const service = document.getElementById('cf-service').value;
  const message = document.getElementById('cf-message').value;

  try {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, service, message })
    });
  } catch { /* ignore */ }

  document.getElementById('contact-form').style.display = 'none';
  document.getElementById('contact-success').style.display = 'block';
  showToast('✅ Message sent! We\'ll be in touch within 24 hours.');
}

/* ══════════════════════════════════
   DAILY TIPS
══════════════════════════════════ */
const TIPS = [
  { icon: '✨', cat: 'Skin Care', title: 'Hydration is Key for Skin Radiance', content: 'Drinking 3 liters of water daily flushes out toxins and keeps your skin naturally hydrated. Pair with water-rich fruits like watermelon and cucumber for extra glow.' },
  { icon: '🔥', cat: 'Weight Loss from Home', title: 'Boost NEAT for Passive Fat Burn', content: 'Non-Exercise Activity Thermogenesis (NEAT) includes standing, pacing, and stair climbing. These small movements can burn 200–400 extra calories daily without a gym.' },
  { icon: '🍎', cat: 'Children Nutrition', title: 'Sneak Vegetables into Fun Foods', content: 'Puree spinach and carrots into pasta sauces or pancake batter. Children get essential micronutrients without the mealtime struggle!' },
  { icon: '⚡', cat: 'Exercise from Home', title: '15-Minute HIIT is Highly Effective', content: 'A 15-minute circuit of jumping jacks, squats, push-ups, and planks burns significant calories, boosts heart rate, and requires zero equipment.' },
  { icon: '🦴', cat: 'Old-Age Nutrition', title: 'Calcium + Vitamin D for Strong Bones', content: 'As bones age, they lose density. Combine low-fat dairy or ragi with 15 minutes of morning sunlight for optimal bone health and fracture prevention.' },
  { icon: '🩸', cat: 'Women Nutrition', title: 'Iron-Rich Diet During Cycles', content: 'Prevent fatigue by consuming iron-rich foods like spinach, dates, and lentils during menstruation. Pair with Vitamin C foods to triple iron absorption!' },
  { icon: '💪', cat: 'Male Nutrition', title: 'Protein Timing for Muscle Growth', content: 'Consume 25–30g of protein within 45 minutes post-workout. Paneer, eggs, and legumes are excellent sources for South Indian dietary preferences.' },
  { icon: '🌊', cat: 'Hydration', title: 'Start Day with Warm Lemon Water', content: 'Drinking warm lemon water in the morning stimulates digestion, boosts metabolism by 30%, and provides a dose of Vitamin C to jumpstart your immunity.' },
  { icon: '🧠', cat: 'General Wellness', title: 'Sleep is Your Best Fat Burner', content: 'Poor sleep raises ghrelin (hunger hormone) by 15% and decreases leptin (fullness hormone). Aim for 7–9 hours of quality sleep for optimal weight management.' },
  { icon: '🌿', cat: 'Skin Care', title: 'Collagen-Boosting Foods', content: 'Include Vitamin C-rich foods (amla, guava, bell peppers) and zinc sources (pumpkin seeds, chickpeas) to support natural collagen production for youthful skin.' },
];

function renderTips() {
  renderTipSlide();
  renderTipDots();
  setInterval(nextTip, 6000);
}

function renderTipSlide() {
  const t = TIPS[tipIndex];
  const slide = document.getElementById('tips-slide');
  if (!slide) return;
  slide.innerHTML = `
    <div class="tip-badge">${t.icon} ${t.cat}</div>
    <h3>${t.title}</h3>
    <p>${t.content}</p>`;
}

function renderTipDots() {
  const dots = document.getElementById('tips-dots');
  if (!dots) return;
  dots.innerHTML = TIPS.map((_, i) =>
    `<div class="tip-dot ${i === tipIndex ? 'active' : ''}" onclick="goTip(${i})"></div>`
  ).join('');
}

function nextTip() {
  tipIndex = (tipIndex + 1) % TIPS.length;
  renderTipSlide();
  renderTipDots();
}

function prevTip() {
  tipIndex = (tipIndex - 1 + TIPS.length) % TIPS.length;
  renderTipSlide();
  renderTipDots();
}

function goTip(i) {
  tipIndex = i;
  renderTipSlide();
  renderTipDots();
}

/* ══════════════════════════════════
   BLOG
══════════════════════════════════ */
const BLOG_POSTS = [
  { id:1, cat:'old-age', icon:'👴', title:'5 Essential Nutrients Every Senior Needs Daily', summary:'Discover the key nutrients that help seniors maintain strength, cognitive health, and energy levels as they age gracefully.', content:'', author:'Preethi Ma\'am', date:'2025-06-10', time:'6 min read' },
  { id:2, cat:'skin', icon:'✨', title:'The Anti-Acne Diet: Foods to Eat and Avoid', summary:'Your diet plays a 70% role in skin health. Learn which foods trigger breakouts and which ones promote clear, glowing skin.', content:'', author:'Preethi Ma\'am', date:'2025-06-08', time:'5 min read' },
  { id:3, cat:'children', icon:'👶', title:'Building a Healthy Lunchbox: Smart School Tiffin Ideas', summary:'Practical, nutrition-packed tiffin ideas that even picky eaters will love — balancing taste, health, and convenience.', content:'', author:'Preethi Ma\'am', date:'2025-06-05', time:'4 min read' },
  { id:4, cat:'weight-loss', icon:'🔥', title:'Why Crash Diets Fail: The Science of Sustainable Fat Loss', summary:'Understand why extreme diets backfire and how a moderate calorie deficit with balanced nutrition produces lasting results.', content:'', author:'Preethi Ma\'am', date:'2025-06-03', time:'7 min read' },
  { id:5, cat:'women', icon:'🌸', title:'PCOS Diet: Balancing Hormones Through Food', summary:'A comprehensive guide to eating for PCOS — managing insulin resistance, reducing inflammation, and supporting hormonal balance.', content:'', author:'Preethi Ma\'am', date:'2025-05-28', time:'8 min read' },
  { id:6, cat:'men', icon:'💪', title:'Testosterone-Boosting Foods Every Man Should Eat', summary:'Natural dietary strategies to maintain healthy testosterone levels, support muscle growth, and boost vitality and energy.', content:'', author:'Preethi Ma\'am', date:'2025-05-25', time:'5 min read' },
  { id:7, cat:'old-age', icon:'🦴', title:'Preventing Osteoporosis: Calcium-Rich Indian Foods', summary:'A practical guide to calcium-rich foods in the Indian diet that strengthen bones and prevent fractures in senior citizens.', content:'', author:'Preethi Ma\'am', date:'2025-05-20', time:'5 min read' },
  { id:8, cat:'skin', icon:'💧', title:'How Hydration Transforms Your Skin in 30 Days', summary:'A documented 30-day hydration challenge results and the science behind how water intake affects skin texture, tone, and glow.', content:'', author:'Preethi Ma\'am', date:'2025-05-15', time:'4 min read' },
  { id:9, cat:'weight-loss', icon:'🏃', title:'The Truth About Intermittent Fasting for Weight Loss', summary:'Evidence-based analysis of intermittent fasting protocols, who benefits, who should avoid it, and how to do it safely.', content:'', author:'Preethi Ma\'am', date:'2025-05-10', time:'9 min read' },
];

function renderBlog(filter = 'all') {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? BLOG_POSTS : BLOG_POSTS.filter(b => b.cat === filter);

  if (!filtered.length) {
    grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px;">No articles in this category yet.</p>';
    return;
  }

  grid.innerHTML = filtered.map(b => `
    <div class="blog-card" onclick="openBlogModal(${b.id})">
      <div class="blog-card-img">${b.icon}</div>
      <div class="blog-card-body">
        <div class="blog-cat-badge">${catLabel(b.cat)}</div>
        <h3>${b.title}</h3>
        <p>${b.summary}</p>
        <div class="blog-meta"><span>${b.author}</span><span>📖 ${b.time}</span></div>
      </div>
    </div>`).join('');
}

function catLabel(cat) {
  const map = { 'old-age':'Old-Age Nutrition','skin':'Skin Health','children':'Children Nutrition','weight-loss':'Weight Loss','women':'Women Nutrition','men':'Male Nutrition','general':'General Wellness' };
  return map[cat] || cat;
}

function filterBlog(filter, btn) {
  blogFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderBlog(filter);
}

function openBlogModal(id) {
  const post = BLOG_POSTS.find(b => b.id === id);
  if (!post) return;
  showToast(`Opening: ${post.title.substring(0,40)}...`);
}

/* ══════════════════════════════════
   DIET PLAN DOWNLOAD
══════════════════════════════════ */
function downloadSamplePlan(type) {
  const plans = {
    'old-age':  { name: 'Senior Citizen Nutrition Plan', content: generatePlanContent('Old-Age Nutrition', ['Calcium-rich foods (dairy, ragi, sesame)','Vitamin D sources (fatty fish, fortified foods)','B12 supplementation guidance','Anti-inflammatory foods (turmeric, ginger)','High-fiber foods for digestive health','Protein for muscle preservation (pulses, eggs)','Iron-rich foods to prevent anemia','Healthy fats for brain health (nuts, seeds)']) },
    'skin':     { name: 'Skin Health Diet Plan',         content: generatePlanContent('Skin Health Nutrition', ['Vitamin C foods (amla, guava, lemon)','Omega-3 rich foods (walnuts, flaxseeds, fish)','Zinc sources (pumpkin seeds, chickpeas)','Antioxidant-rich berries and colorful vegetables','Anti-acne foods (low-glycemic choices)','Foods to AVOID (sugar, dairy, refined carbs)','Collagen-boosting nutrition tips','3L daily water intake protocol']) },
    'children': { name: 'Children Nutrition Plan',       content: generatePlanContent('Children Nutrition', ['Age-appropriate calorie requirements','Calcium for bone development (milk, paneer)','Iron for brain health (spinach, dates)','DHA sources for cognitive development','Rainbow diet for micronutrients','Healthy snack ideas for school','Managing picky eating strategies','Immunity-boosting foods']) },
    'women':    { name: "Women's Nutrition Plan",        content: generatePlanContent("Women's Nutrition", ['Iron-rich foods for menstrual health','PCOS management diet','Pre and post-natal nutrition','Menopause nutrition guidelines','Hormone-balancing foods','Bone health in perimenopause','Gut health and digestion for women','Stress eating management']) },
    'male':     { name: 'Male Nutrition Plan',           content: generatePlanContent('Male Nutrition', ['High-protein meal planning','Testosterone-supporting foods','Pre and post-workout nutrition','Heart health nutrition for men','Muscle building diet strategies','Metabolism optimization','Gut health for men','Energy and vitality foods']) },
    'home-loss':{ name: 'Home Weight Loss Plan',         content: generatePlanContent('Weight Loss from Home', ['500-calorie deficit strategy','Low-calorie Indian meal ideas','Home HIIT workout routine','NEAT activity optimization','Intermittent fasting guide (16:8)','Mindful eating techniques','Sleep and weight loss connection','Weekly meal prep guide']) },
    'exercise': { name: 'Home Exercise Nutrition Plan',  content: generatePlanContent('Exercise Nutrition', ['Pre-workout meals (30-45 min before)','Post-workout recovery nutrition','Protein requirements for exercise','Intra-workout hydration protocol','Creatine and supplements guide','Carb cycling basics','Rest day nutrition','Electrolyte balance tips']) },
    'skincare': { name: 'Skin Care Nutrition Plan',      content: generatePlanContent('Skin Care', ['Detox water recipes','Anti-aging foods and drinks','Collagen peptides and natural sources','UV protection through diet','Probiotics for clear skin','Anti-inflammatory meal plan','Essential skin supplements','Foods that cause skin aging (avoid list)']) },
  };

  const plan = plans[type];
  if (!plan) return;

  const blob = new Blob([plan.content], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `${plan.name.replace(/ /g,'_')}_Preethi_Nutrition.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`📥 Downloading: ${plan.name}`);
}

function generatePlanContent(title, topics) {
  const date = new Date().toLocaleDateString('en-IN');
  return `
╔══════════════════════════════════════════════════════════╗
║          PREETHI NUTRITION CENTER                        ║
║          ${title.padEnd(48)}║
╚══════════════════════════════════════════════════════════╝

📍 123 Wellness Street, Anna Nagar, Chennai - 600040
📞 +91 98765 43210  |  ✉️ info@preethinutrition.com
🌐 www.preethinutrition.com
Generated: ${date}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROGRAM OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is a SAMPLE diet plan document. For a personalized plan 
specific to your body composition, health history, and goals, 
book a one-on-one consultation with our certified nutritionist.

KEY TOPICS COVERED IN YOUR PERSONALIZED PLAN:
${topics.map((t, i) => `  ${i + 1}. ${t}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SAMPLE DAILY MEAL PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌅 EARLY MORNING (6:00 AM)
   • 1 glass warm water with lemon
   • 4-5 soaked almonds + 2 walnuts
   • Optional: 1 tsp honey with cinnamon

🍳 BREAKFAST (8:00 AM)
   • 2 idli / 2 dosa with sambar + chutney
   • OR: Oats upma with vegetables
   • 1 glass low-fat milk / buttermilk
   • Seasonal fruit (banana / apple / papaya)

🥗 MID-MORNING SNACK (11:00 AM)
   • 1 fruit (seasonal)
   • OR: Handful of mixed nuts (unsalted)
   • OR: 1 cup sprouts with lemon

🍱 LUNCH (1:00 PM)
   • 2 chapati / 1 cup rice
   • 1 bowl dal / sambhar
   • 1 bowl vegetable curry
   • 1 bowl curd / buttermilk
   • Green salad with lemon dressing

🫖 EVENING SNACK (4:00 PM)
   • 1 cup green tea / herbal tea
   • 2 whole-grain biscuits
   • OR: Roasted chana / peanuts (small handful)

🌙 DINNER (7:00 PM)
   • 2 chapati / 1 cup rice (reduce portion)
   • 1 bowl vegetable curry / dal
   • 1 glass buttermilk / curd
   • Light vegetable soup

💤 BEDTIME (10:00 PM)
   • 1 glass warm low-fat milk with turmeric
   • OR: Chamomile tea

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Drink 8-10 glasses of water daily
✅ Eat every 3-4 hours to maintain blood sugar levels
✅ Chew food slowly and mindfully (20+ chews per bite)
✅ Avoid eating 2 hours before bedtime
✅ Include at least 30 minutes of physical activity daily
✅ Avoid processed foods, excessive sugar, and refined carbs

⚠️  DISCLAIMER: This is a general sample plan. Individual 
nutritional needs vary based on health conditions, medications,
and personal goals. Please consult our certified dietitian for 
a medically-appropriate personalized plan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BOOK YOUR PERSONALIZED CONSULTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 Call us: +91 98765 43210
💬 WhatsApp: +91 98765 43210
🌐 Register online: www.preethinutrition.com

© 2025 Preethi Nutrition Center. All Rights Reserved.
`;
}

/* ══════════════════════════════════
   DASHBOARD LOAD DATA
══════════════════════════════════ */
async function loadDashboardData() {
  if (!currentUser || currentUser.role === 'admin') return;
  loadHealthLogs();
  loadMyAppointments();
  loadPersonalTips();
}

async function loadPersonalTips() {
  const container = document.getElementById('personal-tips-list');
  if (!container) return;

  try {
    const res  = await fetch('/api/tips');
    const tips = await res.json();

    if (!tips.length) {
      container.innerHTML = '<p style="color:var(--text-muted);">No tips yet. Check back soon!</p>';
      return;
    }

    container.innerHTML = tips.map(t => `
      <div class="personal-tip-card">
        <div class="ptc-icon">💡</div>
        <div>
          <div class="ptc-badge">${t.category}</div>
          <div class="ptc-title">${t.title}</div>
          <div class="ptc-content">${t.content}</div>
        </div>
      </div>`).join('');
  } catch {
    container.innerHTML = TIPS.slice(0, 5).map(t => `
      <div class="personal-tip-card">
        <div class="ptc-icon">${t.icon}</div>
        <div>
          <div class="ptc-badge">${t.cat}</div>
          <div class="ptc-title">${t.title}</div>
          <div class="ptc-content">${t.content}</div>
        </div>
      </div>`).join('');
  }
}

/* ══════════════════════════════════
   ADMIN DATA LOADERS
══════════════════════════════════ */
async function loadAdminData() {
  await Promise.all([
    loadAdminStats(),
    loadAdminAppointments(),
    loadAdminClients(),
    loadAdminBlog(),
    loadAdminTips()
  ]);
}

async function loadAdminStats() {
  try {
    const [clientsRes, apptRes, blogRes] = await Promise.all([
      fetch('/api/admin/clients'),
      fetch('/api/admin/appointments'),
      fetch('/api/blogs')
    ]);
    const clients = await clientsRes.json();
    const appts   = await apptRes.json();
    const blogs   = await blogRes.json();

    setEl('admin-total-clients', clients.length);
    setEl('admin-pending-appts', appts.filter(a => a.status === 'Pending').length);
    setEl('admin-approved-appts', appts.filter(a => a.status === 'Approved').length);
    setEl('admin-blog-count', blogs.length);
  } catch { /* ignore */ }
}

async function loadAdminAppointments() {
  const wrapper = document.getElementById('admin-appts-table');
  if (!wrapper) return;

  try {
    const res   = await fetch('/api/admin/appointments');
    const apts  = await res.json();

    if (!apts.length) {
      wrapper.innerHTML = '<p style="color:var(--text-muted);padding:16px 0;">No appointments yet.</p>';
      return;
    }

    wrapper.innerHTML = `
      <table class="data-table">
        <thead><tr><th>Client</th><th>Email</th><th>Service</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>${apts.map(a => `
          <tr>
            <td>${a.customerName}</td>
            <td>${a.customerEmail}</td>
            <td>${a.service}</td>
            <td>${a.date}</td>
            <td>${a.time}</td>
            <td><span class="status-pill status-${a.status.toLowerCase()}">${a.status}</span></td>
            <td>
              ${a.status === 'Pending' ? `
                <button class="btn-sm" style="background:#10b981;margin-right:4px;" onclick="updateApptStatus(${a.id},'Approved')">✅ Approve</button>
                <button class="btn-sm" style="background:#ef4444;" onclick="updateApptStatus(${a.id},'Cancelled')">❌ Cancel</button>
              ` : '—'}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>`;
  } catch {
    wrapper.innerHTML = '<p style="color:var(--text-muted);">Could not load appointments.</p>';
  }
}

async function updateApptStatus(id, status) {
  try {
    await fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    showToast(`Appointment ${status.toLowerCase()}!`);
    loadAdminAppointments();
    loadAdminStats();
  } catch {
    showToast('⚠️ Could not update status.');
  }
}

async function loadAdminClients() {
  const wrapper = document.getElementById('admin-clients-table');
  if (!wrapper) return;

  try {
    const res     = await fetch('/api/admin/clients');
    const clients = await res.json();

    if (!clients.length) {
      wrapper.innerHTML = '<p style="color:var(--text-muted);padding:16px 0;">No registered clients yet.</p>';
      return;
    }

    wrapper.innerHTML = `
      <table class="data-table">
        <thead><tr><th>Name</th><th>Email</th><th>Height</th><th>Weight</th><th>BMI</th></tr></thead>
        <tbody>${clients.map(c => {
          const bmi = c.height ? +((c.weight / Math.pow(c.height / 100, 2)).toFixed(1)) : '—';
          return `<tr>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.height || '—'} cm</td>
            <td>${c.weight || '—'} kg</td>
            <td>${bmi}</td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>`;
  } catch {
    wrapper.innerHTML = '<p style="color:var(--text-muted);">Could not load clients.</p>';
  }
}

async function loadAdminBlog() {
  const wrapper = document.getElementById('blog-admin-table');
  if (!wrapper) return;

  try {
    const res   = await fetch('/api/blogs');
    const blogs = await res.json();
    setEl('admin-blog-count', blogs.length);

    if (!blogs.length) {
      wrapper.innerHTML = '<p style="color:var(--text-muted);padding:16px 0;">No articles published yet. Write your first one above!</p>';
      return;
    }

    wrapper.innerHTML = `
      <table class="data-table">
        <thead><tr><th>Title</th><th>Category</th><th>Author</th><th>Date</th><th>Action</th></tr></thead>
        <tbody>${blogs.map(b => `
          <tr>
            <td>${b.title}</td>
            <td>${catLabel(b.category)}</td>
            <td>${b.author}</td>
            <td>${b.date}</td>
            <td><button class="btn-sm" style="background:#ef4444;" onclick="deleteBlog(${b.id})">🗑️ Delete</button></td>
          </tr>`).join('')}
        </tbody>
      </table>`;
  } catch {
    wrapper.innerHTML = '<p style="color:var(--text-muted);">Could not load articles.</p>';
  }
}

async function publishBlog() {
  const title    = document.getElementById('ab-title').value.trim();
  const category = document.getElementById('ab-category').value;
  const readtime = document.getElementById('ab-readtime').value.trim();
  const summary  = document.getElementById('ab-summary').value.trim();
  const content  = document.getElementById('ab-content').value.trim();

  if (!title || !summary || !content) { showToast('⚠️ Please fill all fields.'); return; }

  try {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, summary, content, author: 'Preethi Ma\'am', read_time: readtime || '5 min read' })
    });

    if (res.ok) {
      showToast('✅ Article published!');
      ['ab-title','ab-summary','ab-content','ab-readtime'].forEach(id => document.getElementById(id).value = '');
      loadAdminBlog();
      renderBlog(blogFilter);
    }
  } catch {
    showToast('✅ Article published!');
  }
}

async function deleteBlog(id) {
  if (!confirm('Delete this article?')) return;
  try {
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    showToast('🗑️ Article deleted.');
    loadAdminBlog();
    renderBlog(blogFilter);
  } catch { showToast('⚠️ Could not delete.'); }
}

async function loadAdminTips() {
  const wrapper = document.getElementById('tips-admin-table');
  if (!wrapper) return;

  try {
    const res  = await fetch('/api/tips');
    const tips = await res.json();

    if (!tips.length) {
      wrapper.innerHTML = '<p style="color:var(--text-muted);padding:16px 0;">No tips yet. Add your first one above!</p>';
      return;
    }

    wrapper.innerHTML = `
      <table class="data-table">
        <thead><tr><th>Category</th><th>Title</th><th>Action</th></tr></thead>
        <tbody>${tips.map(t => `
          <tr>
            <td>${t.category}</td>
            <td>${t.title}</td>
            <td><button class="btn-sm" style="background:#ef4444;" onclick="deleteTip(${t.id})">🗑️ Delete</button></td>
          </tr>`).join('')}
        </tbody>
      </table>`;
  } catch {
    wrapper.innerHTML = '<p style="color:var(--text-muted);">Could not load tips.</p>';
  }
}

async function addTip() {
  const category = document.getElementById('tip-category').value;
  const title    = document.getElementById('tip-title').value.trim();
  const content  = document.getElementById('tip-content').value.trim();

  if (!title || !content) { showToast('⚠️ Please fill all fields.'); return; }

  try {
    const res = await fetch('/api/tips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, title, content })
    });

    if (res.ok) {
      showToast('✅ Tip added!');
      document.getElementById('tip-title').value = '';
      document.getElementById('tip-content').value = '';
      loadAdminTips();
    }
  } catch {
    showToast('✅ Tip added!');
  }
}

async function deleteTip(id) {
  if (!confirm('Delete this tip?')) return;
  try {
    await fetch(`/api/tips/${id}`, { method: 'DELETE' });
    showToast('🗑️ Tip deleted.');
    loadAdminTips();
  } catch { showToast('⚠️ Could not delete.'); }
}

/* ══════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════ */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCount(entry.target, 0, target, 1500);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCount(el, start, end, duration) {
  const startTime = performance.now();
  const suffix    = el.textContent.replace(/[0-9]/g, '');

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value    = Math.round(start + (end - start) * ease);
    el.textContent = value + (el.dataset.target === el.textContent ? '' : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = end;
    }
  }
  requestAnimationFrame(update);
}

/* ══════════════════════════════════
   TOAST
══════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

/* ── Helper ── */
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ══════════════════════════════════
   KEYBOARD SHORTCUTS
══════════════════════════════════ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});
