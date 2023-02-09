const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      value: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported', // Custom error msg
    },
    required: [true, 'Product company is required'],
  },
});

module.exports = mongoose.model('Product', productSchema);
