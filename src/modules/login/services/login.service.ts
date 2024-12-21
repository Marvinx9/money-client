import { AxiosInstance } from "axios";
import { LoginInputDto, LoginOutputDto } from "./login.dto";
import { http } from "../../../shared/api/https";
class LoginService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({
    username,
    password,
  }: LoginInputDto): Promise<LoginOutputDto> {
    try {
      const response = await this.api.post<LoginOutputDto>("/auth/login", {
        username,
        password,
      });
      const { access_token, refreshToken, ...userData } = response.data;

      localStorage.setItem("@access_token", access_token);
      localStorage.setItem("@user_data", JSON.stringify(userData));

      return response.data;
    } catch (error) {
      console.error("Erro no serviço de login:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Credenciais inválidas.");
    }
  }
}

const loginService = new LoginService(http);

export { loginService };
