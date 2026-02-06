from fastapi import FastAPI, Depends, HTTPException, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy.orm import Session

from app.prices import get_crop_prices
from app.weather import get_weather
from app.database import Base, engine, SessionLocal
from app.auth.models import User
from app.auth.schemas import UserCreate
from app.auth.utils import hash_password, verify_password
from app.auth.auth import create_access_token
from app.predict import predict_price
from app.supply_chain import add_event   # ✅ NEW

load_dotenv()

# ------------------ APP INIT ------------------
app = FastAPI(title="AGRO-VISION API")

# ------------------ CORS ------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ DATABASE ------------------
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------ ROOT ------------------
@app.get("/")
def root():
    return {"message": "AGRO-VISION Backend Running"}

# ------------------ WEATHER ------------------
@app.get("/weather")
def weather(city: str):
    return get_weather(city)

# ------------------ AUTH ------------------
@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=user.email,
        password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.email})
    return {
        "access_token": token,
        "token_type": "bearer"
    }

# ------------------ PRICES ------------------
@app.get("/prices")
def prices(state: str, commodity: str):
    return get_crop_prices(state, commodity)

# ------------------ PREDICTION ------------------
@app.get("/predict")
def predict(commodity: str, state: str):
    return predict_price(commodity, state)

# =====================================================
# 🚚 REAL-TIME SUPPLY CHAIN (NEW & SAFE)
# =====================================================

active_connections = []

@app.websocket("/ws/supply")
async def supply_chain_ws(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            event = add_event(data)

            for conn in active_connections:
                await conn.send_json(event)

    except:
        active_connections.remove(websocket)

@app.get("/supply/history")
def get_supply_history():
    return supply_events
