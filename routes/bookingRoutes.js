const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET all bookings for a specific user
router.get('/', async (req, res) => {
  try {
    // Extract user id from query parameters
    const userId = req.query.userId;

    // Find bookings related to the user
    const bookings = await Booking.find({ user: userId });

    // If no bookings found, return a 404 status
    if (!bookings) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single booking by ID
router.get('/:id', getBooking, (req, res) => {
  res.json(res.booking);
});

// Create a new booking
router.post('/', async (req, res) => {
  const booking = new Booking(req.body);

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// Update an existing booking
router.patch('/:id', getBooking, async (req, res) => {
  Object.assign(res.booking, req.body);

  try {
    const updatedBooking = await res.booking.save();
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a booking
router.delete('/:id', getBooking, async (req, res) => {
  try {
    await res.booking.remove();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a booking by ID
async function getBooking(req, res, next) {
  let booking;
  try {
    booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.booking = booking;
  next();
}

module.exports = router;
