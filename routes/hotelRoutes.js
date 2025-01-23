const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'travel',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const parser = multer({ storage: storage });

// GET all hotels, sorted by createdAt in descending order
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new hotel with an image
router.post('/', parser.single('image'), async (req, res) => {
  const { name, location, description, price , images } = req.body;

  try {
    const newHotel = new Hotel({
      name,
      location,
      description,
      price,
      images: images
    });

    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});


// PUT (update) a specific hotel by ID
router.put('/:id', parser.single('image'), async (req, res) => {
  const { name, location, description, price, images  } = req.body;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        description,
        price,
        images: images,
      },
      { new: true }
    );

    if (!updatedHotel)
      return res.status(404).json({ message: 'Hotel not found' });
    res.json(updatedHotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE a specific hotel by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
