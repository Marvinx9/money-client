import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { GetFarmaciaInputDto, GetFarmaciaOutputDto } from "./getFarmacia.dto";

class GetFarmaciaService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(params: GetFarmaciaInputDto): Promise<GetFarmaciaOutputDto[]> {
		const response = await this.api.get<GetFarmaciaOutputDto[]>(
			"/farmacia/gerenciamento/farmacias",
			{ params: params }
		);
		return response.data;
	}
}

const getFarmaciaService = new GetFarmaciaService(http);

export { getFarmaciaService, GetFarmaciaService };
