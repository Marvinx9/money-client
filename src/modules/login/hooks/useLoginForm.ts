import { errorHandler } from "@api/errorHandler";
import { CustomFormProps } from "@customTypes/customFormProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useUserContext } from "../../../shared/context/user/useUserContext";
import { LoginFormSchema } from "../schema/loginFormSchema";
import { defaultValuesLogin } from "../schema/defaultValuesLogin";
import { loginService } from "../services/login.service";

function useLoginForm() {
	const navigate = useNavigate();
	const { user, userData, perfil } = useUserContext();
	const [loading, setLoading] = useState(false);
	const [forgotPassword, setForgotPassword] = useState(false);
	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: defaultValuesLogin,
	});

	const styleForm = "w-full h-full flex flex-col justify-evenly gap-4";

	const loginCustomForm: CustomFormProps = {
		form,
		loading,
		schema: LoginFormSchema,
		withErrors: true,
		onsubmit: form.handleSubmit((data) => {
			loginSubmit(data);
		}),
		inputs: [
			{
				name: "usuario",
				type: "text",
				label: "Usuário",
				id: "usuario",
				styleInputLabel: "text-base",
				styleDiv: "w-full",
			},
			{
				name: "senha",
				type: "password",
				label: "Senha",
				id: "senha",
				styleInputLabel: "text-base",
				styleDiv: "w-full",
			},
		],
		styleForm: styleForm,
		styleButton: "w-full bg-[#fc6e3a] text-white hover:bg-[#f68f69] gap-3",
		buttonLabel: "Continuar",
		// TODO: implementar lógica para recuperar senha
		// forgotPasswordLink: {
		// 	label: "Esqueci meu usuário/senha",
		// 	onClick: () => setForgotPassword(true),
		// },
	};

	function resetFormLogin() {
		form.reset();
		setForgotPassword(false);
	}

	async function loginSubmit({ usuario, senha }: z.infer<typeof LoginFormSchema>) {
		const params = {
			username: usuario,
			password: senha
		};
		toast.loading("Realizando login...");
		setLoading(true);
		try {
			const response = await loginService.execute(params);
			localStorage.setItem("@access_token", response.accessToken);
			localStorage.setItem("@id", response.id_usuario.toString());
			localStorage.setItem("@perfil", JSON.stringify(response.profiles));
			perfil.set(response.profiles);
			user.set(response.nome_usuario);
			userData.set({
				farmacia: response.farmacia,
				id_farmacia: response.id_farmacia,
				id_usuario: response.id_usuario,
				nome: response.nome,
				nome_usuario: response.nome_usuario,
				profiles: response.profiles
			});

			toast.success("Login realizado com sucesso!");
			navigate("/dashboard");
		} catch (error) {
			errorHandler(error);
		} finally {
			setLoading(false);
		}
	}

	return {
		loginCustomForm,
		loginSubmit,
		forgotPassword,
		resetFormLogin,
	};
}

export { useLoginForm };
