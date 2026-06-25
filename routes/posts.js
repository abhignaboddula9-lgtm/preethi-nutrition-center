const express = require('express');
const Post = require('../models/Post');
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

const router = express.Router();

// @desc    Get all feed posts (sorted by newest first)
// @route   GET /api/posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feed posts',
      error: error.message
    });
  }
});

// @desc    Get a single feed post by ID
// @route   GET /api/posts/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching post details',
      error: error.message
    });
  }
});

// @desc    Toggle Like on a Feed Post (like / unlike)
// @route   POST /api/posts/:id/like
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const userId = req.user._id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike: remove userId from likes array
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // Like: add userId to likes array
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      liked: !isLiked,
      count: post.likes.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Increment View Count on a Feed Post
// @route   POST /api/posts/:id/view
// @access  Public
router.post('/:id/view', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    post.viewCount = (post.viewCount || 0) + 1;
    await post.save();

    res.status(200).json({
      success: true,
      viewCount: post.viewCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Add a comment to a Feed Post
// @route   POST /api/posts/:id/comments
// @access  Private
router.post('/:id/comments', protect, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, message: 'Comment content is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const newComment = {
      userName: req.user.name,
      userEmail: req.user.email,
      content,
      replies: []
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({
      success: true,
      data: post.comments[post.comments.length - 1],
      comments: post.comments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Add a reply to a comment
// @route   POST /api/posts/:id/comments/:commentId/replies
// @access  Private
router.post('/:id/comments/:commentId/replies', protect, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, message: 'Reply content is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    const newReply = {
      userName: req.user.name,
      userEmail: req.user.email,
      content
    };

    comment.replies.push(newReply);
    await post.save();

    res.status(201).json({
      success: true,
      data: comment.replies[comment.replies.length - 1],
      comments: post.comments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete a comment (Admin Only)
// @route   DELETE /api/posts/:id/comments/:commentId
// @access  Private (Admin Only)
router.delete('/:id/comments/:commentId', protect, adminOnly, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    comment.deleteOne();
    await post.save();

    res.status(200).json({
      success: true,
      message: 'Comment successfully removed',
      comments: post.comments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
