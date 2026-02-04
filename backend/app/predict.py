from fastapi import HTTPException
import random

def predict_price(commodity: str, state: str):
    try:
        base_price = random.randint(1800, 3200)

        trend = random.choice(["Up", "Down", "Stable"])

        if trend == "Up":
            predicted_price = base_price + random.randint(50, 200)
        elif trend == "Down":
            predicted_price = base_price - random.randint(50, 200)
        else:
            predicted_price = base_price

        return {
            "commodity": commodity,
            "state": state,
            "predicted_price": predicted_price,
            "trend": trend
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
