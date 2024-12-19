type GetDocsInputDto = {
	nnumeguia?: number;
	nr_sequencia?: number;
}

type GetDocsTasyOutputDto = {
	atestados: Laudos[];
	receitas: Laudos[];
	pedidos_exames: Laudos[];
}

type Laudos = {
	tipo?: string;
	content: string;
	dt_registro: string;
	paciente: string;
	medico: string;
	assinatura?: string;
}

export type { GetDocsInputDto, GetDocsTasyOutputDto, Laudos }