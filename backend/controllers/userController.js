const User = require('../models/User');

// Get users with symptoms
const getUsersWithSameSymptoms = async (req, res) => {
    try {
        const { symptoms } = req.body || req.query;
        if (!symptoms || !Array.isArray(symptoms)) {
            return res.status(400).json({ error: 'Invalid symptoms format' });
        }
        const users = await User.find({ symptoms: { $all: symptoms } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsersWithSameSymptoms,
};
