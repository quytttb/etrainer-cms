import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
