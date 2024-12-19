import { errorHandler } from "@api/errorHandler";
import {
	OptionSelectPaginate,
	SelectPaginate,
} from "@components/selectPaginate";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListFiliaisInputDto } from "@modules/farmacias/submodules/filial/service/listFiliais/listFiliais.dto";
import { listFilialService } from "@modules/farmacias/submodules/filial/service/listFiliais/listFilial.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { formSchemaCreate } from "../../schemas/formSchema";
import { CreateUserDto } from "../../services/createUser/createUser.dto";
import { useCreateUserService } from "../../services/createUser/createUser.service";
import { GetUserInputDto } from "../../services/getUser/getUser.dto";
import { useGetUsersService } from "../../services/getUser/getUser.service";
import { treatsText } from "@shared/utils/filter";

function RegisterUserComponent() {
	const form = useForm<z.infer<typeof formSchemaCreate>>({
		resolver: zodResolver(formSchemaCreate),
	});
	const [searchFilial, setSearchFilial] = useState("");
	const [searchUser, setSearchUser] = useState("");
	const [listFarmacia, setListFarmacia] = useState<OptionSelectPaginate[]>([]);
	const [listUsers, setListUsers] = useState<OptionSelectPaginate[]>([]);

	async function onSubmitForm(data: z.infer<typeof formSchemaCreate>) {
		const params: CreateUserDto = {
			id_filial: data.id_filial,
			id_usuario: data.id_usuario,
		};

		toast.loading("Cadastrando usuario...");

		try {
			await useCreateUserService.execute(params);
			toast.success("Usuário cadastrado com sucesso!");
			form.reset();
			setSearchFilial("");
			setSearchUser("");
		} catch (error) {
			errorHandler(error);
		}
	}

	async function loadUsers() {
		if (searchUser) {
			try {
				const params: GetUserInputDto = {
					nome: searchUser,
					page: 1,
					size: 10,
				};
				const result = await useGetUsersService.execute(params);

				const treatedUser: OptionSelectPaginate[] = result.map((item) => ({
					value: item.nnumeusua.toString(),
					label: treatsText(item.cncomusua),
					highlightedLabel: treatsText(item.c_cpfusua),
				}));

				setListUsers(treatedUser);
			} catch (error) {
				errorHandler(error);
			}
		}
	}

	async function loadFilial() {
		if (searchFilial) {
			try {
				const data: ListFiliaisInputDto = {
					nome: searchFilial,
					page: 1,
					size: 10,
				};
				const response = await listFilialService.execute(data);

				const treatedProcedimentos: OptionSelectPaginate[] = response.data.map(
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
			loadFilial();
		}, 750);

		return () => clearTimeout(debounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchFilial]);

	useEffect(() => {
		const debounce = setTimeout(() => {
			loadUsers();
		}, 750);

		return () => clearTimeout(debounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchUser]);

	return (
		<div className="p-4 w-full flex flex-col bg-gray-100 shadow-lg rounded-md">
			<h2 className="text-xl text-primary font-semibold">
				Vínculo de usuário com filial
			</h2>
			<h3 className="text-zinc-500">
				Pesquise por um usuário abaixo para vincular com uma filial cadastrada.
			</h3>
			<div className="w-3/5">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmitForm)}
						className="grid grid-cols-12 gap-4 rounded-lg mt-4"
					>
						<div className="col-span-6">
							<SelectPaginate
								inputValue={searchUser}
								label="Pesquise pelo nome de usuário."
								options={listUsers}
								placeholder=""
								onInputValueChange={(e) => setSearchUser(e)}
								setSelecionadoSelect={(e) =>
									form.setValue("id_usuario", e ? Number(e.value) : 0)
								}
								clearInput={() => {
									setListUsers([]);
									form.setValue("id_usuario", 0);
									setSearchUser("");
								}}
							/>
							{form.formState.errors?.id_usuario?.message && (
								<span className="text-red-500 text-xs">
									{form.formState.errors?.id_usuario?.message}
								</span>
							)}
						</div>
						<div className="col-span-6">
							<SelectPaginate
								inputValue={searchFilial}
								label="Pesquise pela filial."
								options={listFarmacia}
								placeholder=""
								onInputValueChange={(e) => setSearchFilial(e)}
								setSelecionadoSelect={(e) =>
									form.setValue("id_filial", e ? Number(e.value) : 0)
								}
								clearInput={() => {
									setListFarmacia([]);
									form.setValue("id_filial", 0);
									setSearchFilial("");
								}}
							/>
							{form.formState.errors?.id_filial?.message && (
								<span className="text-red-500 text-xs">
									{form.formState.errors?.id_filial?.message}
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
}

export { RegisterUserComponent };

