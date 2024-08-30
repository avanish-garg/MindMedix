// predict.js
const express = require('express');
const router = express.Router();
const { PythonShell } = require('python-shell');
const path = require('path');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

// Path to the Python script
const scriptPath = path.join(__dirname, '../ml_model/disease_prediction.py');

// Prediction Endpoint
router.post('/', authenticateToken, async (req, res) => {
    const { age, symptoms } = req.body;

    try {
        // Validate input
        if (!age || !symptoms || !Array.isArray(symptoms)) {
            console.log("Invalid input data received:", req.body);
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Prepare the input for the Python script
        const input = JSON.stringify({ age, symptoms });

        console.log("Input sent to Python script:", input);

        // Run the Python script
        PythonShell.run(scriptPath, {
            mode: 'text',  // Ensures results are returned as text
            args: [input]
        }, async (err, results) => {
            if (err) {
                console.error("Python script error:", err.message);
                return res.status(500).json({ message: `Python script error: ${err.message}` });
            }

            console.log("Raw results from Python script:", results);

            if (results && results.length > 0) {
                try {
                    // Parse the prediction result
                    const prediction = JSON.parse(results[0]);

                    console.log("Parsed prediction result:", prediction);

                    // Find the user and update their record with the prediction
                    const user = await User.findById(req.user.id);
                    if (!user) {
                        console.error("User not found with ID:", req.user.id);
                        return res.status(404).json({ message: 'User not found' });
                    }

                    user.diseasePredictions.push({
                        age,
                        symptoms,
                        diagnosis: prediction.disease, // Assuming the prediction result contains a 'disease' field
                        date: new Date(),
                    });

                    await user.save();

                    console.log("User record updated with prediction:", user);

                    res.status(200).json({ prediction });
                } catch (parseError) {
                    console.error("Error parsing Python script output:", parseError);
                    return res.status(500).json({ message: "Error parsing Python script output" });
                }
            } else {
                console.error("No prediction returned from the Python script.");
                res.status(500).json({ message: 'No prediction returned from the Python script' });
            }
        });
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
});

module.exports = router;
