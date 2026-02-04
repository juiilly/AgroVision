import WeatherCard from "../components/WeatherCard";
import PriceCard from "../components/PriceCard";
import PredictCard from "../components/PredictCard";
import SupplyMap from "../components/SupplyMap";

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-green-700">
          🌱 Farmer Dashboard
        </h2>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>

      {/* ================= OVERVIEW ================= */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        📊 Farm Overview
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Weather */}
        <div className="bg-white p-6 rounded-xl shadow">
          <WeatherCard />
        </div>

        {/* Crop Health */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
          <div className="text-lg font-medium">🌾 Crop Health</div>
          <p className="text-3xl font-bold mt-4 text-green-600">Good</p>
        </div>

        {/* Prices */}
        <div className="bg-white p-6 rounded-xl shadow">
          <PriceCard />
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
          <div className="text-lg font-medium">🚨 Alerts</div>
          <p className="text-3xl font-bold mt-4 text-yellow-600">1 New</p>
        </div>
      </div>

      {/* ================= PREDICTION ================= */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        🔮 AI Price Prediction
      </h3>

      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <PredictCard />
      </div>

      {/* ================= SUPPLY CHAIN ================= */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        🚚 Live Supply Chain Tracking
      </h3>

      <div className="bg-white p-6 rounded-xl shadow">
        <SupplyMap />
      </div>

    </div>
  );
}
