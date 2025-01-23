const express = require('express');
const router = express.Router();
const Car = require('../models/cars');
// Get all cars
router.get('/', async (req, res) => {
    try {
      const cars = await Car.find();
      res.json(cars);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get a specific car by license plate
  router.get('/:licensePlate', async (req, res) => {
    try {
      const car = await Car.findOne({ licensePlate: req.params.licensePlate });
      if (!car) return res.status(404).json({ message: 'Car not found' });
      res.json(car);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Add a new car
  router.post('/', async (req, res) => {
    const car = new Car(req.body);
    console.log(car);
  
    try {
      const newCar = await car.save();
      res.status(201).json(newCar);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update a car by license plate
  router.put('/:licensePlate', async (req, res) => {
    try {
      const car = await Car.findOneAndUpdate({ licensePlate: req.params.licensePlate }, req.body, { new: true });
      if (!car) return res.status(404).json({ message: 'Car not found' });
      res.json(car);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a car by license plate
  router.delete('/:licensePlate', async (req, res) => {
    try {
      const car = await Car.findOneAndDelete({ licensePlate: req.params.licensePlate });
      if (!car) return res.status(404).json({ message: 'Car not found' });
      res.json({ message: 'Car deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
  