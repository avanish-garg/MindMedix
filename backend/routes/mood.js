// backend/routes/mood.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST request to log user's mood
router.post('/', async (req, res) => {
  const { moodLevel, description } = req.body;
  try {
    const user = await User.findById(req.body.userId); // Change from req.user.id to req.body.userId
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.moodLogs.push({ moodLevel, description });
    await user.save();

    res.status(200).json(user.moodLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
