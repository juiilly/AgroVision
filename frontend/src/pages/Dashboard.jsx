import WeatherCard from "../components/WeatherCard";
import PriceCard from "../components/PriceCard";
import PredictCard from "../components/PredictCard";
import SupplyMap from "../components/SupplyMap";
import SupplyChain from "../components/SupplyChain";

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-6">

      {/* ================= HERO HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            🌱 Smart Farmer Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            AI-powered insights for smarter agriculture decisions
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition shadow"
        >
          Logout
        </button>
      </div>

      {/* ================= QUICK STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard title="Weather" value="Live" icon="🌦" />
        <StatCard title="Crop Health" value="Good" icon="🌾" />
        <StatCard title="Market Prices" value="Updated" icon="📈" />
        <StatCard title="Alerts" value="1 New" icon="🚨" />
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-8">
          <Card title="🌦 Weather Forecast">
            <WeatherCard />
          </Card>

          <Card title="🔮 AI Price Prediction">
            <PredictCard />
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          <Card title="📈 Crop Market Prices">
            <PriceCard />
          </Card>

          <Card title="🚚 Live Supply Chain Tracking">
            <SupplyMap />
          </Card>
        </div>

      </div>
    </div>
  );
}

/* ================= REUSABLE UI ================= */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-green-600">{value}</p>
      </div>
    </div>
  );
}
