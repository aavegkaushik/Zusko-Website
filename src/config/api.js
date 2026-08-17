import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRedirectingToLogin = false;

API.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    console.log("API ERROR:", {
      status,
      url: error.config?.url,
      method: error.config?.method,
    });

    if (status === 401 && !isRedirectingToLogin) {
      isRedirectingToLogin = true;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/auth/login") {
        window.location.replace("/auth/login");
      }
    }

    return Promise.reject(error);
  }
);

export default API;