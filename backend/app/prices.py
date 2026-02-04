import os
import requests
from fastapi import HTTPException

DATA_GOV_API_KEY = os.getenv("DATA_GOV_API_KEY")

RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070"

BASE_URL = "https://api.data.gov.in/resource"


def get_crop_prices(state: str, commodity: str):
    if not DATA_GOV_API_KEY:
        raise HTTPException(status_code=500, detail="DATA.GOV API key not configured")

    params = {
        "api-key": DATA_GOV_API_KEY,
        "format": "json",
        "limit": 10,
        "filters[state.keyword]": state,
        "filters[commodity]": commodity,
    }

    url = f"{BASE_URL}/{RESOURCE_ID}"

    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Failed to fetch crop prices")

    data = response.json()

    records = []
    for item in data.get("records", []):
        records.append({
            "market": item.get("market"),
            "min_price": item.get("min_price"),
            "max_price": item.get("max_price"),
            "modal_price": item.get("modal_price"),
            "arrival_date": item.get("arrival_date"),
        })

    return {
        "state": state,
        "commodity": commodity,
        "prices": records,
    }
