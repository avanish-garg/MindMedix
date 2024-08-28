// backend/routes/predict.js

const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const User = require('../models/User'); // Import User model
const authenticateToken = require('../middleware/authenticateToken'); // Ensure only authenticated users can access

// Step 1: Load the trained model
let model;
const modelPath = path.join(__dirname, '../ml_model/saved_model/model.json');
tf.loadLayersModel(`file://${modelPath}`)
    .then(loadedModel => {
        model = loadedModel;
        console.log('Model loaded successfully');
    })
    .catch(err => console.error('Failed to load model:', err));

// Step 2: Create Prediction Endpoint
router.post('/', authenticateToken, async (req, res) => {
    const { age, symptoms } = req.body; // Expecting `age` and `symptoms` in the request body

    try {
        if (!model) return res.status(500).json({ message: 'Model not loaded' });

        // Prepare the input for prediction
        const input = tf.tensor2d([[age, symptoms[0], symptoms[1]]]);

        // Make a prediction
        const prediction = model.predict(input);
        const result = prediction.arraySync()[0][0];

        const diagnosis = result > 0.5 ? 'Positive' : 'Negative';

        // Find the user and update their record with the prediction
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Save the prediction to the user's record
        user.diseasePredictions.push({
            age,
            symptoms,
            diagnosis,
            date: new Date(),
        });
        
        await user.save();

        res.status(200).json({ prediction: diagnosis });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
