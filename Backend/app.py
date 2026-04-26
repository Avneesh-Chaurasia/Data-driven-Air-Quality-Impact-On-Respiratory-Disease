from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import numpy as np, joblib, requests, os
import pandas as pd
from dotenv import load_dotenv
from flask_cors import CORS
from datetime import datetime
import google.generativeai as genai
from auth import auth, bcrypt

load_dotenv()
app = Flask(__name__)
CORS(app)

bcrypt.init_app(app)
app.register_blueprint(auth, url_prefix='/api')

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
AQICN_TOKEN = os.getenv("AQICN_TOKEN")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///aqi_data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ================== MODEL ==================
AQI_MODEL = joblib.load("aqi_model.pkl")
feature_columns = joblib.load("features.pkl")

# ================== DATABASE ==================
class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(100))
    aqi_current = db.Column(db.Float)
    predicted_aqi_6h = db.Column(db.Float)
    risk_level = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

# ================== HELPERS ==================
def predict_disease(aqi):
    if aqi <= 50: return "Good air quality"
    elif aqi <= 100: return "Minor irritation for sensitive people"
    elif aqi <= 150: return "Sensitive groups may face breathing issues"
    elif aqi <= 200: return "Breathing discomfort possible for everyone"
    else: return "Severe health risk, avoid outdoor exposure"

# ================== GEO ==================
def geocode_city(city, state):
    url = f"http://api.openweathermap.org/geo/1.0/direct?q={city},{state},IN&limit=1&appid={OPENWEATHER_API_KEY}"
    res = requests.get(url).json()

    if not res:
        return None, None

    return res[0].get("lat"), res[0].get("lon")

# ================== DATA ==================
def fetch_weather(lat, lon):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
    d = requests.get(url).json()

    return {
        "temp": d["main"]["temp"],
        "humidity": d["main"]["humidity"],
        "pressure": d["main"].get("pressure", 0),
        "clouds": d.get("clouds", {}).get("all", 0),
        "wind": d.get("wind", {}).get("speed", 0),
        "rain": d.get("rain", {}).get("1h", 0)
    }

# ✅ FIXED AQI FUNCTION (LAT/LON + SAFE)
def fetch_aqi(lat, lon):
    url = f"https://api.waqi.info/feed/geo:{lat};{lon}/?token={AQICN_TOKEN}"
    response = requests.get(url).json()

    if response.get("status") != "ok":
        return {
            "aqi": 0,
            "pm25": 0,
            "pm10": 0,
            "no2": 0,
            "so2": 0,
            "co": 0,
            "o3": 0
        }

    d = response.get("data", {})
    iaqi = d.get("iaqi", {})

    return {
        "aqi": d.get("aqi", 0),
        "pm25": iaqi.get("pm25", {}).get("v", 0),
        "pm10": iaqi.get("pm10", {}).get("v", 0),
        "no2": iaqi.get("no2", {}).get("v", 0),
        "so2": iaqi.get("so2", {}).get("v", 0),
        "co": iaqi.get("co", {}).get("v", 0),
        "o3": iaqi.get("o3", {}).get("v", 0)
    }

# ================== SAFE WRAPPER ==================
def safe_fetch_all(city, state):
    try:
        lat, lon = geocode_city(city, state)

        if lat is None or lon is None:
            return None, None, None, "Invalid city/state"

        weather = fetch_weather(lat, lon)
        aqi = fetch_aqi(lat, lon)

        if aqi["aqi"] == 0:
            return None, None, None, "AQI data not available"

        return lat, lon, (weather, aqi), None

    except Exception as e:
        return None, None, None, str(e)

# ================== FALLBACK ==================
FALLBACK_CITIES = {
    "haryana": "Delhi",
    "bihar": "Patna",
    "uttarakhand": "Dehradun"
}

# ================== HISTORY ==================
def get_aqi_history(city, limit=24):
    records = Prediction.query.filter_by(city=city)\
        .order_by(Prediction.created_at.desc())\
        .limit(limit).all()

    return [r.aqi_current for r in records if r.aqi_current is not None][::-1]

