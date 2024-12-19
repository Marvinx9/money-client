import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { CreateUserDto } from "./createUser.dto";


class CreateUserService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(params: CreateUserDto) {
		const response = await this.api.post('/farmacia/gerenciamento/usuario-filial', params)
		return response.data
	}
}

const useCreateUserService = new CreateUserService(http)

export { CreateUserService, useCreateUserService };

