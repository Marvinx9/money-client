import { errorHandler } from "@api/errorHandler";
import { ActionButton } from "@components/types/ActionButton";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useEffect, useState } from "react";
import { MdModeEdit, MdSearch } from "react-icons/md";
import { PiArrowClockwiseBold } from "react-icons/pi";
import { tableColumnsUsuarioFilial } from "../../components/tableColumnsUsuario";
import {
	UsuarioOutput,
} from "../../services/getUserFilial/listUsuario.dto";
import { useListUsuariosService } from "../../services/getUserFilial/listUsuario.service";
import { DialogEditUser } from "../dialogEditUser";
// import { RegisterPessoaComponent } from "../registerPessoa";
import { usePagination } from "../../../../../../shared/hooks/pagination/usePagination";
import { DataTable } from "@components/dataTable";
import { Pagination } from "@components/dataTable/pagination";

function ListUserComponent() {
	const [isLoading, setIsLoading] = useState(false);
	const [searchUsuario, setSearchUsuario] = useState("");
	const [usuarios, setUsuarios] = useState<UsuarioOutput[]>([]);
	const [isOpenDialogEditUser, setIsOpenDilogEditFilial] = useState(false);
	const [userSelected, setUserSelected] = useState<UsuarioOutput>(
		{} as UsuarioOutput
	);
	const { handleNextPage, handlePreviousPage, handleSelectPerPage, pageInfo } =
		usePagination();

	const actionsUser: ActionButton[] = [
		{
			label: "Editar Usuário",
			icon: <MdModeEdit />,
			onClick: (row: UsuarioOutput) => {
				setUserSelected(row);
				setIsOpenDilogEditFilial(true);
			},
		},
	];

	async function loadUsuarios(page: number, perPage: number) {
		if (searchUsuario === "") return;
		const params = {
			nome: searchUsuario,
			page: page,
			size: perPage,
		};
		try {
			setIsLoading(true);
			const result = await useListUsuariosService.execute(params);
			setUsuarios(result.data);
			pageInfo.set({
				...pageInfo.value,
				total: result.total,
			});
		} catch (error) {
			errorHandler(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		const debounce = setTimeout(() => {
			loadUsuarios(pageInfo.value.page, pageInfo.value.perPage);
		}, 750);

		return () => clearTimeout(debounce);
	}, [searchUsuario, pageInfo.value.page, pageInfo.value.perPage]);

	return (
		<>
			<div className="p-4 w-full flex flex-col mt-6">
				<h2 className="text-xl text-primary font-semibold">
					Listagem de usuários vinculados com filiais
				</h2>
				<h3 className="text-zinc-500">
					Pesquise por um usuário abaixo para editar a filial do mesmo. Obs: Só
					serão listados usuários que já possuem vinculo com alguma filial.
				</h3>
				<div className="mt-6">
					<div className="space-y-2 mb-3 flex items-center justify-between">
						<div className="w-5/12 relative">
							<Input
								id="usuario"
								placeholder="Pesquise por uma usuário"
								value={searchUsuario}
								onChange={(e) => {
									pageInfo.set((prev) => ({ ...prev, page: 1 }));
									setSearchUsuario(e.target.value);
								}}
							/>
							<div className="absolute top-3 right-2 border-l-2 pl-2">
								<MdSearch size={18} />
							</div>
						</div>
						<div className="flex items-center gap-2">
							{/* <RegisterPessoaComponent /> */}

							<Button
								size="sm"
								className="space-x-2 font-semibold"
								onClick={() => loadUsuarios(pageInfo.value.page, pageInfo.value.perPage)}
							>
								<PiArrowClockwiseBold />
								<span>Atualizar</span>
							</Button>
						</div>
					</div>
					<DataTable
						actions={actionsUser}
						isLoading={isLoading}
						columns={tableColumnsUsuarioFilial}
						data={usuarios}
					/>
					{usuarios.length > 0 ? (
						<Pagination
							pageInfo={pageInfo.value}
							handleSelectPerPage={handleSelectPerPage}
							handlePreviousPage={handlePreviousPage}
							handleNextPage={handleNextPage}
						/>
					) : (<></>)}
				</div>
			</div>
			{isOpenDialogEditUser && (
				<DialogEditUser
					isOpen={isOpenDialogEditUser}
					handleClose={() => setIsOpenDilogEditFilial(false)}
					userSelected={userSelected}
				/>
			)}
		</>
	);
}
export { ListUserComponent };

