const express = require('express');
const Appointment = require('../models/Appointment');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Get appointments (all for Admin, user's own for Customer)
router.get('/', protect, async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') {
      query = { customerEmail: req.user.email };
    }
    const appts = await Appointment.find(query).sort({ date: -1, time: -1 });
    res.json(appts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments.' });
  }
});

// Book appointment
router.post('/', protect, async (req, res) => {
  try {
    const { service, date, time, consultant, notes } = req.body;

    if (!service || !date || !time || !consultant) {
      return res.status(400).json({ error: 'Service, date, time and consultant are required.' });
    }

    const appt = new Appointment({
      customerName: req.user.name,
      customerEmail: req.user.email,
      service,
      date,
      time,
      consultant,
      notes: notes || '',
      status: 'Pending'
    });

    await appt.save();
    res.status(201).json(appt);
  } catch (error) {
    res.status(500).json({ error: 'Failed to book appointment.' });
  }
});

// Update appointment status (Admin or user cancel)
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Approved', 'Cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const appt = await Appointment.findById(req.params.id);
    if (!appt) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    // Customer can only cancel their own. Admin can change to any status.
    if (req.user.role !== 'admin') {
      if (appt.customerEmail !== req.user.email) {
        return res.status(403).json({ error: 'Unauthorized.' });
      }
      if (status !== 'Cancelled') {
        return res.status(403).json({ error: 'Customers can only cancel appointments.' });
      }
    }

    appt.status = status;
    await appt.save();
    res.json(appt);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment.' });
  }
});

module.exports = router;
