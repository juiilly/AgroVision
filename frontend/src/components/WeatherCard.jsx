import { useState } from "react";
import { getWeather } from "../services/api";
import { motion } from "framer-motion";

export default function WeatherCard() {
  const [city, setCity] = useState("Pune");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

const fetchWeather = async () => {
  console.log("FETCHING WEATHER FOR:", city);
  setLoading(true);
  try {
    const res = await getWeather(city);
    console.log("WEATHER RESPONSE:", res);
    setData(res);
  } catch (err) {
    console.error("AXIOS ERROR:", err);
    alert("Failed to fetch weather");
  }
  setLoading(false);
};


  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-xl w-96"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4">Weather Monitor</h2>

      <input
        className="border p-2 w-full rounded mb-3"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        onClick={fetchWeather}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Loading..." : "Get Weather"}
      </button>

      {data && (
        <div className="mt-4">
          <p><b>City:</b> {data.city}</p>
          <p><b>Temperature:</b> {data.temperature}°C</p>
          <p><b>Humidity:</b> {data.humidity}%</p>
          <p><b>Condition:</b> {data.condition}</p>
        </div>
      )}
    </motion.div>
  );
}
