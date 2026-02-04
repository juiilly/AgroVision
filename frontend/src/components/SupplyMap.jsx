import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function SupplyMap() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://verbose-journey-jjjjr7gvqgx52wqv-8000.app.github.dev/ws/supply"
    );

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setEvents((prev) => [...prev, data]);
    };

    return () => ws.close();
  }, []);

  return (
    <MapContainer
      center={[19.076, 72.8777]} // India center
      zoom={5}
      className="h-[400px] rounded-xl"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {events.map((e, i) => (
        <Marker
          key={i}
          position={[e.location.lat, e.location.lng]}
        >
          <Popup>
            🌾 <b>{e.crop}</b><br />
            Stage: {e.stage}<br />
            Quantity: {e.quantity} kg
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
