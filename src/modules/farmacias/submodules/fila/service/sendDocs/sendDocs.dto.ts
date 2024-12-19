import { Laudos } from "../getDocsTasy/getDocsTasy.dto";

type SendDocsInputDto = {
	memed?: Laudos[];
	atestados?: Laudos[];
	receitas?: Laudos[];
	pedidos_exames?: Laudos[];
	email: string;
};

export type { SendDocsInputDto };