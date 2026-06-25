const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  heroTitle: {
    type: String,
    required: [true, 'Hero title is required'],
    trim: true
  },
  heroSubtitle: {
    type: String,
    required: [true, 'Hero subtitle is required'],
    trim: true
  },
  mainContent: {
    type: String,
    required: [true, 'Main content is required'],
    trim: true
  },
  mission: {
    type: String,
    required: [true, 'Mission content is required'],
    trim: true
  },
  vision: {
    type: String,
    required: [true, 'Vision content is required'],
    trim: true
  },
  experienceYears: {
    type: Number,
    default: 15
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt date before saving changes
AboutSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('About', AboutSchema);
