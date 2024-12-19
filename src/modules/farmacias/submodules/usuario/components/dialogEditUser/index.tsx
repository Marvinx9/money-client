import { errorHandler } from "@api/errorHandler";
import {
	OptionSelectPaginate,
	SelectPaginate,
} from "@components/selectPaginate";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import {
	Form
} from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import { z } from "zod";
import { formSchema } from "../../schemas/formSchema";
import { UsuarioOutput } from "../../services/getUserFilial/listUsuario.dto";
import { useUpdateUserService } from "../../services/updateUser/update.service";
import { UpdateUserDto } from "../../services/updateUser/updateUser.dto";
import { treatsText } from "@shared/utils/filter";
import { listFilialService } from "@modules/farmacias/submodules/filial/service/listFiliais/listFilial.service";

type Props = {
	userSelected: UsuarioOutput;
	isOpen: boolean;
	handleClose: () => void;
};

function DialogEditUser({ userSelected, isOpen, handleClose }: Props) {
	const [searchFilial, setSearchFilial] = useState("");
	const [listFilial, setListFilial] = useState<OptionSelectPaginate[]>(
		[]
	);
	const refButton = useRef<HTMLButtonElement | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	async function getFarmacia() {
		if (searchFilial) {
			try {
				const result = await listFilialService.execute({
					nome: searchFilial,
					page: 1,
					size: 10,
				});
				const treatedProcedimentos: OptionSelectPaginate[] = result.data.map(
					(item) => ({
						value: item.id.toString(),
						label: treatsText(item.nome),
					})
				);
				setListFilial(treatedProcedimentos);
			} catch (error) {
				errorHandler(error);
			}
		}
	}

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const params: UpdateUserDto = {
			id: data.id,
			id_filial: data.id_filial,
			id_usuario: data.id_usuario,
		};
		try {
			useUpdateUserService.execute(params);
			toast.success("Usuário editada com sucesso!");
			handleClose();
		} catch (error) {
			errorHandler(error);
		}
	}

	useEffect(() => {
		if (userSelected) {
			form.setValue("id_filial", userSelected.id_filial);
			form.setValue("filial", userSelected.nome_filial);
			form.setValue("id", userSelected.id);
			form.setValue("id_usuario", userSelected.nnumeusua);
			setSearchFilial(userSelected.nome_filial);
		}
	}, []);

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (searchFilial !== userSelected.nome_filial) {
				getFarmacia();
			}
		}, 750);

		return () => clearTimeout(debounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchFilial]);

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						<div className="flex items-center gap-2">
							<FiAlertCircle color="orange" size={24} />
							Edição do usuário.
						</div>
					</DialogTitle>
					<DialogDescription>
						Edição dos dados da filial{" "}
						<span className="text-tertiary font-semibold">
							{userSelected.cnomeusua}
						</span>
					</DialogDescription>
				</DialogHeader>
				<div className="w-full">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<SelectPaginate
								inputValue={searchFilial}
								label="Filial"
								options={listFilial}
								placeholder=""
								onInputValueChange={(e) => setSearchFilial(e)}
								setSelecionadoSelect={(e) => {
									form.setValue("id_filial", e ? Number(e.value) : 0);
									form.setValue("filial", e ? e.label : "");
								}}
							/>
							{form.formState.errors?.id_filial?.message && (
								<span className="text-red-500 text-xs">
									{form.formState.errors?.id_filial?.message}
								</span>
							)}
							<div className="w-full flex justify-end space-x-2 pt-6">
								<DialogClose asChild ref={refButton}>
									<Button type="button" variant="outline">
										Cancelar
									</Button>
								</DialogClose>
								<Button type="submit">Confirmar</Button>
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export { DialogEditUser };

