const express = require('express');
const router = express.Router();
const SelfAssessment = require('../models/SelfAssessment');
const Match = require('../models/Match');

// Route to find and create matches
router.post('/findMatches', async (req, res) => {
    try {
        const { symptoms } = req.body;

        // Ensure symptoms is an array
        if (!Array.isArray(symptoms)) {
            return res.status(400).json({ message: 'Symptoms should be an array.' });
        }

        // Find self-assessments with the same symptoms
        const assessments = await SelfAssessment.find({ symptoms: { $all: symptoms } }).exec();
        
        if (assessments.length < 2) {
            return res.status(400).json({ message: 'Not enough users with the same symptoms to match.' });
        }

        // Pair the users
        for (let i = 0; i < assessments.length - 1; i++) {
            for (let j = i + 1; j < assessments.length; j++) {
                const existingMatch = await Match.findOne({
                    $or: [
                        { user1: assessments[i]._id, user2: assessments[j]._id },
                        { user1: assessments[j]._id, user2: assessments[i]._id }
                    ]
                }).exec();

                if (!existingMatch) {
                    const newMatch = new Match({
                        user1: assessments[i]._id,
                        user2: assessments[j]._id,
                        symptoms
                    });
                    console.log('Saving new match:', newMatch);
                    await newMatch.save();
                }
            }
        }

        res.status(200).json({ message: 'Matches created successfully' });
    } catch (error) {
        console.error('Error finding matches:', error);
        res.status(500).json({ error: 'An error occurred while finding matches.' });
    }
});

module.exports = router;

