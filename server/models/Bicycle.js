const mongoose = require('mongoose');

const bicycleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  size: {
    type: String,
    enum: ['small', 'large'],
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ['idle', 'in-use', 'in-maintenance'],
    default: 'idle',
  },
});

const Bicycle = mongoose.model('Bicycle', bicycleSchema);

module.exports = Bicycle;