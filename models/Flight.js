const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true
  },
  airline: {
    type: String,
    required: true
  },
  departureAirport: {
    type: String,
    required: true
  },
  departureCity: {
    type: String,
    required: true
  },
  departureCountry: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  arrivalAirport: {
    type: String,
    required: true
  },
  arrivalCity: {
    type: String,
    required: true
  },
  arrivalCountry: {
    type: String,
    required: true
  },
  arrivalDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Flight', flightSchema);
