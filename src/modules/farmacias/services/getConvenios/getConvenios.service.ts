import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { GetConveniosInputDto, GetConveniosOutputDto } from "./getConvenios.dto";

class GetConveniosService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params?: GetConveniosInputDto): Promise<GetConveniosOutputDto[]> {
        const response = await this.api.get<GetConveniosOutputDto[]>(
            "/convenio",
            { params: params }
        );
        return response.data;
    }
}

const getConveniosService = new GetConveniosService(http);

export { getConveniosService, GetConveniosService };
