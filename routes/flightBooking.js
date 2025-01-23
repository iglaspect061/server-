const express = require('express');
const router = express.Router();
const FlightBooking = require('../models/flightBooking');


router.post('/', async (req, res) => {
  try {
    const { flightId, userId, passengers, totalPrice, firstName, lastName, email, mobileNo, address } = req.body;

    // Create a new flight booking
    const booking = new FlightBooking({
      flight: flightId,
      user: userId,
      passengers,
      totalPrice,
      firstName,
      lastName,
      email,
      mobileNo,
      address
    });

    // Save the booking to the database
    await booking.save();

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});



// Get all flight bookings
// router.get('/', async (req, res) => {
//   try {
//     const userId = req.query.userId;
//     console.log("Received userId: ", userId);

//     // Find flight bookings related to the user
//     const flightBookings = await FlightBooking.find({ user: userId });

//     // If no bookings found, return a 404 status
//     if (flightBookings.length === 0) {
//       return res.status(404).json({ message: "No flight bookings found for this user." });
//     }

//     console.log("Found flight bookings: ", flightBookings);
//     res.json(flightBookings);
//   } catch (err) {
//     console.error("Server error: ", err); // Important console log to identify errors
//     res.status(500).json({ message: err.message });
//   }
// });
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    // console.log("Received userId: ", userId);

    // Find flight bookings related to the user and populate the flight details
    const flightBookings = await FlightBooking.find({ user: userId }).populate('flight');

    // If no bookings found, return a 404 status
    if (flightBookings.length === 0) {
      return res.status(404).json({ message: "No flight bookings found for this user." });
    }

    // console.log("Found flight bookings: ", flightBookings);
    res.json(flightBookings);
  } catch (err) {
    // console.error("Server error: ", err); // Important console log to identify errors
    res.status(500).json({ message: err.message });
  }
});



// Get a single flight booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await FlightBooking.findById(req.params.id).populate('flight user');
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Update a flight booking
router.put('/:id', async (req, res) => {
  try {
    const { passengers, totalPrice } = req.body;
    const booking = await FlightBooking.findByIdAndUpdate(
      req.params.id,
      { passengers, totalPrice },
      { new: true }
    ).populate('flight user');
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Delete a flight booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await FlightBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get flight bookings by user
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await FlightBooking.find({ user: userId }).populate('flight user');
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


module.exports = router;
