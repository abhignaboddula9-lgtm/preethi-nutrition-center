const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Product image URL is required']
  },
  details: {
    type: String,
    required: [true, 'Product details/description are required'],
    trim: true
  },
  buyLink: {
    type: String,
    required: [true, 'External purchase link is required'],
    trim: true
  },
  price: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
