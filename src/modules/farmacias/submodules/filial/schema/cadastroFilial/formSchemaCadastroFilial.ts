import { z } from "zod";

const FormSchemaCadastroFilial = z.object({
	nome: z.string().min(3, {
		message: "Um nome de filial deve ser digitado.",
	}),
	id_farmacia: z.number().min(0, {
		message: "Uma farmácia deve ser selecionada.",
	}),
});

export { FormSchemaCadastroFilial };
