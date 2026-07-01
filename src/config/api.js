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

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {

    console.log("INTERCEPTOR STATUS:",
      error.response?.status
    );

    if (error.response?.status === 401) {
      console.log("REDIRECTING TO LOGIN");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default API;