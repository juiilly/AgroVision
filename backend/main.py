from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.weather import get_weather
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="AGRO-VISION API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AGRO-VISION Backend Running"}

@app.get("/weather")
def weather(city: str):
    return get_weather(city)
