import { useState } from "react";
import { getPrices } from "../services/api";
import PriceChart from "./PriceChart";

export default function PriceCard() {
  const [state, setState] = useState("Maharashtra");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const data = await getPrices(state);
      setPrices(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load prices");
    }
    setLoading(false);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">📈 Crop Prices</h3>

      <input
        className="border p-2 w-full mb-2 rounded"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Enter State"
      />

      <button
        onClick={fetchPrices}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Loading..." : "Get Prices"}
      </button>

      {/* Price List */}
      <ul className="mt-3">
        {prices.map((p, i) => (
          <li key={i} className="border-b py-1 text-sm">
            🌾 {p.commodity} – ₹{p.modal_price}
          </li>
        ))}
      </ul>

      {/* Chart */}
      <div className="mt-4">
        <PriceChart prices={prices} />
      </div>
    </div>
  );
}
