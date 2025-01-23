const mongoose = require('mongoose');

const flightBookingSchema = new mongoose.Schema({
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  passengers: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

const FlightBooking = mongoose.model('FlightBooking', flightBookingSchema);

module.exports = FlightBooking;
