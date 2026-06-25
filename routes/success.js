const express = require('express');
const SuccessStory = require('../models/SuccessStory');

const router = express.Router();

// @desc    Get all registered success stories
// @route   GET /api/success
// @access  Public
router.get('/', async (req, res) => {
  try {
    const stories = await SuccessStory.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: stories.length,
      data: stories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve success stories',
      error: error.message
    });
  }
});

// @desc    Get a single success story details
// @route   GET /api/success/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, message: 'Success story not found' });
    }
    res.status(200).json({
      success: true,
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching success story details',
      error: error.message
    });
  }
});

module.exports = router;
