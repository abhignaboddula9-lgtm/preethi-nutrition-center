# 🌸 Preethi Nutrition Center

A premium **Pink & Lavender** wellness website for Preethi Nutrition Center — featuring diet plans, Zumba classes, success stories, blog, and a full client + admin portal.

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend (Static) | HTML5, CSS3, Vanilla JavaScript |
| Frontend (React App) | React 18 + Vite |
| Backend (API) | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Static Server | Python (`serve.py`) |
| Auth | JWT + bcryptjs |

---

## 🎨 Design Theme

- **Primary Pink:** `#E75480`
- **Soft Lavender:** `#C8A2C8`
- **Light Background:** `#FFF8FC`
- **Dark Text:** `#2D2D2D`
- **White:** `#FFFFFF`

---

## 📁 Project Structure

```
preethi-nutrition-center/
│
├── public/                  # Static HTML site
│   ├── index.html           # Home page
│   ├── about.html
│   ├── services.html
│   ├── diet.html
│   ├── zumba.html
│   ├── blog.html
│   ├── contact.html
│   ├── login.html
│   ├── admin.html
│   ├── dashboard.html
│   ├── css/
│   │   ├── style.css        # Global styles & variables
│   │   └── pages/           # Per-page stylesheets
│   ├── js/
│   │   ├── main.js          # Global navbar & footer injector
│   │   └── pages/           # Per-page scripts
│   └── uploads/             # Logo & uploaded images
│
├── src/                     # React App (via Vite)
│   ├── App.jsx              # Root component + routing + auth
│   ├── index.css            # Global design tokens
│   ├── main.jsx
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky pink navbar
│   │   └── Footer.jsx       # Pink-lavender gradient footer
│   └── pages/               # Page components
│       ├── Home.jsx
│       ├── AboutUs.jsx
│       ├── Services.jsx
│       ├── DietPlans.jsx
│       ├── ZumbaClasses.jsx
│       ├── SuccessStories.jsx
│       ├── Blog.jsx
│       ├── Contact.jsx
│       ├── customer/
│       │   └── CustomerDashboard.jsx
│       └── admin/
│           └── AdminDashboard.jsx
│
├── routes/                  # Express API routes
├── models/                  # Mongoose models
├── middleware/              # Auth middleware
├── seed/                    # DB seed scripts
│
├── serve.py                 # Python static server (port 5000)
├── server.js                # Express API server
├── app.py                   # Flask alternative server
├── package.json
├── vite.config.js
├── .env.example
└── .gitignore
```

---

## 🚀 Running Locally

### Static Site (Python Server)
```bash
python serve.py
# Open: http://localhost:5000
```

### React App (Vite Dev Server)
```bash
npm install
npm run dev
# Open: http://localhost:5173
```

### Express API Server
```bash
# Copy .env.example → .env and fill in MongoDB URI
cp .env.example .env
npm run seed        # seed admin + sample data
npm start           # or: npm run dev
```

---

## 🔐 Default Login

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin` | `admin` |
| Customer | Register via the portal | — |

---

## 📄 Pages

| Page | Route |
|------|-------|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Diet Plans | `/diet` |
| Zumba | `/zumba` |
| Success Stories | `/success` |
| Blog | `/blog` |
| Contact | `/contact` |
| Login | `/login` |
| Admin Dashboard | `/admin` |
| Customer Dashboard | `/dashboard` |

---

## ✅ Features

- 🌸 Premium Pink & Lavender luxury design
- 📱 Fully responsive (mobile-first)
- 🔒 JWT-based authentication
- 👤 Customer dashboard (BMI tracker, health logs)
- 🛡️ Admin dashboard (manage customers, blogs, success stories)
- 💪 Services: Weight Loss, Weight Gain, Zumba, Diet Plans
- 📝 Blog with rich content
- 📞 Contact form
- 🍃 Herbalife products section
