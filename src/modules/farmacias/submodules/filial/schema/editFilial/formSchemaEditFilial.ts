import { z } from "zod";

const FormSchemaEditFilial = z.object({
	nome: z.string().min(3, {
		message: "Um nome de filial deve ser digitado.",
	}),
	id_farmacia: z.number().min(1, {
		message: "Uma farmácia deve ser selecionada.",
	}),
	farmacia: z.string().min(3, {
		message: "Uma farmácia deve ser selecionada.",
	}),
	status: z.boolean(),
});

export { FormSchemaEditFilial };
