import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { ListUsuarioInputDto, ListUsuarioOutputDto } from "./listUsuario.dto";

class ListUsuariosService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(data: ListUsuarioInputDto): Promise<ListUsuarioOutputDto> {
		const response = await this.api<ListUsuarioOutputDto>("/farmacia/gerenciamento/usuario-filial", { params: data })

		return response.data
	}
}

const useListUsuariosService = new ListUsuariosService(http)

export { ListUsuariosService, useListUsuariosService };

