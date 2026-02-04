import { useEffect, useState } from "react";

export default function RealTimeSupplyDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEvents(prev => [data, ...prev]);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🚚 Live Supply Chain</h2>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((e, i) => (
          <div key={i} className="bg-white p-3 rounded shadow">
            <b>🌾 {e.crop}</b>
            <p>📍 {e.stage} – {e.location}</p>
            <p>📦 Qty: {e.quantity}</p>
            <p className="text-xs text-gray-500">
              🕒 {new Date(e.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
