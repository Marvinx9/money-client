import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { CreateFilialInputDto } from "./createFilial.dto";

class CreateFilialService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(params: CreateFilialInputDto): Promise<void> {
		await this.api.post("/farmacia/gerenciamento/filial", params);
	}
}

const createFilialService = new CreateFilialService(http);

export { createFilialService, CreateFilialService };
