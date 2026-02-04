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
  if (!prices || prices.length === 0) {
    return <p className="text-sm text-gray-500">No data to show</p>;
  }

  const data = {
    labels: prices.map((p) => p.market),
    datasets: [
      {
        label: "Modal Price (₹)",
        data: prices.map((p) => Number(p.modal_price)),
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} />;
}
