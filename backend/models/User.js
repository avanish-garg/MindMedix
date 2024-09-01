// backend/models/User.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  task: String,
  completionStatus: { type: Boolean, default: false },
  notes: String,
});

const moodSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  moodLevel: { type: Number, min: 1, max: 5, required:true },
  description: String,
});

const diseasePredictionSchema = new mongoose.Schema({
  age: Number,
  symptoms: [Number],
  diagnosis: String,
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  age: { type: String, required: true, unique: true },
  phoneno: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  moodLogs: [moodSchema],
  progress: [progressSchema],
  diseasePredictions: [diseasePredictionSchema], // Added disease predictions
});

const User = mongoose.model('User', userSchema);

module.exports = User;
