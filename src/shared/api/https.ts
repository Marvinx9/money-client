import { baseURL } from "../configs/paths";
import axios from "axios";

function httpClientBuilder() {
  const client = axios.create({ baseURL });

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("@access_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });


  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn("Erro de autenticação: 401.");
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
  
      throw error;
    }
  );

  return client;
}

const http = httpClientBuilder();

export { http };
