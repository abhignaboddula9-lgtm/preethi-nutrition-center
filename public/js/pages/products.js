/* ==========================================
   PREETHI NUTRITION CENTER - PRODUCTS JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initProductCatalog();
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

/* --- 3. Dynamic Product Catalog --- */
async function initProductCatalog() {
  const productsGrid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('productSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!productsGrid) return;

  let allProducts = [];

  // High-fidelity fallback products in case database is empty or offline
  const defaultProducts = [
    {
      _id: 'hl1',
      name: 'Formula 1 Nutritional Shake Mix',
      imageUrl: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=400&auto=format&fit=crop',
      details: 'A delicious and healthy meal replacement shake that provides an excellent balance of high-quality protein, essential micronutrients, and added botanicals.',
      buyLink: 'https://www.herbalife.com',
      price: 1850,
      category: 'shakes'
    },
    {
      _id: 'hl2',
      name: 'Personalized Protein Powder (Formula 3)',
      imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=400&auto=format&fit=crop',
      details: 'A convenient way to increase your protein consumption, which helps maintain lean muscle mass and keeps you feeling full longer.',
      buyLink: 'https://www.herbalife.com',
      price: 1250,
      category: 'supplements'
    },
    {
      _id: 'hl3',
      name: 'Herbal Aloe Concentrate',
      imageUrl: 'https://images.unsplash.com/photo-1563483783225-b441a1347065?q=80&w=400&auto=format&fit=crop',
      details: 'Soothes the stomach and supports nutrient absorption and healthy digestion. Contains premium quality aloe vera extracts.',
      buyLink: 'https://www.herbalife.com',
      price: 1980,
      category: 'supplements'
    },
    {
      _id: 'hl4',
      name: 'Afresh Energy Drink Mix',
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&auto=format&fit=crop',
      details: 'Formulated with Orange Pekoe extract and green tea extracts. Energy-boosting beverage that rejuvenates mind and body.',
      buyLink: 'https://www.herbalife.com',
      price: 720,
      category: 'energy'
    },
    {
      _id: 'hl5',
      name: 'Cell Activator Supplement',
      imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=400&auto=format&fit=crop',
      details: 'Helps cells absorb nutrients more effectively and supports cellular energy production. Boosts vitality and metabolic speed.',
      buyLink: 'https://www.herbalife.com',
      price: 1450,
      category: 'supplements'
    },
    {
      _id: 'hl6',
      name: 'Herbalife24 Rebuild Strength',
      imageUrl: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=400&auto=format&fit=crop',
      details: 'Post-workout recovery shake. Contains 24g of whey and casein proteins to support lean muscle growth and rapid repair.',
      buyLink: 'https://www.herbalife.com',
      price: 2950,
      category: 'shakes'
    }
  ];

  // Try to load from database
  try {
    const response = await fetch('/api/products');
    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      // Map category defaults just in case database products don't specify them
      allProducts = data.data.map(p => ({
        ...p,
        category: p.category || guessCategory(p.name)
      }));
    } else {
      allProducts = defaultProducts;
    }
  } catch (error) {
    console.log('Failed to fetch products from database. Loading fallbacks.', error);
    allProducts = defaultProducts;
  }

  // Initial Render
  renderProducts(allProducts);

  // Setup Search Input Event Listener
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterAndSearchProducts();
    });
  }

  // Setup Category Filters Event Listener
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      filterAndSearchProducts();
    });
  });

  function guessCategory(name) {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('shake') || lowercaseName.includes('rebuild')) return 'shakes';
    if (lowercaseName.includes('afresh') || lowercaseName.includes('energy') || lowercaseName.includes('drink')) return 'energy';
    return 'supplements';
  }

  function filterAndSearchProducts() {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = allProducts.filter(product => {
      const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery) || 
                            product.details.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    renderProducts(filtered);
  }

  function renderProducts(products) {
    productsGrid.innerHTML = '';

    if (products.length === 0) {
      productsGrid.innerHTML = `
        <div class="loader-placeholder">
          <i class="fa-solid fa-face-frown"></i> No matching products found in this category.
        </div>
      `;
      return;
    }

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      // Format price nicely
      const priceDisplay = product.price ? `₹${product.price}` : 'Consult Price';
      const categoryLabel = product.category ? product.category.toUpperCase() : 'NUTRITION';

      card.innerHTML = `
        <div class="product-image-container">
          <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-category">${categoryLabel}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-details">${product.details}</p>
          <div class="product-footer">
            <span class="product-price">${priceDisplay}</span>
            <a href="${product.buyLink}" target="_blank" rel="noopener noreferrer" class="btn-buy">
              Buy Now <i class="fa-solid fa-up-right-from-square"></i>
            </a>
          </div>
        </div>
      `;

      productsGrid.appendChild(card);
    });
  }
}
