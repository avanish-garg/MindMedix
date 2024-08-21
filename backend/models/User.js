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
  moodLevel: { type: Number, min: 1, max: 5 },
  description: String,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  moodLogs: [moodSchema],
  progress: [progressSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
