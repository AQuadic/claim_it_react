// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://offerms-dashboard.aquadic.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
