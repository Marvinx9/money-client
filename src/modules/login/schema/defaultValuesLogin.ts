import { z } from "zod";
import { LoginFormSchema } from "./loginFormSchema";

const defaultValuesLogin: z.infer<typeof LoginFormSchema> = {
	usuario: "",
	senha: "",
	remember: false,
};

export { defaultValuesLogin };
typeof LoginFormSchema;
