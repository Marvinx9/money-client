import { Pagination } from "@shared/types/pagination.dto";

type GetFarmaciaInputDto = Pagination & {
	nome: string;
};

type GetFarmaciaOutputDto = {
	id: number;
	nome: string;
	status: number;
};

export type { GetFarmaciaInputDto, GetFarmaciaOutputDto };
