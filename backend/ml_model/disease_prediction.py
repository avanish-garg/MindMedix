# disease_prediction.py

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split, RandomizedSearchCV, cross_val_score
from imblearn.over_sampling import SMOTE
import joblib  # Add this import
import json
import sys

# Load the dataset
data = pd.read_csv('C:/Users/avani/OneDrive/Documents/Desktop/Avanish/Projects/MindMedix/backend/ml_model/preprocessed_health_data.csv')

# Display basic information
print("Dataset Info:")
print(data.info())

# Check for missing values
print("Missing Values in Each Column:")
print(data.isnull().sum())

# Check target variable distribution
print("Target Variable Distribution:")
print(data['disease'].value_counts())

# Select features and target variable
X = data.drop('disease', axis=1)
y = data['disease']

# Scale the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Define and train the RandomForest model
rf_model = RandomForestClassifier(random_state=42)
rf_model.fit(X_scaled, y)

# Hyperparameter Tuning
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}
random_search = RandomizedSearchCV(estimator=rf_model, param_distributions=param_grid,
                                      n_iter=10, cv=3, verbose=2, random_state=42, n_jobs=-1)
random_search.fit(X_scaled, y)
best_params = random_search.best_params_
print("Best parameters found: {}".format(best_params))
best_rf_model = random_search.best_estimator_

# Feature Importance
importances = best_rf_model.feature_importances_
feature_names = X.columns
feature_importance_df = pd.DataFrame({'Feature': feature_names, 'Importance': importances})
important_features = feature_importance_df.sort_values(by='Importance', ascending=False)
print("Feature Importance:")
print(important_features.head(20))

# Handle Class Imbalance with SMOTE
smote = SMOTE()
X_resampled, y_resampled = smote.fit_resample(X_scaled, y)
best_rf_model.fit(X_resampled, y_resampled)

# Cross-Validation
cv_scores_resampled = cross_val_score(best_rf_model, X_resampled, y_resampled, cv=5, scoring='accuracy')
print("Cross-Validation Accuracy Scores on Resampled Data: {}".format(cv_scores_resampled))
print("Mean Accuracy on Resampled Data: {}".format(cv_scores_resampled.mean()))

# Final Evaluation
y_pred = best_rf_model.predict(X_scaled)
print("Confusion Matrix:")
print(confusion_matrix(y, y_pred))
print("Classification Report:")
print(classification_report(y, y_pred))

# Save the trained model and scaler
joblib.dump(best_rf_model, 'random_forest_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("Model and scaler saved successfully.")

# Debugging section
if __name__ == "__main__":
    print("Python script started")
    input_data = sys.argv[1]
    print("Received input:", input_data)
    input_data_dict = json.loads(input_data)
    print("Parsed input data:", input_data_dict)
    
    # Mockup for prediction
    # You need to preprocess this input data similarly to how you preprocess training data
    # For example, creating feature vectors for the model to predict
    # Here is a dummy example assuming features are already extracted and scaled
    dummy_feature_vector = [0] * X_scaled.shape[1]  # Replace this with actual feature vector transformation
    prediction = best_rf_model.predict([dummy_feature_vector])
    print("Prediction result:", {"disease": prediction[0]})
    print(json.dumps({"disease": prediction[0]}))
