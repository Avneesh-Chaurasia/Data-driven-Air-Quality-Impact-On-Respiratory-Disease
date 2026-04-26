import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Example dataset
data = {
    "pm25":[30,120,200,80,150],
    "pm10":[50,210,300,120,240],
    "no2":[10,30,60,20,45],
    "so2":[5,10,20,8,15],
    "ozone":[40,70,90,55,75],
    "disease":["Healthy","Asthma","Severe Asthma","Bronchitis","Asthma"]
}

df = pd.DataFrame(data)

X = df[["pm25","pm10","no2","so2","ozone"]]
y = df["disease"]

model = RandomForestClassifier()
model.fit(X,y)

# SAVE MODEL
joblib.dump(model,"trained_model.pkl")

print("Model saved successfully")