from datetime import datetime

supply_events = []

def add_event(data):
    event = {
        "crop": data["crop"],
        "stage": data["stage"],
        "location": data["location"],
        "quantity": data["quantity"],
        "timestamp": datetime.now().isoformat()
    }
    supply_events.append(event)
    return event
