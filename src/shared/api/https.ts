import { baseURL } from "../configs/paths";
// import { refreshTokenService } from "@services/refreshToken/refreshToken.service";
import axios from "axios";
import toast from "react-hot-toast";

function httpClientBuilder() {
  const client = axios.create({ baseURL });

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("@access_token");
    const refreshToken = localStorage.getItem("@refresh_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${
        config.url?.includes("refresh-token") ? refreshToken : token
      }`;
    }
    return config;
  });

  client.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !originalRequest.url?.includes("refresh-token")
      ) {
        try {
          //   await refreshTokenService.execute(client);
          toast.error(
            "Erro de conexão.\nVerifique sua conexão com a internet e tente novamente."
          );
          return client.request(error.config);
        } catch (err) {
          localStorage.clear();
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
