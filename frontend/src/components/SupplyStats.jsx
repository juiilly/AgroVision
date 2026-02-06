import { useEffect, useState } from "react";

export default function SupplyStats() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    const ws = new WebSocket(
      import.meta.env.VITE_WS_URL + "/ws/supply"
    );

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setStats(prev => ({
        totalEvents: prev.totalEvents + 1,
        totalQuantity: prev.totalQuantity + Number(data.quantity),
      }));
    };

    return () => ws.close();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-green-100 p-4 rounded">
        📦 Total Events<br />
        <b>{stats.totalEvents}</b>
      </div>
      <div className="bg-blue-100 p-4 rounded">
        ⚖️ Total Quantity<br />
        <b>{stats.totalQuantity} kg</b>
      </div>
    </div>
  );
}
