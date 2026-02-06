import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

/* Weather */
export const getWeather = (city) =>
  API.get(`/weather?city=${city}`).then((res) => res.data);

/* Market Prices */
export const getPrices = (state) =>
  API.get(`/prices?state=${state}&commodity=Rice`)
    .then((res) => res.data);

/* ✅ Price Prediction (SINGLE SOURCE OF TRUTH) */
export const getPrediction = (commodity, state) =>
  API.get(`/predict?commodity=${commodity}&state=${state}`)
    .then((res) => res.data);
