import axios from "axios";
import { config } from "../config/config";

const apiConfig = {
  baseURL: config.REST_ENDPOINTS_BASE_URL,
};

const http = axios.create(apiConfig);

export { http };
