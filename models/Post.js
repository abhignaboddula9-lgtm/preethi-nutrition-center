const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User name is required for replies']
  },
  userEmail: {
    type: String,
    required: [true, 'User email is required for replies']
  },
  content: {
    type: String,
    required: [true, 'Reply content is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CommentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User name is required for comments']
  },
  userEmail: {
    type: String,
    required: [true, 'User email is required for comments']
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true
  },
  replies: [ReplySchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: ''
  },
  type: {
    type: String,
    enum: ['instagram', 'transformation'],
    required: [true, 'Post type is required']
  },
  mediaUrl: {
    type: String,
    required: [true, 'Media URL is required']
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: [true, 'Media type is required']
  },
  caption: {
    type: String,
    trim: true,
    default: ''
  },
  beforeImageUrl: {
    type: String,
    required: [
      function() {
        return this.type === 'transformation';
      },
      'Before image URL is required for transformation posts'
    ]
  },
  afterImageUrl: {
    type: String,
    required: [
      function() {
        return this.type === 'transformation';
      },
      'After image URL is required for transformation posts'
    ]
  },
  clientName: {
    type: String,
    trim: true,
    default: ''
  },
  clientDetails: {
    type: String,
    trim: true,
    default: ''
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [CommentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);
