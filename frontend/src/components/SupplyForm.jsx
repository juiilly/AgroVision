import { useState } from "react";

export default function SupplyForm() {
  const [ws, setWs] = useState(null);
  const [form, setForm] = useState({
    crop: "",
    stage: "",
    quantity: "",
    lat: "",
    lng: "",
  });

  const connectWS = () => {
    if (!ws) {
      const socket = new WebSocket(
        import.meta.env.VITE_WS_URL + "/ws/supply"
      );
      setWs(socket);
    }
  };

  const sendEvent = () => {
    if (!ws) return alert("WebSocket not connected");

    ws.send(
      JSON.stringify({
        crop: form.crop,
        stage: form.stage,
        quantity: form.quantity,
        location: {
          lat: Number(form.lat),
          lng: Number(form.lng),
        },
      })
    );
  };

  return (
    <div className="border p-4 rounded-lg bg-white shadow">
      <h3 className="font-semibold mb-2">➕ Add Supply Event</h3>

      <button
        onClick={connectWS}
        className="bg-blue-600 text-white px-3 py-1 rounded mb-2"
      >
        Connect
      </button>

      <input placeholder="Crop" onChange={e => setForm({ ...form, crop: e.target.value })} className="border p-2 w-full mb-2" />
      <input placeholder="Stage (Harvest, Storage...)" onChange={e => setForm({ ...form, stage: e.target.value })} className="border p-2 w-full mb-2" />
      <input placeholder="Quantity (kg)" onChange={e => setForm({ ...form, quantity: e.target.value })} className="border p-2 w-full mb-2" />
      <input placeholder="Latitude" onChange={e => setForm({ ...form, lat: e.target.value })} className="border p-2 w-full mb-2" />
      <input placeholder="Longitude" onChange={e => setForm({ ...form, lng: e.target.value })} className="border p-2 w-full mb-2" />

      <button
        onClick={sendEvent}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Send Event
      </button>
    </div>
  );
}
