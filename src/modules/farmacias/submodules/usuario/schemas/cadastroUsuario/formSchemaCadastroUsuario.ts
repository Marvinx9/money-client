import { z } from "zod";

const FormSchemaCadastroUsuario = z.object({
	id_usuario: z.number().min(1, {
		message: "Um usuário deve ser selecionado.",
	}),
	id_filial: z.number().min(0, {
		message: "Uma filial deve ser selecionada.",
	}),
});

export { FormSchemaCadastroUsuario };
