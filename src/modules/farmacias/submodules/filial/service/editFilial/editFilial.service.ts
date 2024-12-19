import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { EditFilialInputDto } from "./editFilial.dto";

class EditFilialService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(params: EditFilialInputDto): Promise<void> {
		await this.api.put("/farmacia/gerenciamento/filial", params);
	}
}

const editFilialService = new EditFilialService(http);

export { editFilialService, EditFilialService };
