/* ==========================================
   PREETHI NUTRITION CENTER - HOME JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initBmiCalculator();
  initBeforeAfterSlider();
  initPostsFeed();
  initVideosFeed();
  initContactForm();
  initLatestUpdates();
  loadHomeConfig();
});

/* --- Dynamic Home Content Loader --- */
async function loadHomeConfig() {
  const heroTitle = document.querySelector('.hero-title');
  const heroLead = document.querySelector('.hero-lead');
  const heroImg = document.querySelector('.hero-main-img');
  
  const expStats = document.querySelector('.hero-stats .stat-item:nth-child(1) h3');
  const expBadge = document.querySelector('.about-img-showcase .experience-badge h3');

  try {
    const response = await fetch('/api/content');
    const data = await response.json();

    if (data.success && data.data) {
      const config = data.data;

      if (config.homeHeroTitle && heroTitle) heroTitle.innerText = config.homeHeroTitle;
      if (config.homeHeroSubtitle && heroLead) heroLead.innerText = config.homeHeroSubtitle;
      if (config.homeHeroImage && heroImg) heroImg.src = config.homeHeroImage;
      
      if (config.aboutExperienceYears !== undefined) {
        const text = `${config.aboutExperienceYears}+`;
        if (expStats) expStats.innerText = text;
        if (expBadge) expBadge.innerText = text;
      }

      // Dynamic Contact details on Home page
      const loc = document.getElementById('infoLocation');
      const phone = document.getElementById('infoPhone');
      const email = document.getElementById('infoEmail');
      if (config.contactAddress && loc) loc.innerHTML = config.contactAddress;
      if (config.contactPhone && phone) phone.innerHTML = config.contactPhone;
      if (config.contactEmail && email) email.innerHTML = config.contactEmail;
    }
  } catch (error) {
    console.warn('Failed to load dynamic Home config content:', error);
  }
}

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

/* --- 3. BMI Calculator --- */
function initBmiCalculator() {
  const bmiForm = document.getElementById('bmiForm');
  const resultPanel = document.getElementById('bmiResultPanel');
  
  if (!bmiForm || !resultPanel) return;

  const placeholder = resultPanel.querySelector('.result-placeholder');
  const display = resultPanel.querySelector('.result-display');
  const scoreText = document.getElementById('bmiScoreText');
  const badge = document.getElementById('bmiCategoryBadge');
  const adviceText = document.getElementById('bmiAdviceText');
  const gaugeIndicator = document.getElementById('gaugeIndicator');

  bmiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const heightCm = parseFloat(document.getElementById('bmiHeight').value);
    
    if (isNaN(weight) || isNaN(heightCm) || heightCm <= 0) return;

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    const score = bmi.toFixed(1);

    const minBmi = 15;
    const maxBmi = 35;
    let percentage = ((bmi - minBmi) / (maxBmi - minBmi)) * 100;
    percentage = Math.min(100, Math.max(0, percentage));

    let category = '';
    let advice = '';
    let badgeColor = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      advice = 'You are in the underweight range. We suggest a weight gainer diet plan with balanced proteins and carbs.';
      badgeColor = '#60a5fa';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal Weight';
      advice = 'Awesome! You are in the healthy weight range. Keep up the active lifestyle, Zumba, and clean eating!';
      badgeColor = '#34d399';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      advice = 'You are in the overweight range. Our customized low-carb diet plan and active Zumba sessions will help you hit your goal.';
      badgeColor = '#fbbf24';
    } else {
      category = 'Obese';
      advice = 'You are in the obese range. We recommend a structured clinical consultation, targeted diets, and low-impact workouts.';
      badgeColor = '#f87171';
    }

    scoreText.innerText = score;
    badge.innerText = category;
    badge.style.background = badgeColor;
    adviceText.innerText = advice;
    
    gaugeIndicator.style.left = `${percentage}%`;

    placeholder.style.display = 'none';
    display.style.display = 'flex';
  });
}

