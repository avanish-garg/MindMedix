// backend/routes/progress.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST request to update user progress
router.post('/', async (req, res) => {
  const { task, completionStatus, notes } = req.body;
  try {
    const user = await User.findById(req.body.userId); // Change from req.user.id to req.body.userId
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.progress.push({ task, completionStatus, notes });
    await user.save();

    res.status(200).json(user.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
