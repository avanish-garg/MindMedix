const User = require('../models/userModel');

// Get users with the same symptoms
const getUsersWithSameSymptoms = async (req, res) => {
    try {
        const { symptoms } = req.query;
        const users = await User.find({ symptoms });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getUsersWithSameSymptoms,
};
