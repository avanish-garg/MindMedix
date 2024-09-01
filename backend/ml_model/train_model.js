//backend\ml_model\train_model.js

const { exec } = require('child_process');
const path = require('path');

// Define the Python version and script paths
const pythonVersion = 'python'; // Change this if you have a specific Python version like 'python3'
const trainScriptPath = path.join(__dirname, 'train_model.py');

// Function to handle errors
function handleError(error, stderr) { 
    console.error('An error occurred:', error.message);
    if (stderr) {
        console.error('stderr:', stderr);
    }
}

// Function to execute the Python script
function runPythonScript(scriptPath, callback) {
    exec(`${pythonVersion} ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            handleError(error, stderr);
            callback(error, null);
        } else {
            console.log('stdout:', stdout);
            callback(null, stdout);
        }
    });
}

// Switch case to handle different commands
function executeCommand(command) {
    switch (command) {
        case 'train':
            console.log('Training the TensorFlow model...');
            runPythonScript(trainScriptPath, (error, result) => {
                if (error) {
                    console.log('Training failed.');
                } else {
                    console.log('Training completed successfully.');
                }
            });
            break;

        case 'test':
            console.log('Testing the model...');
            // Implement your test logic here
            break;

        default:
            console.log('Invalid command. Use "train" or "test".');
            break;
    }
}

// Execute command based on process arguments
const command = process.argv[2];
executeCommand(command);
