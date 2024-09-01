# preprocess_data.py located at C:/Users/avani/OneDrive/Documents/Desktop/Avanish/Projects/MindMedix/backend/ml_model/preprocess_data.py
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import numpy as np

# Load your CSV data from the specified location
data = pd.read_csv(r'C:\Users\avani\Downloads\health_data.csv')

# Encode categorical features
categorical_columns = ['gender', 'symptom1', 'symptom2', 'symptom3']
one_hot_encoder = OneHotEncoder(sparse=False)
encoded_categorical_data = one_hot_encoder.fit_transform(data[categorical_columns])

# Normalize the 'age' column
scaler = StandardScaler()
normalized_age = scaler.fit_transform(data[['age']])

# Combine normalized age with encoded categorical data
X = np.concatenate([normalized_age, encoded_categorical_data], axis=1)

# Encode the target 'disease' column
disease_encoder = OneHotEncoder(sparse=False)
y = disease_encoder.fit_transform(data[['disease']])

# Convert to DataFrame for saving
columns = ['feature_{}'.format(i) for i in range(X.shape[1])]
preprocessed_data = pd.DataFrame(X, columns=columns)
preprocessed_data['disease'] = disease_encoder.inverse_transform(y)

# Save the preprocessed data to a new CSV file in your specified location
preprocessed_data.to_csv(r'C:\Users\avani\Downloads\preprocessed_health_data.csv', index=False)

print("Preprocessing complete. The preprocessed data has been saved.")
