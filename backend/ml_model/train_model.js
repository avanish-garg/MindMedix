// backend/ml_model/train_model.js

const tf = require('@tensorflow/tfjs-node'); // Using TensorFlow.js for Node.js
const fs = require('fs');
const path = require('path');

// Step 1: Load and parse CSV data
const csvFilePath = path.join(__dirname, 'health_data.csv'); // Updated file path
const csvData = fs.readFileSync(csvFilePath, 'utf8');
const lines = csvData.split('\n');
const headers = lines[0].split(',');

// Parse the CSV data into an array of objects
const data = lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
        obj[header] = parseFloat(values[i]) || values[i]; // Convert to numbers or leave as strings
        return obj;
    }, {});
});

// Step 2: Prepare training data
const trainX = data.map(d => [d.age, d.symptom1, d.symptom2, d.symptom3]); // Include relevant symptoms
const trainY = data.map(d => d.disease); // Target variable

// Encode the target variable (disease) into integers
const diseaseClasses = Array.from(new Set(trainY)); // Unique classes (diseases)
const diseaseToIndex = diseaseClasses.reduce((obj, disease, i) => {
    obj[disease] = i;
    return obj;
}, {});

const trainYEncoded = trainY.map(disease => diseaseToIndex[disease]);

// Convert to TensorFlow.js tensors
const xs = tf.tensor2d(trainX);
const ys = tf.oneHot(tf.tensor1d(trainYEncoded, 'int32'), diseaseClasses.length); // One-hot encode target

// Step 3: Define and Train the Model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 128, inputShape: [trainX[0].length], activation: 'relu' }));
model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
model.add(tf.layers.dense({ units: diseaseClasses.length, activation: 'softmax' })); // Multi-class output layer
model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

model.fit(xs, ys, {
    epochs: 100,
    callbacks: {
        onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`)
    }
}).then(async () => {
    // Step 4: Save the Model and Disease Classes
    const savePath = path.join(__dirname, 'saved_model');
    await model.save(`file://${savePath}`);
    console.log('Model saved at:', savePath);

    // Save the disease classes for later use in prediction
    fs.writeFileSync(path.join(__dirname, 'disease_classes.json'), JSON.stringify(diseaseClasses));
    console.log('Disease classes saved.');
});
