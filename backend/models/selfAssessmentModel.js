const mongoose = require('mongoose');

// Define the Self-Assessment schema
const SelfAssessmentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    gender: {
        
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    symptoms: {
        type: [String], // Array of symptoms
        required: true,
        validate: [arrayMinLength, 'At least 3 symptoms are required']
    },
    moodLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, { collection: 'selfassessments' }); // Explicitly set the collection name

// Custom validation for minimum array length
function arrayMinLength(val) {
    return val.length >= 3;
}

// Create the SelfAssessment model using the schema
const SelfAssessment = mongoose.model('SelfAssessment', SelfAssessmentSchema);

// Export the model for use in other parts of your application
module.exports = SelfAssessment;
