const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

// Import routes
const bicycleRoutes = require('./routes/bicycles');
const bookingRoutes = require('./routes/bookings');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bicycleManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Use routes
app.use('/api/bicycles', bicycleRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});