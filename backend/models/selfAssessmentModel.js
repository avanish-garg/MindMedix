const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SelfAssessmentSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female"], // Gender field with only "male" and "female" allowed
    required: true
  },
  symptoms: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => v.length >= 3, // Ensure array has at least 3 symptoms
      message: props => `At least 3 symptoms are required!`
    }
  },
  moodLevel: {
    type: Number,
    required: true,
    min: 1, // adjust the range as needed
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SelfAssessment = mongoose.model('SelfAssessment', SelfAssessmentSchema);
module.exports = SelfAssessment;
