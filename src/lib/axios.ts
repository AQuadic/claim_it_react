// api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://voucher-laravel.test/api/coupons",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
