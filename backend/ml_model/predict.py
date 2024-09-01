# predict.py

import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model

# Load the model and label encoder
model = load_model('disease_prediction_model.h5')
label_classes = np.load('label_encoder.npy')

def predict_disease(input_features):
    """
    input_features: numpy array of shape (n_features,)
    """
    input_features = np.array(input_features).reshape(1, -1)
    prediction = model.predict(input_features)
    predicted_class = np.argmax(prediction, axis=1)[0]
    disease_name = label_classes[predicted_class]
    confidence = np.max(prediction)
    return disease_name, confidence

# Example usage
if __name__ == "__main__":
    # Replace with actual input features
    sample_input = [0.5] * model.input_shape[1]
    disease, confidence = predict_disease(sample_input)
    print(f"Predicted Disease: {disease} with confidence {confidence*100:.2f}%")
