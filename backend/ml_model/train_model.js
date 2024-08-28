const tf = require('C:/tensorflow-deps/tfjs-node'); // Updated to reference the local TensorFlow folder
const fs = require('fs');
const path = require('path');

// Step 1: Load and parse CSV data
const csvFilePath = path.join(__dirname, 'medical_data.csv');
const csvData = fs.readFileSync(csvFilePath, 'utf8');
const lines = csvData.split('\n'); // Split the CSV file into lines
const headers = lines[0].split(','); // Extract headers from the first line

// Parse the CSV data into an array of objects
const data = lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
        obj[header] = parseFloat(values[i]); // Convert values to numbers
        return obj;
    }, {});
});

// Step 2: Prepare training data
const trainX = data.map(d => [d.age, d.symptom1, d.symptom2]); // Select relevant features
const trainY = data.map(d => d.disease); // Target variable

// Convert to TensorFlow.js tensors
const xs = tf.tensor2d(trainX);
const ys = tf.tensor2d(trainY, [trainY.length, 1]);

// Step 3: Define and Train the Model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [trainX[0].length], activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

model.fit(xs, ys, {
    epochs: 100,
    callbacks: {
        onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch}: loss = ${logs.loss}`)
    }
}).then(async () => {
    // Step 4: Save the Model
    const savePath = path.join('C:/tensorflow-deps/ml_model/saved_model'); // Updated path to reflect local TensorFlow setup
    await model.save(`file://${savePath}`);
    console.log('Model saved at:', savePath);
});
