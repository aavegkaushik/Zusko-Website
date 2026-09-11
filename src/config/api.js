import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================
API.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    console.log("API ERROR:", {
      status,
      url: error.config?.url,
      method: error.config?.method,
    });

    // IMPORTANT:
    // Do NOT globally redirect on every 401.
    //
    // Public APIs can legitimately return 401 when the user
    // is logged out. Example:
    //
    // GET /coupons/available
    //
    // That should NOT force the entire website to login.
    return Promise.reject(error);
  }
);

export default API;