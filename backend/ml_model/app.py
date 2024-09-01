# ackend\ml_model\app.py

from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf

# Initialize Flask app
app = Flask(__name__)

# Load your trained model
model = tf.keras.models.load_model('disease_prediction_model.h5')

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get data from POST request
    data = request.get_json(force=True)

    # Convert the JSON data into a numpy array
    features = np.array(data['features']).reshape(1, -1)

    # Make a prediction
    prediction = model.predict(features)

    # Get the index of the class with the highest probability
    predicted_class = np.argmax(prediction, axis=1)

    # Define your classes (replace with your actual class names)
    classes = ['Asthma', 'Bronchitis', 'COVID-19', 'Cholera', 'Dengue', 
               'Diabetes', 'Heart Disease', 'Hepatitis', 'Hypertension', 
               'Influenza', 'Malaria', 'Meningitis', 'Pneumonia', 
               'Tuberculosis', 'Typhoid']

    # Map the predicted index to the class name
    result = classes[predicted_class[0]]

    # Return the prediction as a JSON response
    return jsonify({'predicted_disease': result})

if __name__ == '__main__':
    app.run(debug=True)
