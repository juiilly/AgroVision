import { useState } from "react";
import { getPrediction } from "../services/api";

export default function PredictCard() {
  const [commodity, setCommodity] = useState("Wheat");
  const [state, setState] = useState("Maharashtra");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const predict = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await getPrediction(commodity, state);

      // Defensive check
      if (!data || !data.predicted_price) {
        throw new Error("Invalid prediction response");
      }

      setResult(data);
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Prediction failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">🔮 Price Prediction</h3>

      <input
        className="border p-2 w-full mb-2 rounded"
        value={commodity}
        onChange={(e) => setCommodity(e.target.value)}
        placeholder="Commodity"
      />

      <input
        className="border p-2 w-full mb-2 rounded"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
      />

      <button
        onClick={predict}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full disabled:opacity-60"
      >
        {loading ? "Predicting..." : "Predict Price"}
      </button>

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      {result && (
        <div className="mt-3 border rounded p-3 bg-gray-50">
          <p>🌾 <strong>Commodity:</strong> {result.commodity}</p>
          <p>📍 <strong>State:</strong> {result.state}</p>
          <p>💰 <strong>Predicted Price:</strong> ₹{result.predicted_price}</p>
          <p>📈 <strong>Trend:</strong> {result.trend}</p>
        </div>
      )}
    </div>
  );
}
