import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormProps } from "@shared/types/customFormProps";
import { FormRegisterBeneficiarioSchema } from "../schema/formRegisterBeneficarioSchema";
import { errorHandler } from "@api/errorHandler";
import { RegisterBeneficiarioInputDto } from "../services/registerBeneficiario/registerBeneficiario.dto";
import { registerBeneficiarioService } from "../services/registerBeneficiario/registerBeneficiario.service";
import toast from "react-hot-toast";

type Props = {
	onClose: () => void;
}

function useRegisterBeneficiarioForm({ onClose }: Props) {
	const form = useForm<z.infer<typeof FormRegisterBeneficiarioSchema>>({
		resolver: zodResolver(FormRegisterBeneficiarioSchema),
		defaultValues: {
			nome_completo: "",
			sexo: "",
			data_nascimento: "",
			cpf: "",
			telefone: "",
			email: "",
		},
	});

	const resgisterBeneficiarioForm: CustomFormProps = {
		form,
		onsubmit: form.handleSubmit((data) => {
			createBeneficiario(data)
		}),
		inputs: [
			{
				id: "nome_completo",
				name: "nome_completo",
				type: "text",
				label: "Nome",
				placeholder: "Digite o nome do beneficiário",
				styleDiv: "w-3/5 p-2",
			},
			{
				id: "sexo",
				name: "sexo",
				type: "select",
				label: "Sexo",
				placeholder: "Selecione o sexo do beneficiário",
				options: [
					{ label: "Masculino", value: "M" },
					{ label: "Feminino", value: "F" },
				],
				styleDiv: "w-1/5 p-2",
			},
			{
				id: "nascimento",
				name: "data_nascimento",
				type: "date",
				label: "Data de Nascimento",
				styleDiv: "w-1/5 p-2",
			},
			{
				id: "cpf",
				name: "cpf",
				mask: 'cpf',
				type: "string",
				label: "CPF",
				placeholder: "Inserir cpf do beneficiário",
				styleDiv: "w-1/3 p-2",
			},
			{
				id: "telefone",
				name: "telefone",
				mask: 'phone',
				type: "string",
				label: "Telefone",
				placeholder: "Digite o telefone do beneficiário",
				styleDiv: "w-1/3 p-2",
			},
			{
				id: "email",
				name: "email",
				type: "string",
				label: "Email",
				placeholder: "Inserir email do beneficiário",
				styleDiv: "w-1/3 p-2",
			},
		],
		styleForm: "w-full flex flex-row flex-wrap items-center gap-0",
		styleButtonDiv: "w-full p-2",
		styleButton: "w-1/3",
		buttonLabel: "Cadastrar Beneficiário",
	};

	async function createBeneficiario(data: z.infer<typeof FormRegisterBeneficiarioSchema>) {
		try {
			const params: RegisterBeneficiarioInputDto = {
				nome_completo: data.nome_completo,
				cpf: data.cpf,
				data_nascimento: data.data_nascimento,
				email: data.email,
				sexo: data.sexo,
				telefone: data.telefone,
			}
			await registerBeneficiarioService.execute(params);
			toast.success("Beneficiario Cadastrado com Sucesso!")
			form.reset();
			onClose();
		} catch (error) {
			errorHandler(error)
		}
	}

	return {
		resgisterBeneficiarioForm
	}
}

export { useRegisterBeneficiarioForm }