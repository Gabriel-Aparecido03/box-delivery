import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({ baseURL: import.meta.env.VITE_APP_BASE_URL })
api.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = `Bearer ${await Cookies.get('token')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export { api }