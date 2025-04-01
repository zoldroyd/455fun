import joblib
import pandas as pd
import json

# Load the .sav file
data = joblib.load("../wwwroot/Data/recommendations.sav")

# Convert DataFrame to JSON
if isinstance(data, pd.DataFrame):
    data_json = data.to_json(orient="records")
else:
    data_json = json.dumps(data)

# Save JSON file
with open("../wwwroot/Data/data.json", "w") as f:
    f.write(data_json)

print("JSON file created successfully!")
