import { z } from "zod"

export const formSchema = z.object({
	id: z.number(),
	filial: z.string().min(3, {
		message: "Selecione uma filial",
	}),
	id_filial: z.number().min(1, {
		message: "Selecione uma filial",
	}),
	id_usuario: z.number().min(1, {
		message: "Selecione um usuário",
	}),
})

export const formSchemaCreate = z.object({
	id_filial: z.number().min(1, {
		message: "Selecione uma filial",
	}),
	id_usuario: z.number().min(1, {
		message: "Selecione um usuário",
	}),
})

export const createUserFormSchema = z.object({
	cncomusua: z.string().min(6, {
		message: "Nome precisa ter pelo menos 6 caracteres."
	}),
	cpf_pessoa: z.string().min(1, {
		message: "Campo Obrigátorio!"
	}),
	nnumeperf: z.string(),
	usuario: z.string(),
})

export type CreateUserFormSchema = z.infer<typeof createUserFormSchema>
