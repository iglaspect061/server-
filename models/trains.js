const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: Number,
    required: true,
    unique: true
  },
  trainName: {
    type: String,
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
  daysOfOperation: [{
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }],
  classes: [{
    type: String,
    enum: ['First AC', 'Second AC', 'Third AC', 'Sleeper', 'General']
  }],
  stops: [{
    stationCode: String,
    stationName: String,
    arrivalTime: String,
    departureTime: String,
    distance: Number
  }]
});

const Train = mongoose.model('Train', trainSchema);
module.exports = Train;