/* --- 4. Before/After Split Image Slider --- */
function initBeforeAfterSlider() {
  const container = document.getElementById('baSliderContainer');
  const resizeWrap = document.getElementById('baResizeWrap');
  const handle = document.getElementById('baHandle');

  if (!container || !resizeWrap || !handle) return;

  let isSliding = false;

  const moveSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    
    percentage = Math.min(100, Math.max(0, percentage));

    resizeWrap.style.width = `${100 - percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  handle.addEventListener('mousedown', () => { isSliding = true; });
  window.addEventListener('mouseup', () => { isSliding = false; });
  
  window.addEventListener('mousemove', (e) => {
    if (!isSliding) return;
    moveSlider(e.clientX);
  });

  handle.addEventListener('touchstart', () => { isSliding = true; });
  window.addEventListener('touchend', () => { isSliding = false; });
  
  window.addEventListener('touchmove', (e) => {
    if (!isSliding) return;
    if (e.touches.length > 0) {
      moveSlider(e.touches[0].clientX);
    }
  });

  container.addEventListener('click', (e) => {
    if (e.target === handle || handle.contains(e.target)) return;
    moveSlider(e.clientX);
  });
}

/* --- 5. Instagram & Transformation Feed --- */
async function initPostsFeed() {
  const postsGrid = document.getElementById('postsGrid');
  const filterBtns = document.querySelectorAll('.feed-tab-btn');
  
  if (!postsGrid) return;

  let allPosts = [];

  // Offline defaults to show a beautiful page immediately if server is not running
  const defaultPosts = [
    {
      _id: 'sample1',
      type: 'instagram',
      mediaUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500&auto=format&fit=crop',
      mediaType: 'image',
      caption: 'Fuel your day with our high-protein wellness green bowl! Supercharged with vitamins and clean ingredients. #NutritionTips #PreethiWellness',
      createdAt: new Date().toISOString(),
      viewCount: 145,
      likes: [],
      comments: []
    },
    {
      _id: 'sample2',
      type: 'transformation',
      mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop',
      mediaType: 'image',
      beforeImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop',
      afterImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop&hue=90',
      clientName: 'Neha Mehta',
      clientDetails: 'Lost 12kg in 3 months',
      caption: 'Unbelievable determination! Neha stuck to her portion-controlled diet and attended 4 Zumba sessions weekly. Absolutely proud!',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      viewCount: 320,
      likes: [],
      comments: []
    },
    {
      _id: 'sample3',
      type: 'instagram',
      mediaUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500&auto=format&fit=crop',
      mediaType: 'image',
      caption: 'Energy check! High-vibe Zumba workout to burn calories and shake off the monday blues. Have you booked your slot? #ZumbaFitness',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      viewCount: 201,
      likes: [],
      comments: []
    }
  ];

  try {
    const response = await fetch('/api/posts');
    const data = await response.json();
    
    if (data.success && data.data && data.data.length > 0) {
      allPosts = data.data;
    } else {
      allPosts = defaultPosts;
    }
  } catch (error) {
    console.error('Failed to load posts from API. Using defaults.', error);
    allPosts = defaultPosts;
  }

  // Render social cards
  renderPosts(allPosts);

  // Filter tabs click handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const filterVal = e.target.getAttribute('data-filter');
      
      if (filterVal === 'all') {
        renderPosts(allPosts);
      } else {
        const filtered = allPosts.filter(post => post.type === filterVal);
        renderPosts(filtered);
      }
    });
  });

  // Helper: Render Comment List and Reply UI
  function renderComments(post, container) {
    const commentsList = container.querySelector('.comments-list');
    const formWrap = container.querySelector('.comment-form-container');
    const comments = post.comments || [];
    const loggedUser = window.PreethiAPI.getUser();
    
    let html = '';
    
    if (comments.length === 0) {
      html += '<p class="no-comments-msg" style="color: var(--text-muted); font-style: italic; margin-bottom: 8px;">No comments yet. Be the first to share your thoughts!</p>';
    } else {
      comments.forEach(comment => {
        const commentDate = new Date(comment.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        let repliesHtml = '';
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach(reply => {
            const replyDate = new Date(reply.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
            repliesHtml += `
              <div class="reply-item" style="margin-left: 20px; margin-top: 8px; padding-left: 10px; border-left: 2px solid var(--primary); font-size: 13px;">
                <div class="comment-header" style="display: flex; align-items: center; gap: 8px;">
                  <span class="comment-author" style="font-weight: 700; color: var(--primary);">${reply.userName}</span>
                  <span class="comment-date" style="font-size: 10px; color: var(--text-muted);">${replyDate}</span>
                </div>
                <p class="comment-text" style="margin-top: 2px; color: var(--text);">${reply.content}</p>
              </div>
            `;
          });
        }
        
        html += `
          <div class="comment-item" style="padding-bottom: 8px; border-bottom: 1px dashed var(--border); margin-bottom: 8px;">
            <div class="comment-header" style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="comment-author" style="font-weight: 700; color: var(--text);">${comment.userName}</span>
                <span class="comment-date" style="font-size: 10px; color: var(--text-muted);">${commentDate}</span>
              </div>
              ${loggedUser ? `
                <button class="btn-toggle-reply" data-comment-id="${comment._id}" style="font-size: 11px; font-weight: 700; color: var(--primary); cursor: pointer;"><i class="fa-solid fa-reply"></i> Reply</button>
              ` : ''}
            </div>
            <p class="comment-text" style="margin-top: 2px; color: var(--text);">${comment.content}</p>
            
            <div class="comment-replies-list">
              ${repliesHtml}
            </div>
            
            <!-- Reply Input Box -->
            <div class="reply-form-wrapper" id="replyFormWrap-${post._id}-${comment._id}" style="display: none; margin-left: 20px; margin-top: 8px;">
              <div class="reply-input-group" style="display: flex; gap: 6px;">
                <input type="text" class="reply-input-text" placeholder="Write a reply..." style="flex: 1; padding: 4px 10px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 12px; background: var(--bg); color: var(--text);">
                <button class="btn-submit-reply" data-post-id="${post._id}" data-comment-id="${comment._id}" style="padding: 4px 10px; background: var(--primary); color: white; border-radius: var(--radius-sm); font-size: 11px; font-weight: 600; cursor: pointer;">Reply</button>
              </div>
            </div>
          </div>
        `;
      });
    }
    
    commentsList.innerHTML = html;
    
    if (loggedUser) {
      formWrap.innerHTML = `
        <div class="comment-input-group" style="display: flex; gap: 8px; margin-top: 10px;">
          <input type="text" class="comment-input-text" placeholder="Add a comment..." style="flex: 1; padding: 8px 12px; border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 12px; background: var(--bg); color: var(--text);">
          <button class="btn-submit-comment" data-post-id="${post._id}" style="padding: 8px 16px; background: var(--primary); color: white; border-radius: var(--radius-md); font-size: 12px; font-weight: 600; cursor: pointer;">Post</button>
        </div>
      `;
    } else {
      formWrap.innerHTML = `
        <p style="text-align: center; color: var(--text-muted); font-size: 12px; margin-top: 10px;">
          <a href="/login" style="color: var(--primary); font-weight: 700; text-decoration: underline;">Log in</a> to write comments and replies.
        </p>
      `;
    }
  }

  // Handle Feed Interactions: Likes, Comments, Shares, and Replies
  postsGrid.addEventListener('click', async (e) => {
    const target = e.target;
    const loggedUser = window.PreethiAPI.getUser();

    // 1. LIKE SUBMISSION
    const likeBtn = target.closest('.btn-like');
    if (likeBtn) {
      const card = likeBtn.closest('.post-card');
      const postId = card.getAttribute('data-id');
      const heartIcon = likeBtn.querySelector('i');
      const countSpan = likeBtn.querySelector('.count');

      if (!loggedUser) {
        alert('Please log in to like posts.');
        window.location.href = '/login';
        return;
      }

      try {
        const res = await window.PreethiAPI.request(`/posts/${postId}/like`, { method: 'POST' });
        if (res.success) {
          if (res.liked) {
            heartIcon.className = 'fa-solid fa-heart';
            heartIcon.style.color = '#ef4444';
          } else {
            heartIcon.className = 'fa-regular fa-heart';
            heartIcon.style.color = '';
          }
          countSpan.innerText = res.count;
          
          // Update local memory
          const p = allPosts.find(x => x._id === postId);
          if (p) {
            if (res.liked) {
              if (!p.likes.includes(loggedUser.id)) p.likes.push(loggedUser.id);
            } else {
              p.likes = p.likes.filter(id => id !== loggedUser.id);
            }
          }
        }
      } catch (err) {
        console.error('Like error:', err);
      }
      return;
    }

    // 2. COMMENT PANEL TOGGLER
    const commentBtn = target.closest('.btn-comment');
    if (commentBtn) {
      const card = commentBtn.closest('.post-card');
      const postId = card.getAttribute('data-id');
      const commentsPanel = document.getElementById(`comments-${postId}`);
      
      if (commentsPanel.style.display === 'none') {
        commentsPanel.style.display = 'block';
        // Increment view count in backend on click expand
        try {
          const res = await fetch(`/api/posts/${postId}/view`, { method: 'POST' });
          const viewData = await res.json();
          if (viewData.success) {
            const viewCounter = card.querySelector('.view-counter .count');
            if (viewCounter) viewCounter.innerText = viewData.viewCount;
          }
        } catch (vErr) {
          console.error(vErr);
        }
      } else {
        commentsPanel.style.display = 'none';
      }
      return;
    }

    // 3. SHARE DROPDOWN TOGGLER
    const shareBtn = target.closest('.btn-share');
    if (shareBtn) {
      const card = shareBtn.closest('.post-card');
      const postId = card.getAttribute('data-id');
      const shareDropdown = document.getElementById(`share-${postId}`);
      
      // Close other share dropdowns
      document.querySelectorAll('.share-options-dropdown').forEach(d => {
        if (d.id !== `share-${postId}`) d.style.display = 'none';
      });

      shareDropdown.style.display = shareDropdown.style.display === 'none' ? 'flex' : 'none';
      return;
    }

    // 4. COPY LINK ACTION
    const copyLinkBtn = target.closest('.copy-link-btn');
    if (copyLinkBtn) {
      const card = copyLinkBtn.closest('.post-card');
      const postId = card.getAttribute('data-id');
      const shareDropdown = document.getElementById(`share-${postId}`);
      
      const shareUrl = `${window.location.origin}/#post-${postId}`;
      const dummy = document.createElement('input');
      document.body.appendChild(dummy);
      dummy.value = shareUrl;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      
      shareDropdown.style.display = 'none';
      alert('Post link copied to clipboard!');
      return;
    }

    // 5. OTHER SHARE OPTIONS (Click close dropdown)
    const shareOpt = target.closest('.share-opt');
    if (shareOpt) {
      const card = shareOpt.closest('.post-card');
      const postId = card.getAttribute('data-id');
      const shareDropdown = document.getElementById(`share-${postId}`);
      shareDropdown.style.display = 'none';
      return;
    }

    // 6. TOGGLE REPLY INPUT
    const toggleReplyBtn = target.closest('.btn-toggle-reply');
    if (toggleReplyBtn) {
      const card = toggleReplyBtn.closest('.post-card');
      const postId = card.getAttribute('data-id');
      const commentId = toggleReplyBtn.getAttribute('data-comment-id');
      const replyFormWrap = document.getElementById(`replyFormWrap-${postId}-${commentId}`);
      
      replyFormWrap.style.display = replyFormWrap.style.display === 'none' ? 'block' : 'none';
      return;
    }

    // 7. SUBMIT NEW COMMENT
    const submitCommentBtn = target.closest('.btn-submit-comment');
    if (submitCommentBtn) {
      const postId = submitCommentBtn.getAttribute('data-post-id');
      const commentsPanel = document.getElementById(`comments-${postId}`);
      const input = commentsPanel.querySelector('.comment-input-text');
      const content = input.value.trim();
      
      if (!content) return;

      try {
        const res = await window.PreethiAPI.request(`/posts/${postId}/comments`, {
          method: 'POST',
          body: { content }
        });
        if (res.success) {
          input.value = '';
          const post = allPosts.find(p => p._id === postId);
          if (post) {
            post.comments = res.comments;
            renderComments(post, commentsPanel);
            
            // Update comments count on main card button
            const countSpan = document.querySelector(`.post-card[data-id="${postId}"] .btn-comment .count`);
            if (countSpan) countSpan.innerText = res.comments.length;
          }
        }
      } catch (err) {
        alert(err.message || 'Failed to submit comment.');
      }
      return;
    }

    // 8. SUBMIT REPLY TO COMMENT
    const submitReplyBtn = target.closest('.btn-submit-reply');
    if (submitReplyBtn) {
      const postId = submitReplyBtn.getAttribute('data-post-id');
      const commentId = submitReplyBtn.getAttribute('data-comment-id');
      const replyWrap = document.getElementById(`replyFormWrap-${postId}-${commentId}`);
      const input = replyWrap.querySelector('.reply-input-text');
      const content = input.value.trim();
      
      if (!content) return;

      try {
        const res = await window.PreethiAPI.request(`/posts/${postId}/comments/${commentId}/replies`, {
          method: 'POST',
          body: { content }
        });
        if (res.success) {
          input.value = '';
          replyWrap.style.display = 'none';
          const post = allPosts.find(p => p._id === postId);
          if (post) {
            post.comments = res.comments;
            renderComments(post, document.getElementById(`comments-${postId}`));
          }
        }
      } catch (err) {
        alert(err.message || 'Failed to submit reply.');
      }
      return;
    }
  });

  // Close share dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.btn-share') && !e.target.closest('.share-options-dropdown')) {
      document.querySelectorAll('.share-options-dropdown').forEach(d => d.style.display = 'none');
    }
  });

  function renderPosts(posts) {
    postsGrid.innerHTML = '';

    if (posts.length === 0) {
      postsGrid.innerHTML = `
        <div class="loader-placeholder">
          <i class="fa-solid fa-folder-open"></i> No updates available in this category yet.
        </div>
      `;
      return;
    }

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = `post-card ${post.type}`;
      card.setAttribute('data-id', post._id);
      
      const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      let mediaHtml = '';

      if (post.type === 'transformation') {
        mediaHtml = `
          <div class="post-media-container">
            <div class="tf-split tf-before">
              <img src="${post.beforeImageUrl || post.mediaUrl}" alt="Before">
              <span class="tf-label tf-before-label">Before</span>
            </div>
            <div class="tf-split tf-after">
              <img src="${post.afterImageUrl || post.mediaUrl}" alt="After">
              <span class="tf-label tf-after-label">After</span>
            </div>
            <div class="post-type-badge">
              <i class="fa-solid fa-arrows-left-right"></i>
            </div>
          </div>
        `;
      } else {
        if (post.mediaType === 'video') {
          mediaHtml = `
            <div class="post-media-container">
              <video src="${post.mediaUrl}" controls loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
              <div class="post-type-badge">
                <i class="fa-solid fa-video"></i>
              </div>
            </div>
          `;
        } else {
          mediaHtml = `
            <div class="post-media-container">
              <img src="${post.mediaUrl}" alt="Instagram Post">
              <div class="post-type-badge">
                <i class="fa-solid fa-image"></i>
              </div>
            </div>
          `;
        }
      }

      // Calculate likes state for logged user
      const loggedUser = window.PreethiAPI.getUser();
      const isLiked = loggedUser && post.likes && post.likes.includes(loggedUser.id);
      const heartClass = isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      const heartStyle = isLiked ? 'style="color: #ef4444;"' : '';

      const views = post.viewCount !== undefined ? post.viewCount : Math.floor(Math.random() * 150) + 20;
      const likesCount = post.likes ? post.likes.length : 0;
      const commentsCount = post.comments ? post.comments.length : 0;

      const shareMsg = encodeURIComponent(`Check out this update from Preethi Nutrition Center: ${post.caption || ''}`);
      const shareUrl = encodeURIComponent(`${window.location.origin}/#post-${post._id}`);

      card.innerHTML = `
        ${mediaHtml}
        <div class="post-content" style="position: relative;">
          ${post.type === 'transformation' ? `
            <span class="client-detail-badge">${post.clientName || 'Client'} | ${post.clientDetails || 'Transform'}</span>
          ` : ''}
          <p class="post-caption">${post.caption || ''}</p>
          <div class="post-actions" style="position: relative; display: flex; align-items: center; justify-content: space-between; margin-top: 15px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <button class="action-btn btn-like" aria-label="Like post">
                <i class="${heartClass}" ${heartStyle}></i> <span class="count">${likesCount}</span>
              </button>
              <button class="action-btn btn-comment" data-id="${post._id}" aria-label="Comment on post">
                <i class="fa-regular fa-comment"></i> <span class="count">${commentsCount}</span>
              </button>
              <button class="action-btn btn-share" aria-label="Share post">
                <i class="fa-regular fa-paper-plane"></i>
              </button>
            </div>
            
            <div class="view-counter" style="font-size: 12px; color: var(--text-muted);">
              <i class="fa-regular fa-eye"></i> <span class="count">${views}</span> views
            </div>
          </div>
          <div class="post-date"><i class="fa-regular fa-clock"></i> ${formattedDate}</div>
          
          <!-- Share options dropdown -->
          <div class="share-options-dropdown" id="share-${post._id}" style="display: none; position: absolute; bottom: 55px; left: 15px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 12px; box-shadow: var(--shadow-lg); z-index: 100; flex-direction: column; gap: 10px; width: 180px;">
            <a href="https://api.whatsapp.com/send?text=${shareMsg}%20${shareUrl}" class="share-opt whatsapp-share-btn" target="_blank" style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: #25d366; font-size: 13px;"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" class="share-opt facebook-share-btn" target="_blank" style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: #1877f2; font-size: 13px;"><i class="fa-brands fa-facebook"></i> Facebook</a>
            <button class="share-opt copy-link-btn" style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: var(--text); text-align: left; width: 100%; cursor: pointer; font-size: 13px;"><i class="fa-regular fa-copy"></i> Copy link</button>
          </div>
        </div>

        <!-- Comments Drawer -->
        <div class="comments-section" id="comments-${post._id}" style="display: none; border-top: 1px solid var(--border); padding: 15px; background: hsla(var(--hue-primary), 20%, 96%, 0.4); border-bottom-left-radius: var(--radius-md); border-bottom-right-radius: var(--radius-md);">
          <div class="comments-list" id="commentsList-${post._id}" style="max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-right: 5px;">
            <!-- Render comments list -->
          </div>
          <div class="comment-form-container">
            <!-- Render comment inputs dynamically -->
          </div>
        </div>
      `;

      postsGrid.appendChild(card);
      
      // Initialize comments for this card
      renderComments(post, card.querySelector('.comments-section'));
    });
  }
}

