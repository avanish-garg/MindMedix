const User = require('../models/userModel');

// Function to get users with similar symptoms
exports.getUsersWithSimilarSymptoms = async (req, res) => {
    try {
        const { symptoms } = req.body;
        if (!symptoms || !Array.isArray(symptoms)) {
            return res.status(400).json({ error: 'Invalid symptoms format' });
        }

        // Find users with symptoms that match all the given symptoms
        const users = await User.find({ symptoms: { $all: symptoms } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
