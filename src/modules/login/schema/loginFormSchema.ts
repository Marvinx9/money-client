import { z } from "zod";

const LoginFormSchema = z.object({
	usuario: z.string().min(6, {
		message: "Usuário deve conter pelo menos 6 caracteres",
	}),
	senha: z.string().min(6, {
		message: "Senha deve conter pelo menos 6 caracteres",
	}),
	remember: z.boolean(),
});

export { LoginFormSchema };
