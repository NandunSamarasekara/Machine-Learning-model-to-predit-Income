import sys
import json
import joblib
import pandas as pd

#Load input data from Node.js
input_data = json.load(sys.argv[1])

#Converting to a dataframe
df = pd.DataFrame.from_dict([input_data])

#Loading the model
model = joblib.load('xgboost_model.joblib')

#Predict
prediction = model.predict(df)[0]
result = '>50K' if prediction == 1 else '<50K'

#Taking the output as a JSON
print(json.dumps({'prediction': result}))
