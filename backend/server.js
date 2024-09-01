// backend/server.js

require('dotenv').config(); // This loads the environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // To handle CORS issues

const progressRoutes = require('./routes/progress');
const moodRoutes = require('./routes/mood');
const authRoutes = require('./routes/auth'); // Added auth routes
const predictRoutes = require('./routes/predict'); // Added predict routes

const app = express();
app.use(express.json());
app.use(cors()); // Use CORS middleware

// MongoDB connection string, hardcoded
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://avanish:jaijinendra@pandavastrial.n7bpfrh.mongodb.net/?retryWrites=true&w=majority&appName=PANDAVASTRIAL';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api/auth', authRoutes);        // Added authentication routes
app.use('/api/progress', progressRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/predict', predictRoutes);  // Added predict routes

// Set the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
