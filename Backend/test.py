import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Load API key from .env
api_key = os.getenv("GEMINI_API_KEY")

print("API KEY:", api_key)

# Configure Gemini
genai.configure(api_key=api_key)

# Load model
model = genai.GenerativeModel("gemini-2.5-flash")

# Generate response
response = model.generate_content(
    "AQI is 4 and PM2.5 is 120. Give health advice. Give 2 short tips."
)

print(response.text)