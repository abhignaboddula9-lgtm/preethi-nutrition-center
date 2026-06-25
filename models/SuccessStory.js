const mongoose = require('mongoose');

const SuccessStorySchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  clientDetails: {
    type: String,
    required: [true, 'Client details are required (e.g., weight loss details, duration)'],
    trim: true
  },
  beforeImageUrl: {
    type: String,
    required: [true, 'Before image URL is required']
  },
  afterImageUrl: {
    type: String,
    required: [true, 'After image URL is required']
  },
  testimonial: {
    type: String,
    required: [true, 'Testimonial/Review content is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SuccessStory', SuccessStorySchema);
