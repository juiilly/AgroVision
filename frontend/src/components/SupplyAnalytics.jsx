import { Bar } from "react-chartjs-2";

export default function SupplyAnalytics({ events = [] }) {
  const stageCounts = events.reduce((acc, e) => {
    acc[e.stage] = (acc[e.stage] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(stageCounts),
    datasets: [
      {
        label: "Supply Events",
        data: Object.values(stageCounts),
        backgroundColor: "#22c55e",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <Bar data={data} />
    </div>
  );
}
