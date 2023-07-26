import axios from "axios";
import * as SecureStore from "expo-secure-store";

// const BASE_URL = "http://192.168.0.181:8000";
// const BASE_URL = "//192.168.1.79:19000";
const BASE_URL = "http://localhost:8000";

const instance = axios.create({
  baseURL: BASE_URL + "/api",
});

instance.interceptors.request.use((config) => {
  const token = SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { BASE_URL };
export default instance;
