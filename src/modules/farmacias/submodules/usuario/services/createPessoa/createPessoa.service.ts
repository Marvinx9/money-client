import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { CreatePessoaInputDto } from "./createPessoa.dto";

class CreatePessoaService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: CreatePessoaInputDto) {
        await this.api.post('farmacia/gerenciamento/usuario', params)

    }
}

const useCreatePessoaService = new CreatePessoaService(http)

export { CreatePessoaService, useCreatePessoaService }