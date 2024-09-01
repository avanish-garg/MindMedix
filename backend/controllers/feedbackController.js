const Feedback = require('../models/feedbackModel');

const submitFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback({
            username: req.body.username,
            feedback: req.body.feedback
        });

        await newFeedback.save(); // Wait for the feedback to be saved
        res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving feedback' });
    }
};

module.exports = {
    submitFeedback
};
