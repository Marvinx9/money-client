import { AxiosInstance } from "axios";
import { CriarUsuarioInputDto } from "./criarConta.dto";
import { http } from "../../../shared/api/https";

class CriarContaService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(data: CriarUsuarioInputDto): Promise<void> {
    await this.api.post<void>("/user", data);
  }
}
const criarContaService = new CriarContaService(http);

export { criarContaService };
