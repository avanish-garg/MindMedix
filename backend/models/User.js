// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema for tracking user progress on tasks
const progressSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  task: String,
  completionStatus: { type: Boolean, default: false },
  notes: String,
});

// Schema for logging user mood
const moodSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  moodLevel: { type: Number, min: 1, max: 5, required: true },
  description: String,
});

// Schema for storing disease prediction data
const diseasePredictionSchema = new mongoose.Schema({
  age: Number,
  symptoms: [Number],
  diagnosis: String,
  date: { type: Date, default: Date.now },
});

// Main User schema that includes personal information and embedded schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNo: { type: String, required: true },
  password: { type: String, required: true },
  moodLogs: [moodSchema], // Array of mood logs
  progress: [progressSchema], // Array of progress tasks
  diseasePredictions: [diseasePredictionSchema], // Array of disease predictions
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
