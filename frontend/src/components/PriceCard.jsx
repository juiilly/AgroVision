import { useState } from "react";
import { getPrices } from "../services/api";
import PriceChart from "./PriceChart";

export default function PriceCard() {
  const [state, setState] = useState("Maharashtra");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPrices = async () => {
    setLoading(true);
    setError("");
    setPrices([]);

    try {
      const data = await getPrices(state);

      // Normalize API response safely
      let records = [];

      if (Array.isArray(data)) {
        records = data;
      } else if (data?.records && Array.isArray(data.records)) {
        records = data.records;
      }

      if (records.length === 0) {
        setError("No price data found for this state.");
      }

      setPrices(records);
    } catch (err) {
      console.error("Price API error:", err);
      setError("Failed to fetch crop prices.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-xl font-bold mb-3">📈 Crop Prices</h3>

      <input
        className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Enter State (e.g. Maharashtra)"
      />

      <button
        onClick={fetchPrices}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition disabled:opacity-60"
      >
        {loading ? "Fetching prices..." : "Get Prices"}
      </button>

      {/* Error message */}
      {error && (
        <p className="text-red-600 text-sm mt-3 text-center">
          {error}
        </p>
      )}

      {/* Price List */}
      {prices.length > 0 && (
        <ul className="mt-4 space-y-1 max-h-40 overflow-auto">
          {prices.map((p, i) => (
            <li
              key={i}
              className="border-b py-1 text-sm flex justify-between"
            >
              <span>🌾 {p.commodity || "Crop"}</span>
              <span className="font-semibold">
                ₹{p.modal_price || "—"}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Chart */}
      <div className="mt-4">
        <PriceChart prices={prices} />
      </div>
    </div>
  );
}
