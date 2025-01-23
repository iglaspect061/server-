const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Economy', 'Compact', 'Midsize', 'Fullsize', 'SUV', 'Luxury', 'Convertible'],
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
