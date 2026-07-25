import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const ownerToken = localStorage.getItem("ownerToken");
    const studentToken = localStorage.getItem("token");

    // Use owner token if available, otherwise student token
    const token = ownerToken || studentToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;