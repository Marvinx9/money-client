import { z } from "zod";

const FormSearchPacienteSchema = z.object({
	periodo: z.string(),
	consulta: z.string(),
	nome: z.string()
})

export { FormSearchPacienteSchema }
