import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { postUsuarioTasyInputDto } from "./postTriagemTasy.dto";

class PostTriagemTasyService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: postUsuarioTasyInputDto): Promise<void> {
        await this.api.post("/farmacia/tasy/agendamentos/triagem", params);
    }
}

const postTriagemTasyService = new PostTriagemTasyService(http);

export { postTriagemTasyService, PostTriagemTasyService };
