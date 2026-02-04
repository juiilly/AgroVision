import requests
import os
from fastapi import HTTPException

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

def get_weather(city: str):
    API_KEY = os.getenv("OPENWEATHER_API_KEY")

    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured")

    URL = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(URL)

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Weather API failed")

    data = response.json()

    return {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "condition": data["weather"][0]["main"]
    }
