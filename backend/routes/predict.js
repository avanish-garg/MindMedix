// predict.js

const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

router.post('/', async (req, res) => {
    const inputFeatures = req.body.features; // Expecting an array of features from the request body

    if (!Array.isArray(inputFeatures)) {
        return res.status(400).json({ error: 'Invalid input format. Expected an array of features.' });
    }

    const pythonProcess = spawn('python', ['predict.py', JSON.stringify(inputFeatures)]);

    pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        res.json({ prediction: output });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
