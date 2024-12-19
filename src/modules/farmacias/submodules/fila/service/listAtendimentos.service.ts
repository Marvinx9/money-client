import { AxiosInstance } from "axios";
import { ListAtendimentosInputDto, ListAtendimentosOutputDto } from "./listAtendimentos.dto";
import { http } from "@api/https";

class ListAtendimentosService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: ListAtendimentosInputDto): Promise<ListAtendimentosOutputDto> {
        const response = await this.api.get<ListAtendimentosOutputDto>("/telemedicina/fila", { params: params })

        return response.data
    }
}

const listAtendimentosService = new ListAtendimentosService(http)

export { listAtendimentosService }