const express = require('express');
const router = express.Router();
const CarBooking = require('../models/carsBooking');

router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    const carBookings = await CarBooking.find({ user: userId });

    if (carBookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    res.json(carBookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const carBooking = await CarBooking.findById(req.params.id);
    if (!carBooking) return res.status(404).json({ message: 'Car booking not found' });
    res.json(carBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const carBooking = new CarBooking(req.body);

  try {
    const newCarBooking = await carBooking.save();
    res.status(201).json(newCarBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const carBooking = await CarBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!carBooking) return res.status(404).json({ message: 'Car booking not found' });
    res.json(carBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const carBooking = await CarBooking.findByIdAndDelete(req.params.id);
    if (!carBooking) return res.status(404).json({ message: 'Car booking not found' });
    res.json({ message: 'Car booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
