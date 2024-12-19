import { errorHandler } from "@api/errorHandler";
import {
	OptionSelectPaginate,
	SelectPaginate,
} from "@components/selectPaginate";
import { Button } from "@components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { CreateFilialInputDto } from "../../service/createFilial/createFilial.dto";
import { createFilialService } from "../../service/createFilial/createFilial.service";
import { treatsText } from "@shared/utils/filter";
import { getFarmaciaService } from "../../service/getFarmacia/getFarmacia.service";
import { FormSchemaCadastroFilial } from "../../schema/cadastroFilial/formSchemaCadastroFilial";
import { defaultValuesCadastroFilial } from "../../schema/cadastroFilial/defaultValuesCadastroFilial";

const CadastroFilial = () => {
	const form = useForm<z.infer<typeof FormSchemaCadastroFilial>>({
		resolver: zodResolver(FormSchemaCadastroFilial),
		defaultValues: defaultValuesCadastroFilial,
	});
	const [search, setSearch] = useState("");
	const [listFarmacia, setListFarmacia] = useState<OptionSelectPaginate[]>([]);

	async function onSubmit(data: z.infer<typeof FormSchemaCadastroFilial>) {
		try {
			const params: CreateFilialInputDto = {
				nome: data.nome,
				id_farmacia: data.id_farmacia,
				status: 1,
			};
			toast.loading("Cadastrando filial...");
			await createFilialService.execute(params);
			toast.success("Filial cadastrada com sucesso!");
			form.reset();
			setSearch("");

		} catch (error) {
			errorHandler(error);
		}
	}

	async function loadFarmacia() {
		if (search) {
			try {
				const response = await getFarmaciaService.execute({
					nome: search,
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
		const debounce = setTimeout(() => {
			loadFarmacia();
		}, 750);

		return () => clearTimeout(debounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	return (
		<div className="p-4 w-full flex flex-col bg-gray-100 shadow-lg rounded-md">
			<h2 className="text-xl text-primary font-semibold">
				Cadastro de filiais
			</h2>
			<h3 className="text-zinc-500">
				Cadastre uma nova filial para a farmácia.
			</h3>
			<div className="w-3/5">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className=" grid grid-cols-12 gap-4 rounded-lg mt-4"
					>
						<div className="col-span-6">
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
						</div>
						<div className="col-span-6">
							<SelectPaginate
								inputValue={search}
								label="Pesquise pela farmácia"
								options={listFarmacia}
								placeholder=""
								onInputValueChange={(e) => setSearch(e)}
								setSelecionadoSelect={(e) =>
									form.setValue("id_farmacia", e ? Number(e.value) : 0)
								}
								clearInput={() => {
									setSearch("");
									setListFarmacia([]);
									form.setValue("id_farmacia", 0);
								}}
							/>
							{form.formState.errors?.id_farmacia?.message && (
								<span className="text-red-500 text-xs">
									{form.formState.errors?.id_farmacia?.message}
								</span>
							)}
						</div>
						<div className="col-span-12 flex justify-end">
							<Button type="submit" className="px-24">
								Cadastrar
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export { CadastroFilial };

