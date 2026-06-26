require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Mongoose Configuration
// Disable query buffering globally so we do not hide connection dropouts or failure hangs
mongoose.set('bufferCommands', false);

// Connection event logging
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection established successfully.');
  console.log('Database Name:', mongoose.connection.name);
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error occurred:', err.stack || err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose connection disconnected!');
});

mongoose.connection.on('reconnected', () => {
  console.log('Mongoose connection reestablished.');
});

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files - Multi-Page HTML App
const publicPath = path.join(__dirname, 'public');

// Serve public folder (HTML pages, CSS, JS, images)
// HTML files get no-cache headers to prevent browser serving stale old pages
app.use(express.static(publicPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));
// Serve uploads folder
app.use('/uploads', express.static(uploadsDir));



// Admin Account Seeding function
async function seedAdmin() {
  try {
    // Dynamically require User model so server doesn't crash on boot if the file is being created
    const User = require('./models/User');
    const adminEmails = [
      (process.env.DEFAULT_ADMIN_EMAIL || 'admin@preethinutrition.com').toLowerCase(),
      'preethiherbalife@gmail.com'
    ];
    
    for (const email of adminEmails) {
      const adminExists = await User.findOne({ email });
      const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      if (!adminExists) {
        await User.create({
          name: email === 'preethiherbalife@gmail.com' ? "Preethi Ma'am" : (process.env.DEFAULT_ADMIN_NAME || 'Admin Preethi'),
          email: email,
          password: hashedPassword,
          role: 'admin',
          phone: '9293604899'
        });
        console.log(`Default admin account seeded successfully (${email}).`);
      } else {
        adminExists.password = hashedPassword;
        adminExists.role = 'admin';
        await adminExists.save();
        console.log(`Admin account updated successfully with password (${email}).`);
      }
    }
  } catch (error) {
    console.error('Error seeding default admin accounts:', error);
  }
}

// Frontend Clean Page Routes Removed (Now handled by wildcard router)

// Database connection status check middleware for all API requests
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database connection is currently offline. Please ensure MongoDB Atlas IP Whitelisting is set to 0.0.0.0/0.'
    });
  }
  next();
});

// Backend API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/products', require('./routes/products'));
app.use('/api/success', require('./routes/success'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/content', require('./routes/content'));
app.use('/api/about', require('./routes/content'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/appointments', require('./routes/appointments'));

// Wildcard route - clean URL routing for multi-page HTML app
// Maps /about -> public/about.html, /login -> public/login.html, etc.
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
    return next();
  }
  
  // No-cache headers for all HTML responses
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // Map clean URL to .html file in public/
  const cleanPath = req.path === '/' ? '/index.html' : req.path;
  let htmlPath = path.join(publicPath, cleanPath);
  
  if (!path.extname(cleanPath)) {
    htmlPath += '.html';
  }

  if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }

  // Final fallback to public/index.html
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// MongoDB Connection Logic & Server Boot
const startServer = async () => {
  const rawMongoURI = process.env.MONGO_URI;

  // ── DIAGNOSTIC: print exact URI properties to Render logs ──────────────────
  console.log('=== MONGO_URI DIAGNOSTIC ===');
  if (rawMongoURI === undefined) {
    console.warn('MONGO_URI: UNDEFINED - not set in environment variables!');
    console.warn('Database features will be offline. Set MONGO_URI in Render dashboard.');
  } else {
    const masked = rawMongoURI.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, 'mongodb$1://$2:***@');
    console.log('MONGO_URI (masked)      :', masked);
    console.log('length                  :', rawMongoURI.length);
    console.log('startsWith mongodb://   :', rawMongoURI.startsWith('mongodb://'));
    console.log('startsWith mongodb+srv  :', rawMongoURI.startsWith('mongodb+srv://'));
    console.log('contains \\n             :', rawMongoURI.includes('\n'));
    console.log('contains \\r             :', rawMongoURI.includes('\r'));
    console.log('contains "              :', rawMongoURI.includes('"'));
    console.log("contains '              :", rawMongoURI.includes("'"));
    console.log('has leading/trailing sp :', rawMongoURI !== rawMongoURI.trim());
  }
  console.log('=== END DIAGNOSTIC ===');
  // ── END DIAGNOSTIC ─────────────────────────────────────────────────────────

  if (!rawMongoURI) {
    console.warn('Server starting without MongoDB. Login and data features will not work.');
  } else {
    // Strip invisible characters, surrounding quotes, and whitespace
    let mongoURI = rawMongoURI
      .trim()
      .replace(/^["']|["']$/g, '')   // strip surrounding quotes (copy-paste artifact)
      .replace(/[\r\n\t]/g, '');     // strip carriage returns, newlines, tabs

    // Validate protocol
    if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
      console.error('MONGO_URI ERROR: URI does not start with mongodb:// or mongodb+srv://');
      console.error('After stripping quotes, value starts with:', mongoURI.substring(0, 20));
      console.error('Check Render dashboard - the MONGO_URI value may have surrounding quotes.');
    } else {
      const isSRV = mongoURI.startsWith('mongodb+srv://');
      const connStrLog = mongoURI.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, 'mongodb$1://$2:***@');
      console.log(`Connecting to MongoDB (${isSRV ? 'SRV' : 'Standard'}) at: ${connStrLog}...`);

      try {
        const connectOptions = {
          serverSelectionTimeoutMS: 15000,
          connectTimeoutMS: 15000,
          socketTimeoutMS: 30000,
        };

        // SRV URIs must NOT have replicaSet in the URI (Atlas SRV resolves it automatically)
        // Standard URIs with explicit hosts keep their replicaSet param
        await mongoose.connect(mongoURI, connectOptions);

        // Seed admin accounts after successful connection
        await seedAdmin();
      } catch (err) {
        console.error('MONGO CONNECTION FAILED:');
        console.error('  name   :', err.name);
        console.error('  message:', err.message);
        console.error('  code   :', err.code);
        console.error('  stack  :', err.stack);
        // Do NOT process.exit() - allows Render to complete health check and deploy new code
      }
    }
  }

  // Start listening regardless of database connection status
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`);
    console.log(`Mongoose readyState: ${mongoose.connection.readyState} (1=connected, 0=disconnected)`);
    console.log(`Database name: ${mongoose.connection.name || '(not connected)'}`);
  });
};

startServer();

