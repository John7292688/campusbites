import axios from "axios";

const studentApi = axios.create({
  baseURL: "http://localhost:5000/api",
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