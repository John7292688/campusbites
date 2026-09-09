import axios from "axios";

const studentApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

studentApi.interceptors.request.use(
  (config) => {
    const studentToken = localStorage.getItem("token");

    if (studentToken) {
      config.headers.Authorization = `Bearer ${studentToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default studentApi;