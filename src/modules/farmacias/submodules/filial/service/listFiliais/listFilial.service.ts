import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { ListFiliaisInputDto, ListFiliaisOutputDto } from "./listFiliais.dto";

class ListFilialService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(data: ListFiliaisInputDto): Promise<ListFiliaisOutputDto> {
		const response = await this.api.get<ListFiliaisOutputDto>(
			"/farmacia/gerenciamento/filiais-by-name",
			{
				params: data,
			}
		);

		return response.data;
	}
}

const listFilialService = new ListFilialService(http);

export { listFilialService, ListFilialService };
