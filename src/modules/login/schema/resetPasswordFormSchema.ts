import { z } from "zod";

const resetPasswordFormSchema = z
	.object({
		senha: z.string().min(6, {
			message: "A senha deve conter pelo menos 6 caracteres",
		}),
		confirmarSenha: z.string().min(6, {
			message:
				"A confirmação de senha deve conter pelo menos 6 caracteres",
		}),
	})
	.refine((data) => data.senha === data.confirmarSenha, {
		message: "As senhas não coincidem",
		path: ["confirmarSenha"],
	});

type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;

export { resetPasswordFormSchema };
export type { ResetPasswordFormSchema };
