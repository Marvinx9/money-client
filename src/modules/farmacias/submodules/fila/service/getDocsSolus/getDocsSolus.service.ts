import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { GetDocsSolusOutputDto } from "./getDocsSolus.dto";

class GetDocsSolusService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(nnumeguia: number): Promise<GetDocsSolusOutputDto> {
		const response = await this.api.get<GetDocsSolusOutputDto>("/laudos/memed", { params: { nnumeguia } });

		return response.data;
	}
}

const getDocsSolusService = new GetDocsSolusService(http);

export { getDocsSolusService, GetDocsSolusService };
