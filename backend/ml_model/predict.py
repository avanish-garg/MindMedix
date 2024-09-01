# predict.py
import sys
import joblib
import pandas as pd
import json

# Load the model and scaler
model = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')

# Parse input data
input_data = json.loads(sys.argv[1])
input_df = pd.DataFrame([input_data])

# Scale input data
input_scaled = scaler.transform(input_df)

# Make prediction
prediction = model.predict(input_scaled)

# Print the prediction (this will be sent back to the Node.js server)
print(prediction[0])
