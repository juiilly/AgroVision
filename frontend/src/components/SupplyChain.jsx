import { useEffect, useState } from "react";
import SupplyForm from "./SupplyForm";
import SupplyMap from "./SupplyMap";
import SupplyTimeline from "./SupplyTimeline";

export default function SupplyChain() {
  const [events, setEvents] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(
      import.meta.env.VITE_WS_URL + "/ws/supply"
    );

    socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

        // extra safety
        if (data) {
          setEvents((prev) => [...prev, data]);
        }
      } catch (err) {
        console.error("Bad WS data:", err);
      }
    };

    socket.onopen = () => {
      console.log("✅ Supply WebSocket connected");
    };

    socket.onerror = (err) => {
      console.error("❌ Supply WebSocket error", err);
    };

    setWs(socket);

    return () => socket.close();
  }, []);

  return (
    <div className="space-y-10">
      {/* ADD EVENT */}
      <SupplyForm ws={ws} />

      {/* MAP */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-3">
          🗺️ Live Supply Locations
        </h3>

        {/* ALWAYS send array */}
        <SupplyMap events={Array.isArray(events) ? events : []} />
      </div>

      {/* TIMELINE */}
      <div className="bg-white p-4 rounded-xl shadow">
        <SupplyTimeline events={Array.isArray(events) ? events : []} />
      </div>
    </div>
  );
}
