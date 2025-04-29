const express = require('express');
const router = express.Router();
const Bicycle = require('../models/Bicycle');

// GET all bicycles
router.get('/', async (req, res) => {
  try {
    const bicycles = await Bicycle.find();
    res.json(bicycles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET bicycle by ID
router.get('/:id', async (req, res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id);
    if (bicycle == null) {
      return res.status(404).json({ message: 'Cannot find bicycle' });
    }
    res.json(bicycle);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// UPDATE status of a bicycle
router.put('/:id/status', async (req, res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id);
    if (!bicycle) {
      return res.status(404).json({ message: 'Cannot find bicycle' });
    }
    if(req.body.status != null){
        bicycle.status = req.body.status;
    }

    await bicycle.save();
    res.json(bicycle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// CREATE a new bicycle
router.post('/', async (req, res) => {
  const bicycle = new Bicycle({
    size: req.body.size,
    available: req.body.available,
    status: req.body.status,
  });
  try {
    const newBicycle = await bicycle.save();
    res.status(201).json(newBicycle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a bicycle
router.put('/:id', async (req, res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id);
    if (bicycle == null) {
      return res.status(404).json({ message: 'Cannot find bicycle' });
    }

    if (req.body.size != null) {
      bicycle.size = req.body.size;
    }

    if (req.body.available != null) {
      bicycle.available = req.body.available;
    }
    if (req.body.status != null) {
      bicycle.status = req.body.status;
    }

    const updatedBicycle = await bicycle.save();
    res.json(updatedBicycle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a bicycle
router.delete('/:id', async (req, res) => {
  try {
    await Bicycle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted bicycle' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;