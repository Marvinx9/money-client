import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { GetUserInputDto, GetUserOutputDto } from "./getUser.dto";

class GetUsersService {
	constructor(private readonly api: AxiosInstance) { }

	async execute(data: GetUserInputDto): Promise<GetUserOutputDto[]> {
		const response = await this.api<GetUserOutputDto[]>("/farmacia/gerenciamento/usuarios", { params: data })
		return response.data
	}
}

const useGetUsersService = new GetUsersService(http)

export { GetUsersService, useGetUsersService };

