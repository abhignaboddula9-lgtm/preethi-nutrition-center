import express from 'express';
import HealthLog from '../models/HealthLog.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get health logs for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const logs = await HealthLog.find({ customerEmail: req.user.email })
      .sort({ date: -1 })
      .limit(30);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health logs.' });
  }
});

// Add health log
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { weight, height, steps, water, date } = req.body;

    if (!weight) {
      return res.status(400).json({ error: 'Weight is required.' });
    }

    // Default height from request or user profile
    let finalHeight = height;
    if (!finalHeight) {
      const user = await User.findById(req.user.id);
      finalHeight = user ? user.height : 165;
    }

    if (!finalHeight || finalHeight <= 0) {
      finalHeight = 165; // Fallback
    }

    // BMI formula: weight (kg) / (height (m) ^ 2)
    const heightInMeters = finalHeight / 100;
    const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));

    const todayStr = date || new Date().toISOString().split('T')[0];

    const log = new HealthLog({
      customerEmail: req.user.email,
      date: todayStr,
      weight: parseFloat(weight),
      height: parseFloat(finalHeight),
      bmi,
      steps: parseInt(steps) || 0,
      water: parseFloat(water) || 0
    });

    await log.save();

    // Optionally update user's current weight and height in their profile
    await User.findByIdAndUpdate(req.user.id, {
      weight: parseFloat(weight),
      height: parseFloat(finalHeight)
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add health log.' });
  }
});

export default router;
