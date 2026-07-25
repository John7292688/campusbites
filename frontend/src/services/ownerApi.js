import axios from "axios";

const ownerApi = axios.create({
  baseURL: "http://localhost:5000/api",
});

ownerApi.interceptors.request.use(
  (config) => {
    const ownerToken = localStorage.getItem("ownerToken");

    if (ownerToken) {
      config.headers.Authorization = `Bearer ${ownerToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default ownerApi;