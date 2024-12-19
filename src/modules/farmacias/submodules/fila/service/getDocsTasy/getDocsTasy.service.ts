import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { GetDocsTasyOutputDto } from "./getDocsTasy.dto";

class GetDocsTasyService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(nr_sequencia: number): Promise<GetDocsTasyOutputDto> {
		const response = await this.api.get<GetDocsTasyOutputDto>("laudos", { params: { nr_sequencia } });

		return response.data;
	}
}

const getDocsTasyService = new GetDocsTasyService(http);

export { getDocsTasyService, GetDocsTasyService };
