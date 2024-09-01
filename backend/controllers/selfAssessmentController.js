const SelfAssessment = require('../models/selfAssessmentModel');

// Controller function example
exports.createAssessment = async (req, res) => {
    try {
        const { username, age, symptoms, moodLevel } = req.body;
        const newAssessment = new SelfAssessment({ username, age, symptoms, moodLevel });
        await newAssessment.save();
        res.status(201).json({ message: 'Self-assessment created successfully', newAssessment });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the self-assessment.' });
    }
};
