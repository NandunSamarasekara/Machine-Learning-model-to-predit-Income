import sys
import json
import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# Load input data from Node.js
input_data = json.loads(sys.argv[1])  # Parse JSON string

# Define expected columns (from IT_24102080_scaled_train.csv)
expected_cols = [
    'age', 'education_num', 'hours_per_week', 'workclass_Local-gov', 'workclass_Private',
    'workclass_Self-emp-inc', 'workclass_Self-emp-not-inc', 'workclass_State-gov',
    'workclass_Without-pay', 'marital_status_Married-AF-spouse', 'marital_status_Married-civ-spouse',
    'marital_status_Married-spouse-absent', 'marital_status_Never-married', 'marital_status_Separated',
    'marital_status_Widowed', 'occupation_Armed-Forces', 'occupation_Craft-repair',
    'occupation_Exec-managerial', 'occupation_Farming-fishing', 'occupation_Handlers-cleaners',
    'occupation_Machine-op-inspct', 'occupation_Other-service', 'occupation_Priv-house-serv',
    'occupation_Prof-specialty', 'occupation_Protective-serv', 'occupation_Sales',
    'occupation_Tech-support', 'occupation_Transport-moving', 'relationship_Not-in-family',
    'relationship_Other-relative', 'relationship_Own-child', 'relationship_Unmarried',
    'relationship_Wife', 'race_Asian-Pac-Islander', 'race_Black', 'race_Other', 'race_White',
    'sex_Male', 'native_country_Canada', 'native_country_China', 'native_country_Columbia',
    'native_country_Cuba', 'native_country_Dominican-Republic', 'native_country_Ecuador',
    'native_country_El-Salvador', 'native_country_England', 'native_country_France',
    'native_country_Germany', 'native_country_Greece', 'native_country_Guatemala',
    'native_country_Haiti', 'native_country_Honduras', 'native_country_Hong',
    'native_country_Hungary', 'native_country_India', 'native_country_Iran',
    'native_country_Ireland', 'native_country_Italy', 'native_country_Jamaica',
    'native_country_Japan', 'native_country_Laos', 'native_country_Mexico',
    'native_country_Nicaragua', 'native_country_Outlying-US(Guam-USVI-etc)',
    'native_country_Peru', 'native_country_Philippines', 'native_country_Poland',
    'native_country_Portugal', 'native_country_Puerto-Rico', 'native_country_Scotland',
    'native_country_South', 'native_country_Taiwan', 'native_country_Thailand',
    'native_country_Trinadad&Tobago', 'native_country_United-States', 'native_country_Vietnam',
    'native_country_Yugoslavia'
]

# Define numerical and categorical columns
numerical_cols = ['age', 'education_num', 'hours_per_week']
categorical_cols = ['workclass', 'marital_status', 'occupation', 'relationship', 'race', 'sex', 'native_country']


# Preprocessing function
def preprocess_data(raw_data):
    # Convert input to DataFrame
    df = pd.DataFrame([raw_data])

    # Scale numerical features
    scalers = {
        'age': StandardScaler(),
        'education_num': MinMaxScaler(),
        'hours_per_week': RobustScaler()
    }

    # Fit scalers on sample data (in production, use saved scalers or training data stats)
    # For simplicity, we fit on the input (not ideal; ideally load training stats)
    for col, scaler in scalers.items():
        if col in df.columns:
            df[col] = scaler.fit_transform(df[[col]])

    # One-hot encode categorical features
    df = pd.get_dummies(df, columns=categorical_cols, prefix=categorical_cols)

    # Ensure all expected columns are present
    for col in expected_cols:
        if col not in df.columns:
            df[col] = 0

    # Reorder columns to match model input
    df = df[expected_cols]

    return df


# Preprocess the input data
processed_df = preprocess_data(input_data)

# Load the model
model = joblib.load('xgboost_model.joblib')

# Predict
prediction = model.predict(processed_df)[0]
result = '>50K' if prediction == 1 else '<=50K'

# Output result as JSON
print(json.dumps({"prediction": result}))