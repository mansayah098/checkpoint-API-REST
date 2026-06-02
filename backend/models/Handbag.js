const mongoose = require('mongoose');

const handbagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  brand: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'Noir'
  },
  image: {
    type: String, // URL de l'image
    default: 'https://via.placeholder.com/150'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Handbag', handbagSchema);