import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { postUsuarioSolusInputDto } from "./postTriagemSolus.dto";

class PostTriagemSolusService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: postUsuarioSolusInputDto): Promise<void> {
        await this.api.post("/farmacia/solus/agendamentos/triagem", params);
    }
}

const postTriagemSolusService = new PostTriagemSolusService(http);

export { postTriagemSolusService, PostTriagemSolusService };
