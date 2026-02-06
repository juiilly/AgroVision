import { useState } from "react";

export default function SupplyForm({ ws }) {
  const [form, setForm] = useState({
    crop: "",
    stage: "",
    quantity: "",
    lat: "",
    lng: "",
  });

  const sendEvent = () => {
    if (!ws || ws.readyState !== 1) {
      alert("WebSocket not connected");
      return;
    }

    ws.send(JSON.stringify({
      crop: form.crop,
      stage: form.stage,
      quantity: Number(form.quantity),
      location: {
        lat: Number(form.lat),
        lng: Number(form.lng),
      },
    }));

    setForm({ crop: "", stage: "", quantity: "", lat: "", lng: "" });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">➕ Add Supply Event</h3>

      {["crop", "stage", "quantity", "lat", "lng"].map((field) => (
        <input
          key={field}
          placeholder={field.toUpperCase()}
          value={form[field]}
          onChange={(e) =>
            setForm({ ...form, [field]: e.target.value })
          }
          className="border p-2 w-full mb-2 rounded"
        />
      ))}

      <button
        onClick={sendEvent}
        className="bg-green-600 text-white py-2 rounded w-full"
      >
        Send Event
      </button>
    </div>
  );
}