/* --- 6. Latest Videos Feed --- */
async function initVideosFeed() {
  const videosGrid = document.getElementById('videosGrid');
  if (!videosGrid) return;

  // Let's check if there are actual video uploads in the database
  try {
    const response = await fetch('/api/posts');
    const data = await response.json();
    
    if (data.success && data.data) {
      const dbVideos = data.data.filter(post => post.mediaType === 'video');
      
      if (dbVideos.length > 0) {
        // If there are real uploaded videos, we display them
        videosGrid.innerHTML = '';
        
        dbVideos.forEach(video => {
          const card = document.createElement('div');
          card.className = 'video-card';
          
          card.innerHTML = `
            <div class="video-wrapper">
              <video src="${video.mediaUrl}" controls loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
            </div>
            <div class="video-details">
              <h4>${video.clientName || 'Wellness Tip'}</h4>
              <p>${video.caption || 'Watch our latest tips and techniques.'}</p>
            </div>
          `;
          
          videosGrid.appendChild(card);
        });
      }
    }
  } catch (error) {
    console.log('Using default sample videos in markup.', error);
  }
}

/* --- 7. Contact Form Submission with Validation --- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const successMsg = document.getElementById('contactSuccessMsg');

  if (!contactForm || !successMsg) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhoneInput').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // 1. Validation
    if (!name || !email || !phone || !message) {
      alert('Please fill out all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number (10 to 15 digits, optionally starting with +).');
      return;
    }

    // 2. Submit to API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, message })
      });
      const data = await response.json();
      if (data.success) {
        contactForm.style.display = 'none';
        successMsg.style.display = 'block';
        contactForm.reset();
      } else {
        alert(data.message || 'Failed to submit query.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Failed to submit query.');
    }
  });
}

/* ==============================================
   LATEST UPDATES FEED — Full Implementation
   ============================================== */

