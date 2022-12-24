import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Access-Control-Allow-Origin": "*" },
});
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("accessToken")}`;

export default instance;
