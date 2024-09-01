const mongoose = require('mongoose');

// Define the Match schema
const MatchSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'selfAssessmentModel', // Reference to the SelfAssessment model
        required: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'selfAssessmentModel', // Reference to the SelfAssessment model
        required: true
    },
    symptoms: {
        type: [String], // Array of strings to store symptoms
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to current date/time
    }
}, { collection: 'matches' }); // Explicitly set the collection name

// Create the Match model using the schema
const Match = mongoose.model('Match', MatchSchema);

// Export the model for use in other parts of your application
module.exports = Match;
