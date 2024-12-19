import { z } from "zod";

const formSchemaTriagem = z.object({
    peso: z.string().optional(),
    altura: z.string().optional(),
    imc: z.string().optional(),
    temperatura: z.string().optional(),
    saturacao: z.string().optional(),
    freq_cardiaca: z.string().optional(),
    freq_respiratoria: z.string().optional(),
    pres_arterial_min: z.string().optional(),
    pres_arterial_max: z.string().optional(),
    observacao: z.string().optional(),
    risco: z.string(),
});

type FormSchemaTriagem = z.infer<typeof formSchemaTriagem>;

export type { FormSchemaTriagem }
export { formSchemaTriagem };
