import { Pagination } from "@shared/types/pagination.dto";
import { PageResponse } from "@shared/types/pageResponse";

type ListUsuarioInputDto = Pagination & {
	nome: string;
}

type ListUsuarioOutputDto = PageResponse & {
	data: UsuarioOutput[];
};

type UsuarioOutput = {
	id: number;
	nnumeusua: number
	cncomusua: string,
	cnomeusua: string,
	id_filial: number
	nome_filial: string
};

export type { ListUsuarioInputDto, UsuarioOutput, ListUsuarioOutputDto };

