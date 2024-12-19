import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { GetPrestadorSolusInputDto, GetPrestadorSolusOutputDto } from "./getPrestadorSolus.dto";

class GetPrestadorSolusService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: GetPrestadorSolusInputDto): Promise<GetPrestadorSolusOutputDto[]> {
        const response = await this.api.get<GetPrestadorSolusOutputDto[]>(
            "/farmacia/solus/agendamentos/agendas",
            { params: params }
        );
        return response.data;
    }
}

const getPrestadorSolusService = new GetPrestadorSolusService(http);

export { getPrestadorSolusService, GetPrestadorSolusService };
