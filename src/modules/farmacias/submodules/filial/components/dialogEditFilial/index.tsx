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
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Switch } from "@components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import { z } from "zod";
import { editFilialService } from "../../service/editFilial/editFilial.service";
import { FilialOutput } from "../../service/listFiliais/listFiliais.dto";
import { treatsText } from "@shared/utils/filter";
import { getFarmaciaService } from "../../service/getFarmacia/getFarmacia.service";
import { FormSchemaEditFilial } from "../../schema/editFilial/formSchemaEditFilial";
import { defaultValuesEditFilial } from "../../schema/editFilial/defaultValuesEditalFilial";
import { useRequestFilial } from "../listFilial/useFiliaisPage";

type Props = {
	filialSelected: FilialOutput;
	isOpen: boolean;
	handleClose: () => void;
};

const DialogEditFilial = ({ filialSelected, isOpen, handleClose }: Props) => {
	const { loadFiliais } = useRequestFilial();
	const form = useForm<z.infer<typeof FormSchemaEditFilial>>({
		resolver: zodResolver(FormSchemaEditFilial),
		defaultValues: defaultValuesEditFilial,
	});
	const refButton = useRef<HTMLButtonElement | null>(null);
	const [searchFarmacia, setSearchFarmacia] = useState("");
	const [listFarmacia, setListFarmacia] = useState<OptionSelectPaginate[]>([]);

	async function onSubmit(data: z.infer<typeof FormSchemaEditFilial>) {
		const params = {
			id: filialSelected.id!,
			nome: data.nome,
			id_farmacia: data.id_farmacia,
			status: data.status ? 1 : 0,
		};
		try {
			toast.loading("Editando filial...");
			await editFilialService.execute(params);
			toast.success("Filial editada com sucesso!");
			refButton.current?.click();
			loadFiliais()
		} catch (error) {
			errorHandler(error);
		}
	}

	async function loadFarmacia() {
		if (searchFarmacia) {
			try {
				const response = await getFarmaciaService.execute({
					nome: searchFarmacia,
					page: 1,
					size: 10,
				});

				const treatedProcedimentos: OptionSelectPaginate[] = response.map(
					(item) => ({
						value: item.id.toString(),
						label: treatsText(item.nome),
					})
				);

				setListFarmacia(treatedProcedimentos);
			} catch (error) {
				errorHandler(error);
			}
		}
	}

	useEffect(() => {
		if (filialSelected) {
			form.setValue("nome", treatsText(filialSelected.nome));
			form.setValue("status", filialSelected.status === 1 ? true : false);
			form.setValue("id_farmacia", filialSelected.id_farmacia);
			form.setValue("farmacia", filialSelected.nome_farmacia);
			setSearchFarmacia(filialSelected.nome_farmacia);
		}
	}, []);

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (searchFarmacia !== filialSelected.nome_farmacia) {
				loadFarmacia();
			}
		}, 750);

		return () => clearTimeout(debounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchFarmacia]);

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						<div className="flex items-center gap-2">
							<FiAlertCircle color="orange" size={24} />
							Edição da filial
						</div>
					</DialogTitle>
					<DialogDescription>
						Edição dos dados da filial{" "}
						<span className="text-tertiary font-semibold">
							{filialSelected.nome}.
						</span>
					</DialogDescription>
				</DialogHeader>
				<div className="w-full">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-3"
						>
							<FormField
								control={form.control}
								name="nome"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome da filial:</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<SelectPaginate
								inputValue={searchFarmacia}
								label="Farmácia"
								options={listFarmacia}
								placeholder=""
								onInputValueChange={(e) => setSearchFarmacia(e)}
								setSelecionadoSelect={(e) => {

									form.setValue("id_farmacia", e ? Number(e.value) : 0);
									form.setValue("farmacia", e ? e.label : "");
								}}
							/>
							{form.formState.errors?.id_farmacia?.message && (
								<span className="text-red-500 text-xs">
									{form.formState.errors?.id_farmacia?.message}
								</span>
							)}

							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
										<div className="space-y-0.5">
											<FormLabel>Status</FormLabel>
											<FormDescription>
												Informa se a empresa está ativa ou inativa.
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

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
};

export { DialogEditFilial };

