import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { GetPrestadorTasyInputDto, GetPrestadorTasyOutputDto } from "./getPrestadorTasy.dto";

class GetPrestadorTasyService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: GetPrestadorTasyInputDto): Promise<GetPrestadorTasyOutputDto> {
        const response = await this.api.get<GetPrestadorTasyOutputDto>(
            "/farmacia/tasy/agendamentos/agendas",
            { params: params }
        );
        return response.data;
    }
}

const getPrestadorTasyService = new GetPrestadorTasyService(http);

export { getPrestadorTasyService, GetPrestadorTasyService };
