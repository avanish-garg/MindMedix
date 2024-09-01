const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  tip: { type: String, required: true },
});

const Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;
