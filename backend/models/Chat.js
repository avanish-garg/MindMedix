const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match', // Ensure this matches the model name you have defined for matches
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ensure this matches the model name you have defined for users
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', chatSchema);
