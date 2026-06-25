const express = require('express');
const Contact = require('../models/Contact');
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

const router = express.Router();

// Get contact submissions (Admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact submissions.' });
  }
});

// Submit contact form (Public)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required.' });
    }

    const todayStr = new Date().toISOString().split('T')[0];

    const contact = new Contact({
      name,
      phone,
      email: email || '',
      service: service || '',
      message: message || '',
      date: todayStr
    });

    await contact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact request.' });
  }
});

module.exports = router;
