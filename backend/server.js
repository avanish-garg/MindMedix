// backend/server.js

require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');

const progressRoutes = require('./routes/progress');
const moodRoutes = require('./routes/mood');
const authRoutes = require('./routes/auth');
const predictRoutes = require('./routes/predict');

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://avanish:jaijinendra@pandavastrial.n7bpfrh.mongodb.net/?retryWrites=true&w=majority&appName=PANDAVASTRIAL';

// Updated MongoDB connection code
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/predict', predictRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
