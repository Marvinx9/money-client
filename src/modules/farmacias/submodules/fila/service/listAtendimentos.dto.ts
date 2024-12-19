type ListAtendimentosInputDto = {
	page: number;
	size: number;
	waiting_atendimento?: string;
	on_atendimento?: string;
	checkinOrder?: string;
	atendido?: string;
}

type ListAtendimentosOutputDto = {
	data: Atendimento[];
	page: number;
	size: number;
	total: number;
}

type Atendimento = {
	id_fila?: number;
	nnumeguia?: number;
	nr_sequencia?: number;
	paciente?: string;
	nome_prestador?: string;
	situacao?: string;
	demisguia?: string;
	hora?: string;
	tempo_criado?: string;
	session_id?: string;
	paciente_token?: string;
	modulo: string;
}

export type { Atendimento, ListAtendimentosInputDto, ListAtendimentosOutputDto }