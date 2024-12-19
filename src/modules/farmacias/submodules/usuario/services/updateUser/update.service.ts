import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { UpdateUserDto } from "./updateUser.dto";


class UpdateUserService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(params: UpdateUserDto) {
		const response = await this.api.put('/farmacia/gerenciamento/usuario-filial', params)
		return response.data
	}
}

const useUpdateUserService = new UpdateUserService(http)

export { UpdateUserService, useUpdateUserService };

