import { z } from "zod";

const FormRegisterBeneficiarioSchema = z.object({
    nome_completo: z.string().min(6, {
        message: "Nome é obrigatório.",
    }),
    cpf: z.string().min(14, {
        message: "Cpf é obrigatório.",
    }).max(14, {
        message: "Cpf Inválido."
    }),
    data_nascimento: z.string().min(10, {
        message: "Data de nascimento é obrigatório.",
    }),
    sexo: z.string().min(1, {
        message: "Sexo é obrigatório.",
    }),
    email: z.string().min(6, {
        message: "Email é obrigatório.",
    }),
    telefone: z.string().min(11, {
        message: "Telefone é obrigatório.",
    }),
});

export { FormRegisterBeneficiarioSchema };
