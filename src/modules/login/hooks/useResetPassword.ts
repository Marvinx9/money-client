import { useForm } from "react-hook-form";
import {
	resetPasswordFormSchema,
	ResetPasswordFormSchema,
} from "../schema/resetPasswordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormProps } from "@shared/types/customFormProps";

function useResetPassword() {
	const form = useForm<ResetPasswordFormSchema>({
		resolver: zodResolver(resetPasswordFormSchema),
		defaultValues: {
			senha: "",
			confirmarSenha: "",
		},
	});

	const styleForm = "w-full h-full flex flex-col justify-evenly";

	const resetPasswordForm: CustomFormProps = {
		form,
		onsubmit: form.handleSubmit(submitForm),
		schema: resetPasswordFormSchema,
		withErrors: true,
		inputs: [
			{
				label: "Nova Senha",
				name: "senha",
				id: "senha",
				type: "password",
			},
			{
				label: "Confirmar Nova Senha",
				name: "confirmarSenha",
				id: "confirmarSenha",
				type: "confirmPassword",
			},
		],
		styleForm: styleForm,
		styleButton: "w-full bg-[#fc6e3a] text-white hover:bg-[#f68f69] gap-3",
		buttonLabel: "Continuar",
	};

	function resetFormResetPassword() {
		form.reset();
	}

	async function submitForm() {}

	return {
		resetPasswordForm,
		resetFormResetPassword,
	};
}

export { useResetPassword };
