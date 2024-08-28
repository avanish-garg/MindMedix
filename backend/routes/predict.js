// backend/routes/predict.js

const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const fs = require('fs');
const User = require('../models/User'); // Import User model
const authenticateToken = require('../middleware/authenticateToken'); // Ensure only authenticated users can access

// Step 1: Load the trained model and disease classes
let model;
const modelPath = path.join(__dirname, '../ml_model/saved_model/model.json');
const diseaseClassesPath = path.join(__dirname, '../ml_model/disease_classes.json');
const diseaseClasses = JSON.parse(fs.readFileSync(diseaseClassesPath, 'utf8'));

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
        const input = tf.tensor2d([[age, symptoms[0], symptoms[1], symptoms[2]]]); // Adjusted for three symptoms

        // Make a prediction
        const prediction = model.predict(input);
        const predictionArray = prediction.arraySync()[0];

        // Map prediction to diseases and get top 10
        const topDiseases = predictionArray
            .map((probability, index) => ({ disease: diseaseClasses[index], probability }))
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 10); // Top 10 diseases

        // Find the user and update their record with the top prediction
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.diseasePredictions.push({
            age,
            symptoms,
            diagnosis: topDiseases[0].disease, // Main prediction
            date: new Date(),
        });

        await user.save();

        res.status(200).json({ topDiseases });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
