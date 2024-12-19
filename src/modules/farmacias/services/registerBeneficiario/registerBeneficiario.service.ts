import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { RegisterBeneficiarioInputDto } from "./registerBeneficiario.dto";

class RegisterBeneficiarioService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: RegisterBeneficiarioInputDto): Promise<void> {
        await this.api.post<void>("/beneficiario", params);
    }
}

const registerBeneficiarioService = new RegisterBeneficiarioService(http);

export { registerBeneficiarioService, RegisterBeneficiarioService };
