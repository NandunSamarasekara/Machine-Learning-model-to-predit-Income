Income Prediction Web App
This is a MERN stack (without MongoDB) web application that predicts whether an individual's income exceeds $50,000 per year based on demographic and employment features from the UCI Adult dataset. The app uses a trained XGBoost model (~87% accuracy) and provides a user-friendly interface with a cover page and a prediction form.

Frontend: React with Tailwind CSS, featuring a cover page (CoverPage.js) and a prediction form (PredictionForm.js) with dropdowns for education levels and other categorical features.
Backend: Node.js/Express (server.js) with a Python script (predict.py) to preprocess inputs and run predictions using the XGBoost model (xgboost_model.joblib).
GitHub: NandunSamarasekara/Machine-Learning-model-to-predit-Income
Branch: web-app

Prerequisites
Before launching the app, ensure you have the following installed:

Node.js (v18 or higher): Download
Python (3.11 recommended): Download
Git: For cloning the repository
Postman (optional): For testing the backend API

Project Structure
income-predictor-app/
├── backend/
│   ├── server.js              # Express server
│   ├── predict.py             # Python script for preprocessing and prediction
│   ├── xgboost_model.joblib   # Trained XGBoost model
│   └── (optional scaler_*.joblib files for consistent preprocessing)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CoverPage.js   # Cover page component
│   │   │   └── PredictionForm.js  # Prediction form component
│   │   ├── App.js             # Main app with routing
│   │   └── App.css            # Minimal global styles
├── package.json
└── README.md

Setup Instructions
1. Clone the Repository
git clone https://github.com/NandunSamarasekara/Machine-Learning-model-to-predit-Income.git
cd Machine-Learning-model-to-predit-Income
git checkout web-app
cd income-predictor-app

2. Set Up the Backend

Navigate to the backend directory:
cd backend


Install Node.js dependencies:
npm install express body-parser cors


Set up Python environment:

Create and activate a virtual environment:python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate


Install Python dependencies:pip install joblib pandas xgboost scikit-learn




Verify model file:

Ensure xgboost_model.joblib is in the backend/ directory. If not, copy it from E:\AIML_Project\results\outputs or your training output directory.


Optional: Add saved scalers:

For consistent preprocessing, copy scaler_age.joblib, scaler_education_num.joblib, and scaler_hours_per_week.joblib (if available) to backend/. See "Improving Prediction Consistency" below for generating these files.



3. Set Up the Frontend

Navigate to the frontend directory:
cd ../frontend


Install Node.js dependencies:
npm install axios react-router-dom


Verify Tailwind CSS:

The frontend uses Tailwind CSS via CDN, included in frontend/public/index.html. No additional setup is required.



4. Run the Application

Start the backend:

From backend/:node server.js


Confirm: Backend server running on port 5000.


Start the frontend:

From frontend/:npm start


The app opens at http://localhost:3000.


Access the app:

Visit http://localhost:3000 to see the cover page.
Click "Try the Predictor" to navigate to the prediction form.
Enter inputs (e.g., Age=40, Education Level=Bachelors, Workclass=Self-emp-inc, Hours per Week=50, Marital Status=Married-civ-spouse, Occupation=Exec-managerial, Relationship=Husband, Race=White, Sex=Male, Native Country=United-States).
Submit to see the prediction (e.g., Predicted Income: >50K).



5. Testing the Backend (Optional)

Use Postman to test the backend API directly:
Send a POST request to http://localhost:5000/predict with JSON:{
  "age": 40,
  "workclass": "Self-emp-inc",
  "education_num": 13,
  "marital_status": "Married-civ-spouse",
  "occupation": "Exec-managerial",
  "relationship": "Husband",
  "race": "White",
  "sex": "Male",
  "hours_per_week": 50,
  "native_country": "United-States"
}


Expect: {"prediction": ">50K"}.



Troubleshooting

Backend Errors:
CORS: Ensure server.js includes CORS middleware (res.header('Access-Control-Allow-Origin', 'http://localhost:3000')).
Python Errors: Check terminal for stderr. Verify xgboost_model.joblib exists and Python dependencies are installed.
Scaler Issues: If predictions are inconsistent, use saved scalers (see below).


Frontend Errors:
Routing: If /predict fails, verify App.js routes.
Styling: If Tailwind CSS doesn’t apply, check index.html CDN.
Validation: Errors like “Age must be between 17 and 90” indicate invalid inputs.


Prediction Issues: If unexpected results (e.g., <=50K for high education), ensure backend scalers match training (see below).

Improving Prediction Consistency
For accurate predictions, use the same scalers as in training (group_pipeline.ipynb). To generate and use scalers:

Save scalers (add to group_pipeline.ipynb):
import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
processed_dir = r"E:\AIML_Project\results\outputs"
train_df = pd.read_csv(os.path.join(processed_dir, 'IT_24102080_scaled_train.csv'))
scalers = {
    'age': StandardScaler().fit(train_df[['age']]),
    'education_num': MinMaxScaler().fit(train_df[['education_num']]),
    'hours_per_week': RobustScaler().fit(train_df[['hours_per_week']])
}
for col, scaler in scalers.items():
    joblib.dump(scaler, os.path.join(processed_dir, f'scaler_{col}.joblib'))


Copy scalers to backend/ and update predict.py to load them (as shown in previous instructions).


Deployment

Backend (e.g., Render or Heroku):

Push backend/ to a hosting service.
Include requirements.txt for Python dependencies:joblib==1.2.0
pandas==1.5.3
xgboost==1.7.5
scikit-learn==1.2.2


Set environment variable: PYTHONPATH=/path/to/backend.


Frontend (e.g., Vercel):

Push frontend/ to Vercel, selecting frontend/ as the root directory.
Update PredictionForm.js API URL to the deployed backend (e.g., https://your-backend.render.com/predict).


GitHub: Ensure all changes are committed to the web-app branch:
git add .
git commit -m "Update README and finalize app setup"
git push origin web-app



Usage Notes

Features: The app accepts raw inputs: age (17-90), education (e.g., Bachelors → education_num=13), workclass, marital_status, occupation, relationship, race, sex, hours_per_week (1-99), native_country.
Prediction: Outputs >50K or <=50K based on the XGBoost model (~87% accuracy).
Example for >50K: Use age=40, education=Bachelors, workclass=Self-emp-inc, hours_per_week=50, marital_status=Married-civ-spouse, occupation=Exec-managerial, relationship=Husband, race=White, sex=Male, native_country=United-States.

License
This project is for educational purposes and uses the UCI Adult dataset. Ensure compliance with dataset licensing.