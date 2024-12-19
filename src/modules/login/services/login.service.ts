import { AxiosInstance } from "axios";
import { LoginInputDto, LoginOutputDto } from "./login.dto";
import { http } from "../../../shared/api/https";
class LoginService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({
    username,
    password,
    remembe_me,
  }: LoginInputDto): Promise<LoginOutputDto> {
    const response = await this.api.post<LoginOutputDto>("/auth/login", {
      username,
      password,
    });
    const { accessToken, refreshToken, ...userData } = response.data;

    localStorage.setItem("@access_token", accessToken);
    localStorage.setItem("@user_data", JSON.stringify(userData));

    if (remembe_me) {
      localStorage.setItem("@refresh_token", refreshToken);
    }

    return response.data;
  }
}

const loginService = new LoginService(http);

export { loginService };
