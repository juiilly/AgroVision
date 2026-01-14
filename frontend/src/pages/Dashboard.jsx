export default function Dashboard() {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-agroGreen mb-8">
        Farmer Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          🌦️ Weather
          <p className="text-2xl font-bold mt-2">Live</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          🌾 Crop Health
          <p className="text-2xl font-bold mt-2 text-green-600">Good</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          📈 Price Trend
          <p className="text-2xl font-bold mt-2">Rising</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          🚨 Alerts
          <p className="text-2xl font-bold mt-2 text-yellow-600">1 New</p>
        </div>
      </div>
    </div>
  );
}