# ================== FEATURE BUILD ==================
def build_model_input(lat, lon, aqi, weather, history):
    now = datetime.now()

    day_name = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"][now.weekday()]
    hour = now.hour

    if 0 <= hour < 4: time_of_day = "night_late"
    elif 4 <= hour < 8: time_of_day = "early_morning"
    elif 8 <= hour < 12: time_of_day = "morning"
    elif 12 <= hour < 16: time_of_day = "afternoon"
    elif 16 <= hour < 20: time_of_day = "evening"
    else: time_of_day = "night"

    month = now.month
    if month in [6,7,8]: season = "monsoon"
    elif month in [9,10,11]: season = "post_monsoon"
    elif month in [12,1,2]: season = "winter"
    else: season = "summer"

    dew_point = weather["temp"] - ((100 - weather["humidity"]) / 5)

    def safe(hist, i):
        return hist[-i] if len(hist) >= i else (hist[-1] if hist else aqi["aqi"])

    base = {
        "latitude": lat,
        "longitude": lon,
        "month": month,
        "day_name": day_name,
        "is_weekend": now.weekday() >= 5,
        "season": season,
        "time_of_day": time_of_day,

        "humidity_percent": weather["humidity"],
        "dew_point_c": dew_point,
        "wind_gusts_kmh": weather["wind"] * 3.6,
        "precipitation_mm": weather["rain"],
        "is_raining": weather["rain"] > 0,
        "heavy_rain": weather["rain"] > 10,

        "pressure_msl_hpa": weather["pressure"],
        "cloud_cover_percent": weather["clouds"],

        "pm2_5_ugm3": aqi["pm25"],
        "pm10_ugm3": aqi["pm10"],
        "co_ugm3": aqi.get("co", 0),
        "no2_ugm3": aqi["no2"],
        "so2_ugm3": aqi["so2"],
        "o3_ugm3": aqi["o3"],

        "dust_ugm3": aqi["pm10"] * 0.3,
        "aod": aqi["pm25"] / 300,

        "us_aqi": aqi["aqi"],

        "festival_period": month in [10,11],
        "crop_burning_season": month in [10,11],

        "hour": hour,

        "aqi_lag_1": safe(history, 1),
        "aqi_lag_3": safe(history, 3),
        "aqi_lag_6": safe(history, 6),
        "aqi_lag_12": safe(history, 12),
        "aqi_lag_24": safe(history, 24),

        "rolling_mean_6": np.mean(history[-6:]) if len(history)>=6 else aqi["aqi"],
        "rolling_mean_12": np.mean(history[-12:]) if len(history)>=12 else aqi["aqi"],
        "rolling_std_12": np.std(history[-12:]) if len(history)>=12 else 0,

        "pm_ratio": aqi["pm25"] / (aqi["pm10"] + 1),
        "gas_sum": aqi["no2"] + aqi["so2"] + aqi["o3"]
    }

    features = []
    for col in feature_columns:
        val = base.get(col, 0)
        if val is None or (isinstance(val, float) and np.isnan(val)):
            val = 0
        if isinstance(val, (int, float)):
            val = float(val)
        features.append(val)

    return features

# ================== GEMINI AI ==================
def generate_health_advice(city, predicted_aqi, pm25):
    try:
        prompt = f"""
        You are an environmental health expert.

        AQI: {predicted_aqi}
        PM2.5: {pm25}
        City: {city}

        Give 2–3 short, simple, actionable health tips.

        Rules:
        - Use very simple language
        - Each tip in one line
        - No long explanations
        - Focus on practical actions (mask, indoor, ventilation, etc.)
        - Adjust advice based on AQI severity

        Output format:
        - Tip 1
        - Tip 2
        - Tip 3
        """

        model = genai.GenerativeModel("gemini-2.5-flash")
        #model = genai.GenerativeModel("gemini-3-flash-preview")
        response = model.generate_content(prompt)

        return response.text.strip()

    except Exception as e:
        print("Gemini Error:", e)
        return "No advice available"

# ================== ROUTE ==================
@app.route("/predict", methods=["POST"])
def predict():
    used_fallback = False
    data = request.json
    city = data["city"]
    state = data["state"]

    lat, lon, result, error = safe_fetch_all(city, state)

    # 🔁 fallback logic
    if error:
        fallback_city = FALLBACK_CITIES.get(state.lower())

        if fallback_city:
            lat, lon, result, error = safe_fetch_all(fallback_city, state)
            used_fallback = True

        if error:
            return jsonify({"error": error}), 400

    weather, aqi = result

    #======Current AQI for response======
    current_aqi = aqi["aqi"] if aqi["aqi"] != 0 else (
        get_aqi_history(city)[-1] if get_aqi_history(city) else "N/A"
    )

    history = get_aqi_history(city)
    features = build_model_input(lat, lon, aqi, weather, history)

    df = pd.DataFrame([features], columns=feature_columns)
    pred = float(AQI_MODEL.predict(df)[0])

    risk = predict_disease(pred)
    advice = generate_health_advice(city, pred, aqi["pm25"])

    db.session.add(Prediction(
        city=city,
        aqi_current=aqi["aqi"],
        predicted_aqi_6h=pred,
        risk_level=risk
    ))
    db.session.commit()

    response = {
        "current_aqi": current_aqi,
        "future_aqi": pred,
        "disease": risk,
        "advice": advice
    }
    if used_fallback:
        response["note"] = "Using nearby AQI estimate"

    return jsonify(response)

# aqi_cache = {}
# @app.route("/aqi-location", methods=["POST"])
# def get_aqi_by_location():
#     data = request.json
#     lat = data["lat"]
#     lon = data["lon"]

#     aqi = fetch_aqi(lat, lon)

#     return jsonify(aqi)

# ================== RUN ==================
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)