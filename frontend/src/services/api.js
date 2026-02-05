import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

/* Weather */
export const getWeather = (city) =>
  API.get(`/weather?city=${city}`).then((res) => res.data);

/* Market Prices */
export const getPrices = (state) =>
  API.get(`/prices?state=${state}&commodity=Rice`).then(
    (res) => res.data
  );

/* Price Prediction (GET-based) */
export const predictPrice = (commodity, state) =>
  API.get(`/predict?commodity=${commodity}&state=${state}`).then(
    (res) => res.data
  );

/* ✅ Prediction for PredictCard (POST-based) */
export const getPrediction = async (formData) => {
  const res = await API.post("/predict", formData);
  return res.data;
};
