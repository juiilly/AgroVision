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
    <div className="border rounded p-4 bg-white shadow">
      <h3 className="font-semibold mb-3">📜 Supply Timeline</h3>

      <ul className="space-y-2 text-sm">
        {events.map((e, i) => (
          <li key={i} className="border-b pb-1">
            🌾 <b>{e.crop}</b> | {e.stage} | {e.quantity}kg  
            <br />
            ⏱ {new Date(e.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
