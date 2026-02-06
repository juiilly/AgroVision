import { useEffect, useState } from "react";

export default function SupplyTimeline() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(
      import.meta.env.VITE_WS_URL + "/ws/supply"
    );

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setEvents(prev => [data, ...prev]);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">📜 Supply Timeline</h3>

      {(events || []).map((e, i) => (
        <div key={i} className="border-b py-2 text-sm">
          🌾 <b>{e.crop}</b> — {e.stage} — {e.quantity}kg  
          <div className="text-gray-400">
            {new Date(e.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
