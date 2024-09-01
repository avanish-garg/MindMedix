const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userName: String,
    feedback: String,
    createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
