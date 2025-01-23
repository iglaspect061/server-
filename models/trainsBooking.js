const mongoose = require('mongoose');

const trainBookingSchema = new mongoose.Schema({
  customer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  train: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Train',
      required: true
    },
    trainNumber: {
      type: Number,
      required: true
    },
    trainName: {
      type: String,
      required: true
    }
  },
  travelDate: {
    type: Date,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  class: {
    type: String,
    enum: ['First AC', 'Second AC', 'Third AC', 'Sleeper', 'General'],
    required: true
  },
  numberOfPassengers: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  bookingStatus: {
    type: String,
    enum: ['Confirmed', 'Cancelled'],
    default: 'Confirmed'
  }
});

const TrainBooking = mongoose.model('TrainBooking', trainBookingSchema);
module.exports = TrainBooking;
