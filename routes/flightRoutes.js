const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");

// Middleware function to get a flight by ID
async function getFlight(req, res, next) {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.flight = flight;
    next();
  } catch (err) { 
    return res.status(500).json({ message: err.message });
  }
}

// Get all flights with optional filters
router.get("/", async (req, res) => {
  const { departureCity, arrivalCity, departureDate, returnDate } = req.query;

  const filters = {};

  if (departureCity) {
    filters.departureCity = new RegExp(departureCity, 'i');
  }

  if (arrivalCity) {
    filters.arrivalCity = new RegExp(arrivalCity, 'i');
  }

  if (departureDate) {
    filters.departureDate = new Date(departureDate);
  }

  if (returnDate) {
    filters.returnDate = new Date(returnDate);
  }

  try {
    let flights = await Flight.find(filters);

    // Client-side filter: Price slider
    const { minPrice, maxPrice } = req.query;
    if (minPrice && maxPrice) {
      flights = flights.filter((flight) => {
        return flight.price >= minPrice && flight.price <= maxPrice;
      });
    }

    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// Get a single flight by ID
router.get("/:id", getFlight, (req, res) => {
  res.json(res.flight);
});

// Create a new flight
router.post("/", async (req, res) => {
  const flight = new Flight(req.body);
  console.log(flight);

  try {
    const newFlight = await flight.save();
    res.status(201).json(newFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a flight by ID
router.patch("/:id", getFlight, async (req, res) => {
  if (req.body.flightNumber != null) {
    res.flight.flightNumber = req.body.flightNumber;
  }
  if (req.body.airline != null) {
    res.flight.airline = req.body.airline;
  }
  if (req.body.departureAirport != null) {
    res.flight.departureAirport = req.body.departureAirport;
  }
  if (req.body.departureCity != null) {
    res.flight.departureCity = req.body.departureCity;
  }
  if (req.body.departureCountry != null) {
    res.flight.departureCountry = req.body.departureCountry;
  }
  if (req.body.departureDate != null) {
    res.flight.departureDate = req.body.departureDate;
  }
  if (req.body.arrivalAirport != null) {
    res.flight.arrivalAirport = req.body.arrivalAirport;
  }
  if (req.body.arrivalCity != null) {
    res.flight.arrivalCity = req.body.arrivalCity;
  }
  if (req.body.arrivalCountry != null) {
    res.flight.arrivalCountry = req.body.arrivalCountry;
  }
  if (req.body.arrivalDate != null) {
    res.flight.arrivalDate = req.body.arrivalDate;
  }
  if (req.body.price != null) {
    res.flight.price = req.body.price;
  }

  try {
    const updatedFlight = await res.flight.save();
    res.json(updatedFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete a flight by ID

// Delete a flight by ID
router.delete('/:id', getFlight, async (req, res) => {
  try {
    if (!res.flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    await Flight.deleteOne({ _id: res.flight._id });
    res.json({ message: 'Flight deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
