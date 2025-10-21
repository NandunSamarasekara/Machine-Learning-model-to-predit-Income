Income Prediction Web App
This project is a web application that predicts whether an individual's annual income exceeds $50,000 based on demographic and employment features, using a trained XGBoost model. Built with the MERN stack (without MongoDB), it features a user-friendly React frontend with a cover page and a prediction form, and an Express/Node.js backend that preprocesses inputs and runs predictions.
Introduction
The Adult Income dataset (UCI Machine Learning Repository) contains demographic and employment data (e.g., age, education, occupation) to predict whether an individual's income is <=50K or >50K. This project addresses the binary classification problem using a machine learning model, deployed as a web app for real-time predictions.
Problem Statement

Objective: Predict income level (<=50K or >50K) based on features like age, workclass, education, marital status, occupation, relationship, race, sex, hours per week, and native country.
Dataset: Adult dataset (adult.data), with ~32,561 training records and ~75 features after preprocessing.

Preprocessing Techniques Used
Data preprocessing was performed in group_pipeline.ipynb to prepare the dataset (IT_24102080_scaled_train.csv) for model training:

Numerical Features:
age: Scaled using StandardScaler.
education_num: Scaled using MinMaxScaler (mapped from education levels, e.g., 'Bachelors' → 13).
hours_per_week: Scaled using RobustScaler.


Categorical Features:
workclass, education, marital_status, occupation, relationship, race, sex, native_country: One-hot encoded to create ~75 numerical features.


Handling Missing Values: Replaced with appropriate placeholders (e.g., '?' for unknown categories).
Output: Preprocessed dataset saved as IT_24102080_scaled_train.csv.

Model Training

Model: XGBoost classifier, chosen for its high performance in tabular data classification.
Training:
Performed in group_pipeline.ipynb using IT_24102080_scaled_train.csv.
Features: ~75 numerical features after scaling and one-hot encoding.
Target: Binary income label (<=50K=0, >50K=1).
Parameters: Optimized via hyperparameter tuning (e.g., learning rate, max depth).


Saved Model: xgboost_model.joblib in E:\AIML_Project\results\outputs.

Model Evaluation

Metrics:
Test Accuracy: ~87% on the test split.
5-Fold Cross-Validation Accuracy: ~87.29%.


Performance: The model effectively distinguishes <=50K and >50K incomes, with strong performance on key features like education_num, hours_per_week, and occupation.

Prerequisites

Node.js: v18+ (for backend and frontend).
Python: 3.11+ (for predict.py).
Python Libraries: joblib, pandas, xgboost, scikit-learn.
Git: For cloning the repository.

Setup Instructions

Clone the Repository:
git clone https://github.com/NandunSamarasekara/Machine-Learning-model-to-predit-Income.git
cd income-predictor-app


Backend Setup:

Navigate to backend/:cd backend


Install Node.js dependencies:npm install express body-parser cors


Install Python dependencies:pip install joblib pandas xgboost scikit-learn


Ensure xgboost_model.joblib is in backend/ (copy from E:\AIML_Project\results\outputs if needed).


Frontend Setup:

Navigate to frontend/:cd ../frontend


Install dependencies:npm install axios react-router-dom




Run the Backend:

From backend/:node server.js


Confirm: Backend server running on port 5000.


Run the Frontend:

From frontend/:npm start


Open http://localhost:3000 in a browser.



Usage

Access the Cover Page:

Visit http://localhost:3000 to see the cover page with a "Try the Predictor" button.
Click to navigate to the prediction form (/predict).


Use the Prediction Form:

Enter demographic and employment details:
Age: 17-90 (e.g., 40).
Workclass: Select from dropdown (e.g., 'Self-emp-inc').
Education Level: Select from dropdown (e.g., 'Bachelors' → education_num=13).
Marital Status: e.g., 'Married-civ-spouse'.
Occupation: e.g., 'Exec-managerial'.
Relationship: e.g., 'Husband'.
Race: e.g., 'White'.
Sex: e.g., 'Male'.
Hours per Week: 1-99 (e.g., 50).
Native Country: e.g., 'United-States'.


Click "Predict Income" to see the result (e.g., "Predicted Income: >50K").


Sample Input for >50K:

Age: 40, Workclass: Self-emp-inc, Education: Bachelors, Marital Status: Married-civ-spouse, Occupation: Exec-managerial, Relationship: Husband, Race: White, Sex: Male, Hours per Week: 50, Native Country: United-States.
Expected: Predicted Income: >50K.



Deployment

Backend: Deploy to Render or Heroku:
Create requirements.txt for Python dependencies:joblib==1.2.0
pandas==1.5.3
xgboost==1.7.5
scikit-learn==1.2.2


Create Procfile: web: node server.js.
Push to Render/Heroku via GitHub integration.


Frontend: Deploy to Vercel:
Connect GitHub repo, set root to frontend/, and deploy.
Update API URL in PredictionForm.js to the deployed backend (e.g., https://your-backend.render.com/predict).



Troubleshooting

Backend Errors:
Check xgboost_model.joblib path in backend/.
Verify Python dependencies and path in server.js (e.g., E:\AIML_Project\.venv\Scripts\python.exe).


Frontend Errors:
Ensure CORS is enabled in server.js.
Check browser console for API or routing issues.


Prediction Issues: If predictions are inconsistent, save/load scalers from group_pipeline.ipynb into predict.py for consistent preprocessing.

Notes

Model Accuracy: ~87% (test), ~87.29% (5-fold CV).
UI: Built with React, Tailwind CSS, and React Router for a modern, responsive experience.
Scalers: For production, save scalers (StandardScaler, MinMaxScaler, RobustScaler) from group_pipeline.ipynb and load in predict.py.

Contact
For issues, contact NandunSamarasekara.