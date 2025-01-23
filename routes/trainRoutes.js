const express = require('express');
const router = express.Router();
const Train = require('../models/trains');
// Get all trains
router.get('/', async (req, res) => {
    try {
      const trains = await Train.find();
      res.json(trains);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get a specific train by trainNumber
  router.get('/:trainNumber', async (req, res) => {
    try {
      const train = await Train.findOne({ trainNumber: req.params.trainNumber });
      if (!train) return res.status(404).json({ message: 'Train not found' });
      res.json(train);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Add a new train
  router.post('/', async (req, res) => {
    const train = new Train(req.body);
  
    try {
      const newTrain = await train.save();
      res.status(201).json(newTrain);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update a train by trainNumber
  router.put('/:trainNumber', async (req, res) => {
    try {
      const train = await Train.findOneAndUpdate({ trainNumber: req.params.trainNumber }, req.body, { new: true });
      if (!train) return res.status(404).json({ message: 'Train not found' });
      res.json(train);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a train by trainNumber
  router.delete('/:trainNumber', async (req, res) => {
    try {
      const train = await Train.findOneAndDelete({ trainNumber: req.params.trainNumber });
      if (!train) return res.status(404).json({ message: 'Train not found' });
      res.json({ message: 'Train deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
  