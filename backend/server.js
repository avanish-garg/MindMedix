// backend/server.js

// require('dotenv').config();

const mongoURI = 'mongodb+srv://avanish:jaijinendra@pandavastrial.n7bpfrh.mongodb.net/?retryWrites=true&w=majority&appName=PANDAVASTRIAL';
const express = require('express');
const mongoose = require('mongoose');

const progressRoutes = require('./routes/progress');
const moodRoutes = require('./routes/mood');


const app = express();
app.use(express.json());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));
// Use Routes
app.use('/api/progress', progressRoutes);
app.use('/api/mood', moodRoutes);

// Set the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
