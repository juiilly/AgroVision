import { useState } from "react";
import { getPrediction } from "../services/api";

export default function PredictCard() {
  const [commodity, setCommodity] = useState("Wheat");
  const [state, setState] = useState("Maharashtra");
  const [result, setResult] = useState(null);

  const predict = async () => {
    const data = await getPrediction(commodity, state);
    setResult(data);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">🔮 Price Prediction</h3>

      <input
        className="border p-2 w-full mb-2"
        value={commodity}
        onChange={(e) => setCommodity(e.target.value)}
        placeholder="Commodity"
      />

      <input
        className="border p-2 w-full mb-2"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
      />

      <button
        onClick={predict}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full"
      >
        Predict Price
      </button>

      {result && (
        <div className="mt-3">
          <p>🌾 Commodity: {result.commodity}</p>
          <p>📍 State: {result.state}</p>
          <p>💰 Predicted Price: ₹{result.predicted_price}</p>
          <p>📈 Trend: {result.trend}</p>
        </div>
      )}
    </div>
  );
}
