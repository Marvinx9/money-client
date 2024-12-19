import { PageResponse } from "@shared/types/pageResponse";
import { Pagination } from "@shared/types/pagination.dto";

type ListFiliaisInputDto = Pagination & {
	nome: string;
};

type ListFiliaisOutputDto = PageResponse & {
	data: FilialOutput[];
};

type FilialOutput = {
	id: number;
	nome: string;
	nome_farmacia: string;
	id_farmacia: number;
	status: number;
};

export type { FilialOutput, ListFiliaisInputDto, ListFiliaisOutputDto };
