const API_BASE = import.meta.env.VITE_BACKEND_URL;
console.log("BACKEND URL:", import.meta.env.VITE_BACKEND_URL);

export async function getWeather(city) {
  const response = await fetch(
    `${API_BASE}/weather?city=${encodeURIComponent(city)}`
  );

  if (!response.ok) {
    throw new Error("Backend error");
  }

  return response.json();
}

export async function getPrices(state) {
  const res = await fetch(`${API_BASE}/prices?state=${state}`);
  if (!res.ok) throw new Error("Failed to fetch prices");
  return res.json();
}

export async function getPrediction(commodity, state) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/predict?commodity=${commodity}&state=${state}`
  );
  return res.json();
}