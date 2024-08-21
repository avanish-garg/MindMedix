// backend/app.js or backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const progressRoutes = require('./routes/progress');
const moodRoutes = require('./routes/mood');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use Routes
app.use('/api/progress', progressRoutes);
app.use('/api/mood', moodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
