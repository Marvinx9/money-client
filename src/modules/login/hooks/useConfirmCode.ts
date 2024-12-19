import { CustomFormProps } from "@shared/types/customFormProps";
import { useForm } from "react-hook-form";
import {
	ConfirmCodeFormSchema,
	confirmCodeFormSchema,
} from "../schema/confirmCodeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

function useConfirmCode() {
	const [codeConfirmed, setCodeConfirmed] = useState(false);
	const form = useForm<ConfirmCodeFormSchema>({
		resolver: zodResolver(confirmCodeFormSchema),
		defaultValues: { codigo: "" },
	});

	const styleForm = "w-full h-full flex flex-col justify-evenly";

	const confirmCodeForm: CustomFormProps = {
		form,
		onsubmit: form.handleSubmit(submitConfirmCode),
		schema: confirmCodeFormSchema,
		withErrors: true,
		inputs: [
			{
				label: "Código de Confirmação",
				name: "codigo",
				id: "codigo",
				type: "text",
			},
		],
		styleForm: styleForm,
		styleButton: "w-full bg-[#fc6e3a] text-white hover:bg-[#f68f69] gap-3",
		buttonLabel: "Validar",
	};

	function resetFormCodeConfirmed() {
		form.reset();
		setCodeConfirmed(false);
	}

	async function submitConfirmCode() {
		setCodeConfirmed(true);
	}

	return {
		confirmCodeForm,
		codeConfirmed,
		resetFormCodeConfirmed,
	};
}

export { useConfirmCode };
