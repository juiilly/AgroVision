import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function PriceChart({ prices }) {
  // Safety check
  if (!Array.isArray(prices) || prices.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center mt-2">
        No price data available
      </p>
    );
  }

  const labels = prices.map(
    (p, i) => p.market || `Market ${i + 1}`
  );

  const values = prices.map(
    (p) => Number(p.modal_price) || 0
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Modal Price (₹)",
        data: values,
        borderColor: "#16a34a", // green-600
        backgroundColor: "rgba(22, 163, 74, 0.15)",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `₹ ${ctx.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow mt-3">
      <Line data={data} options={options} />
    </div>
  );
}