function initLatestUpdates() {
  const POSTS_PER_PAGE = 12;
  let allPosts = [];
  let filteredPosts = [];
  let currentPage = 1;
  let currentCategory = 'all';
  let activeShareDropdown = null;

  const grid        = document.getElementById('postsGridNew');
  const loading     = document.getElementById('postsLoading');
  const emptyState  = document.getElementById('postsEmpty');
  const loadMoreWrap= document.getElementById('loadMoreWrap');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const catFilter   = document.getElementById('categoryFilter');

  if (!grid) return;

  // Category label map
  const catLabels = {
    'all':                'All Posts',
    'weight-loss':        'Weight Loss',
    'weight-gain':        'Weight Gain',
    'nutrition-tips':     'Nutrition Tips',
    'herbalife-products': 'Herbalife',
    'success-stories':    'Success Stories',
    'zumba-classes':      'Zumba'
  };

  function catLabel(cat) { return catLabels[cat] || cat; }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch(e) { return iso; }
  }

  // ── Fetch posts ────────────────────────────
  async function fetchPosts() {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      allPosts = data.data || [];
    } catch(e) {
      allPosts = [];
    }
    filteredPosts = [...allPosts];
    renderFeaturedSlider();
    renderPosts(false);
  }

  // ── Featured Slider ────────────────────────
  function renderFeaturedSlider() {
    const featured = allPosts.filter(p => p.featured);
    const wrap  = document.getElementById('featuredSliderWrap');
    const track = document.getElementById('sliderTrack');
    const dotsEl= document.getElementById('sliderDots');
    if (!wrap || !track || featured.length === 0) return;

    wrap.style.display = 'block';
    let currentSlide = 0;
    const visibleCount = window.innerWidth > 1024 ? 3 : window.innerWidth > 640 ? 2 : 1;
    const cardWidth = 100 / visibleCount;

    track.innerHTML = featured.map(p => {
      // For video posts: show thumbnail image or video preview with play icon overlay
      let media;
      if (p.mediaType === 'video') {
        const mediaPreview = p.mediaThumbnail
          ? `<img src="${p.mediaThumbnail}" alt="${p.title || ''}" loading="lazy">`
          : `<video src="${p.mediaUrl}" preload="metadata" muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>`;
        media = `
          ${mediaPreview}
          <div class="sc-vid-overlay">
            <div class="sc-play-btn"><i class="fa-solid fa-play"></i></div>
            <span class="sc-vid-badge"><i class="fa-solid fa-video"></i> VIDEO</span>
          </div>`;
      } else {
        const src = p.mediaUrl || p.beforeImageUrl || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=500';
        media = `<img src="${src}" alt="${p.title || ''}" loading="lazy">`;
      }
      return `
        <div class="slider-card" data-id="${p._id}">
          <div class="slider-card-media">
            ${media}
            <span class="slider-card-badge">${catLabel(p.category)}</span>
            <span class="slider-card-featured-icon"><i class="fa-solid fa-star"></i></span>
          </div>
          <div class="slider-card-body">
            <p class="slider-card-title">${p.title || p.caption.substring(0,50)}</p>
            <p class="slider-card-caption">${p.caption}</p>
            <div class="slider-card-meta">
              <span><i class="fa-solid fa-eye"></i> ${p.viewCount || 0}</span>
              <span><i class="fa-solid fa-heart"></i> ${(p.likes || []).length}</span>
              <span><i class="fa-regular fa-calendar"></i> ${formatDate(p.createdAt)}</span>
            </div>
          </div>
        </div>`;
    }).join('');

    // Dots
    const totalSlides = Math.max(0, featured.length - visibleCount + 1);
    dotsEl.innerHTML = Array.from({length: totalSlides}, (_, i) =>
      `<button class="slider-dot${i===0?' active':''}" data-index="${i}"></button>`
    ).join('');

    function goToSlide(n) {
      currentSlide = Math.max(0, Math.min(n, totalSlides - 1));
      const pct = currentSlide * (cardWidth + (20 / track.parentElement.offsetWidth * 100));
      track.style.transform = `translateX(-${pct}%)`;
      dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    document.getElementById('sliderPrev').onclick = () => goToSlide(currentSlide - 1);
    document.getElementById('sliderNext').onclick = () => goToSlide(currentSlide + 1);
    dotsEl.onclick = e => {
      if (e.target.classList.contains('slider-dot')) goToSlide(+e.target.dataset.index);
    };

    // Click slider card → open modal
    track.addEventListener('click', e => {
      const card = e.target.closest('.slider-card');
      if (card) openModal(card.dataset.id);
    });

    // Auto-advance
    let autoSlide = setInterval(() => goToSlide((currentSlide + 1) % (totalSlides || 1)), 4000);
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => { autoSlide = setInterval(() => goToSlide((currentSlide + 1) % (totalSlides || 1)), 4000); });
  }

  // ── Category Filter ────────────────────────
  if (catFilter) {
    catFilter.addEventListener('click', e => {
      const pill = e.target.closest('.cat-pill');
      if (!pill) return;
      catFilter.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.cat;
      filteredPosts = currentCategory === 'all'
        ? [...allPosts]
        : allPosts.filter(p => p.category === currentCategory);
      currentPage = 1;
      renderPosts(false);
    });
  }

  // ── Render Post Cards ──────────────────────
  function renderPosts(append) {
    const start = append ? (currentPage - 1) * POSTS_PER_PAGE : 0;
    const end   = currentPage * POSTS_PER_PAGE;
    const page  = filteredPosts.slice(start, end);

    if (loading) loading.style.display = 'none';

    if (!append) {
      // Remove existing cards only
      grid.querySelectorAll('.post-card-new').forEach(c => c.remove());
    }

    if (filteredPosts.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (loadMoreWrap) loadMoreWrap.style.display = 'none';
      return;
    }
    if (emptyState) emptyState.style.display = 'none';

    page.forEach(post => {
      const card = buildPostCard(post);
      grid.appendChild(card);
    });

    // Load more visibility
    if (loadMoreWrap) {
      loadMoreWrap.style.display = filteredPosts.length > end ? 'block' : 'none';
    }
  }

  // ── Build a Post Card ──────────────────────
  function buildPostCard(post) {
    const card = document.createElement('article');
    card.className = 'post-card-new';
    card.dataset.id = post._id;

    let mediaHtml = '';

    if (post.type === 'transformation') {
      // ── Before / After split card
      const before = post.beforeImageUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500';
      const after  = post.afterImageUrl  || 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=500';
      mediaHtml = `
        <div class="post-card-media" data-action="open-modal">
          <div class="before-after-grid">
            <div class="before-after-side">
              <img src="${before}" alt="Before" loading="lazy">
              <span class="ba-label">Before</span>
            </div>
            <div class="before-after-side">
              <img src="${after}" alt="After" loading="lazy">
              <span class="ba-label">After</span>
            </div>
          </div>
          <span class="post-card-cat-badge">${catLabel(post.category)}</span>
        </div>`;

    } else if (post.mediaType === 'video') {
      // ── Video card: show thumbnail or video preview + play button overlay
      // On click: swap thumbnail for actual <video> element with controls
      const mediaPreview = post.mediaThumbnail
        ? `<img class="video-thumb" src="${post.mediaThumbnail}" alt="${post.title || 'Video'}" loading="lazy">`
        : `<video class="video-thumb" src="${post.mediaUrl}" preload="metadata" muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>`;
      mediaHtml = `
        <div class="post-card-media post-card-video" data-action="play-video" data-src="${post.mediaUrl}">
          ${mediaPreview}
          <div class="video-overlay">
            <div class="video-play-icon">
              <i class="fa-solid fa-play"></i>
            </div>
          </div>
          <span class="post-card-cat-badge">${catLabel(post.category)}</span>
          <span class="video-type-badge"><i class="fa-solid fa-video"></i> VIDEO</span>
        </div>`;

    } else {
      // ── Standard image card
      const img = post.mediaUrl || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=700';
      mediaHtml = `
        <div class="post-card-media" data-action="open-modal">
          <img src="${img}" alt="${post.title || ''}" loading="lazy">
          <span class="post-card-cat-badge">${catLabel(post.category)}</span>
        </div>`;
    }

    const likedKey = `liked_${post._id}`;
    const isLiked = localStorage.getItem(likedKey) === '1';
    const likeCount = (post.likes || []).length + (isLiked ? 0 : 0);

    const pageUrl = encodeURIComponent(window.location.href + '#latestUpdates');
    const shareText = encodeURIComponent((post.title || post.caption).substring(0, 120) + ' | Preethi Nutrition Center');
    const waUrl = `https://wa.me/?text=${shareText}%20${pageUrl}`;
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;

    card.innerHTML = `
      ${mediaHtml}
      <div class="post-card-body">
        <h3 class="post-card-title">${post.title || catLabel(post.category)}</h3>
        <p class="post-card-caption">${post.caption}</p>
        <span class="post-card-date"><i class="fa-regular fa-calendar"></i> ${formatDate(post.createdAt)}</span>
      </div>
      <div class="post-card-footer">
        <div class="post-stats">
          <span><i class="fa-solid fa-eye"></i> <span class="view-count-val">${post.viewCount || 0}</span></span>
          <button class="post-like-btn${isLiked ? ' liked' : ''}" data-action="like">
            <i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i>
            <span class="like-count-val">${likeCount}</span>
          </button>
        </div>
        <div class="post-actions">
          <div class="post-share-wrap">
            <button class="post-share-btn" data-action="share">
              <i class="fa-solid fa-share-nodes"></i> Share
            </button>
            <div class="share-dropdown" id="share-dd-${post._id}">
              <a href="${waUrl}" target="_blank" class="share-option wa"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
              <a href="${fbUrl}" target="_blank" class="share-option fb"><i class="fa-brands fa-facebook"></i> Facebook</a>
              <span class="share-option ig" data-action="copy-link"><i class="fa-brands fa-instagram"></i> Copy Link</span>
            </div>
          </div>
          <button class="post-view-btn" data-action="open-modal">
            <i class="fa-solid fa-eye"></i> View
          </button>
        </div>
      </div>`;

    // Event delegation inside the card
    card.addEventListener('click', e => {
      const actionEl = e.target.closest('[data-action]');
      const action = actionEl?.dataset.action;
      if (!action) return;

      if (action === 'open-modal') {
        openModal(post._id);
        incrementView(post, card);

      } else if (action === 'play-video') {
        // Replace thumbnail + overlay with actual <video> player inline
        const mediaDiv = card.querySelector('.post-card-video');
        if (!mediaDiv) return;

        const videoSrc = mediaDiv.dataset.src;
        const catBadge = mediaDiv.querySelector('.post-card-cat-badge')?.outerHTML || '';

        // Build the real video element
        mediaDiv.innerHTML = `
          <video
            src="${videoSrc}"
            controls
            autoplay
            playsinline
            style="width:100%;height:100%;object-fit:cover;display:block;background:#000;"
          ></video>
          ${catBadge}`;

        // Remove the play-video action so clicking again won't re-trigger
        mediaDiv.removeAttribute('data-action');
        mediaDiv.classList.remove('post-card-video');

        // Auto-pause other videos on the page
        document.querySelectorAll('.posts-grid video').forEach(v => {
          if (v !== mediaDiv.querySelector('video')) v.pause();
        });

        incrementView(post, card);

      } else if (action === 'like') {
        toggleLike(post, card);

      } else if (action === 'share') {
        e.stopPropagation();
        const dd = card.querySelector(`#share-dd-${post._id}`);
        if (activeShareDropdown && activeShareDropdown !== dd) activeShareDropdown.classList.remove('open');
        dd.classList.toggle('open');
        activeShareDropdown = dd.classList.contains('open') ? dd : null;

      } else if (action === 'copy-link') {
        navigator.clipboard?.writeText(window.location.href + '#latestUpdates').then(() => alert('Link copied!'));
        card.querySelector(`#share-dd-${post._id}`)?.classList.remove('open');
      }
    });

    return card;
  }

  // ── Like Toggle ────────────────────────────
  async function toggleLike(post, card) {
    const key = `liked_${post._id}`;
    const wasLiked = localStorage.getItem(key) === '1';
    const btn = card.querySelector('.post-like-btn');
    const countEl = card.querySelector('.like-count-val');
    const icon = btn.querySelector('i');
    const current = parseInt(countEl.textContent) || 0;

    // Optimistic update
    if (wasLiked) {
      localStorage.removeItem(key);
      btn.classList.remove('liked');
      icon.className = 'fa-regular fa-heart';
      countEl.textContent = Math.max(0, current - 1);
    } else {
      localStorage.setItem(key, '1');
      btn.classList.add('liked');
      icon.className = 'fa-solid fa-heart';
      countEl.textContent = current + 1;
    }

    try { await fetch(`/api/posts/${post._id}/like`, { method: 'POST' }); } catch(e) {}
  }

  // ── Increment View ─────────────────────────
  async function incrementView(post, card) {
    const key = `viewed_${post._id}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    const el = card.querySelector('.view-count-val');
    if (el) el.textContent = parseInt(el.textContent || 0) + 1;
    try { await fetch(`/api/posts/${post._id}/view`, { method: 'POST' }); } catch(e) {}
  }

  // ── Post Detail Modal ──────────────────────
  function openModal(postId) {
    const post = allPosts.find(p => p._id === postId);
    if (!post) return;

    const overlay   = document.getElementById('postModalOverlay');
    const mediaEl   = document.getElementById('postModalMedia');
    const catEl     = document.getElementById('postModalCat');
    const dateEl    = document.getElementById('postModalDate');
    const titleEl   = document.getElementById('postModalTitle');
    const captionEl = document.getElementById('postModalCaption');
    const viewsEl   = document.getElementById('postModalViews');
    const likesEl   = document.getElementById('postModalLikes');
    const waEl      = document.getElementById('modalShareWA');
    const fbEl      = document.getElementById('modalShareFB');

    if (!overlay) return;

    // Media
    if (post.type === 'transformation') {
      mediaEl.innerHTML = `<div style="display:grid;grid-template-columns:1fr 1fr;height:300px;">
        <div style="position:relative;overflow:hidden;"><img src="${post.beforeImageUrl}" style="width:100%;height:100%;object-fit:cover;"><span style="position:absolute;bottom:8px;left:8px;background:rgba(0,0,0,0.5);color:#fff;padding:3px 10px;border-radius:50px;font-size:0.7rem;font-weight:700;">BEFORE</span></div>
        <div style="position:relative;overflow:hidden;"><img src="${post.afterImageUrl}" style="width:100%;height:100%;object-fit:cover;"><span style="position:absolute;bottom:8px;left:8px;background:rgba(0,0,0,0.5);color:#fff;padding:3px 10px;border-radius:50px;font-size:0.7rem;font-weight:700;">AFTER</span></div>
      </div>`;
    } else if (post.mediaType === 'video') {
      mediaEl.innerHTML = `<video src="${post.mediaUrl}" controls autoplay style="width:100%;max-height:340px;object-fit:cover;"></video>`;
    } else {
      mediaEl.innerHTML = `<img src="${post.mediaUrl}" alt="${post.title || ''}" style="width:100%;max-height:340px;object-fit:cover;">`;
    }

    catEl.textContent     = catLabel(post.category);
    dateEl.textContent    = formatDate(post.createdAt);
    titleEl.textContent   = post.title || catLabel(post.category);
    captionEl.textContent = post.caption;
    viewsEl.textContent   = post.viewCount || 0;
    likesEl.textContent   = (post.likes || []).length;

    const pageUrl = encodeURIComponent(window.location.href);
    const txt     = encodeURIComponent((post.title || post.caption).substring(0, 120));
    if (waEl) waEl.href = `https://wa.me/?text=${txt}%20${pageUrl}`;
    if (fbEl) fbEl.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = document.getElementById('postModalOverlay');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
    const vid = overlay?.querySelector('video');
    if (vid) vid.pause();
  }

  const closeBtn = document.getElementById('postModalClose');
  if (closeBtn) closeBtn.onclick = closeModal;
  const overlay = document.getElementById('postModalOverlay');
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── Load More ──────────────────────────────
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentPage++;
      renderPosts(true);
    });
  }

  // ── Close share dropdowns on outside click ─
  document.addEventListener('click', () => {
    if (activeShareDropdown) {
      activeShareDropdown.classList.remove('open');
      activeShareDropdown = null;
    }
  });

  // ── Start ─────────────────────────────────
  fetchPosts();
}
