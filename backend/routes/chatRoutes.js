const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST route to send a message
router.post('/send', async (req, res) => {
    try {
        const { matchId, senderId, content } = req.body;

        const newMessage = new Message({ matchId, senderId, content });
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while sending the message.' });
    }
});

// GET route to fetch messages for a match
router.get('/fetch/:matchId', async (req, res) => {
    try {
        const { matchId } = req.params;
        const messages = await Message.find({ matchId }).sort({ createdAt: 1 });

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching messages.' });
    }
});

module.exports = router;

