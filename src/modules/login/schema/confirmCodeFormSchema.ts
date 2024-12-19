import { z } from "zod";

const confirmCodeFormSchema = z.object({
	codigo: z.string().min(1, {
		message: "Digite um código válido",
	}),
});

type ConfirmCodeFormSchema = z.infer<typeof confirmCodeFormSchema>;

export { confirmCodeFormSchema };
export type { ConfirmCodeFormSchema };
