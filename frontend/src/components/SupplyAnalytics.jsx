import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function SupplyAnalytics({ events }) {
  if (!events || events.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No supply data available yet
      </p>
    );
  }

  /* ---------- Quantity by Crop ---------- */
  const quantityByCrop = {};
  events.forEach((e) => {
    quantityByCrop[e.crop] =
      (quantityByCrop[e.crop] || 0) + Number(e.quantity);
  });

  const cropChart = {
    labels: Object.keys(quantityByCrop),
    datasets: [
      {
        label: "Total Quantity (kg)",
        data: Object.values(quantityByCrop),
        backgroundColor: "#16a34a",
        borderRadius: 8,
      },
    ],
  };

  /* ---------- Stage Distribution ---------- */
  const stageCount = {};
  events.forEach((e) => {
    stageCount[e.stage] = (stageCount[e.stage] || 0) + 1;
  });

  const stageChart = {
    labels: Object.keys(stageCount),
    datasets: [
      {
        label: "Events Count",
        data: Object.values(stageCount),
        backgroundColor: "#4f46e5",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Quantity Chart */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <h4 className="font-semibold mb-3">
          🌾 Quantity by Crop
        </h4>
        <Bar data={cropChart} />
      </div>

      {/* Stage Chart */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <h4 className="font-semibold mb-3">
          🚚 Supply Stage Distribution
        </h4>
        <Bar data={stageChart} />
      </div>

    </div>
  );
}
