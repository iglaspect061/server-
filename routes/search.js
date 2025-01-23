const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

router.get('/', async (req, res) => {
  try {
    const location = req.query.location;

    // If the location parameter is not provided, return an error
    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }

    // Find hotels with a case-insensitive match on the location field
    const hotels = await Hotel.find({
      location: { $regex: new RegExp(location, 'i') },
    });

    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
