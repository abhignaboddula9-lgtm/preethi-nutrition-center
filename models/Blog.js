const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Blog category is required'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Blog summary/excerpt is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Blog main content is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Blog author is required'],
    default: "Preethi Ma'am",
    trim: true
  },
  readTime: {
    type: String,
    required: [true, 'Estimated read time is required'],
    default: '5 min read',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', BlogSchema);
