import axios from "axios";
import { isTokenExpired, clearAuthStorage } from "../utils/auth";

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
      if (isTokenExpired(token)) {
        clearAuthStorage();
        window.dispatchEvent(new CustomEvent("auth:session-expired"));
      } else {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
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

    if (status === 401) {
      const url = error.config?.url || "";
      const isAuthEndpoint =
        url.includes("/auth/login") ||
        url.includes("/auth/send-otp");

      const hadToken = Boolean(
        localStorage.getItem("token") ||
        error.config?.headers?.Authorization
      );

      if (hadToken && !isAuthEndpoint) {
        console.warn("401 Unauthorized received for authenticated request. Clearing session.");
        clearAuthStorage();
        window.dispatchEvent(new CustomEvent("auth:session-expired"));
      }
    }

    return Promise.reject(error);
  }
);

export default API;