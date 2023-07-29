import axios from "axios";
import { getToken } from "./auth/storage";

// const BASE_URL = "http://192.168.0.181:8000";
const BASE_URL = "http://192.168.8.53:8000";
//const BASE_URL = "http://localhost:8000";
// const BASE_URL = "http://192.168.8.97:8080";
// const BASE_URL = "http://192.168.8.108:8000";

const instance = axios.create({
  baseURL: BASE_URL + "/api",
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { BASE_URL };
export default instance;
