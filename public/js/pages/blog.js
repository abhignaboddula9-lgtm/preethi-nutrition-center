import { apiRequest } from '../api.js';

let allBlogs = [];

async function loadBlogs(category = '') {
  const container = document.getElementById('blogs-grid-container');
  if (!container) return;

  try {
    const url = category ? `/blogs?category=${category}` : '/blogs';
    const blogs = await apiRequest(url);
    allBlogs = blogs;

    if (!blogs || blogs.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">
          <p>No articles found in this category.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = blogs.map(blog => `
      <div class="blog-card">
        <div class="blog-info">
          <div class="blog-meta">
            <span class="blog-category">${blog.category.replace('-', ' ')}</span>
            <span>${blog.readTime || '5 min read'}</span>
          </div>
          <h3 class="blog-title">${blog.title}</h3>
          <p class="blog-summary">${blog.summary}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; color:var(--text-light); margin-bottom:16px;">
            <span>By ${blog.author}</span>
            <span>${new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          <button class="blog-read-more" onclick="openBlogModal('${blog._id}')">Read Full Article &rarr;</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">
        <p>Could not load blogs. Check database connection status.</p>
      </div>
    `;
  }
}

// Global Category Filter Trigger
window.filterCategory = function(cat) {
  // Update active state in UI button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(`'${cat}'`)) {
      btn.classList.add('active');
    }
  });
  loadBlogs(cat);
};

// Open Blog Detail Modal
window.openBlogModal = function(id) {
  const blog = allBlogs.find(b => b._id === id);
  if (!blog) return;

  const modal = document.getElementById('blog-detail-modal');
  const body = document.getElementById('blog-modal-body');

  if (modal && body) {
    body.innerHTML = `
      <div style="font-size: 0.85rem; font-weight:700; color:var(--secondary); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px;">
        ${blog.category.replace('-', ' ')}
      </div>
      <h2 style="font-size: 2.2rem; margin-bottom: 16px; line-height: 1.3;">${blog.title}</h2>
      <div style="display:flex; gap: 20px; color:var(--text-muted); font-size: 0.85rem; padding-bottom: 20px; border-bottom: 1px solid var(--border); margin-bottom: 30px; font-weight:600;">
        <span>👤 Author: ${blog.author}</span>
        <span>⏱️ Read Time: ${blog.readTime}</span>
        <span>📅 Published: ${new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div style="font-size: 1.1rem; line-height: 1.8; color: var(--text); white-space: pre-wrap;">
        ${blog.content}
      </div>
    `;
    modal.style.display = 'flex';
  }
};

// Close Blog Detail Modal
window.closeBlogModal = function(e) {
  const modal = document.getElementById('blog-detail-modal');
  if (modal) {
    modal.style.display = 'none';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadBlogs();
});
