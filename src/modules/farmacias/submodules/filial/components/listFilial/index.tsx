import { useState } from "react";
import { tableColumnsCadastroFilial } from "../tableColumnsCadastroFilial";
import { FilialOutput } from "../../service/listFiliais/listFiliais.dto";
import { MdModeEdit, MdSearch } from "react-icons/md";
import { ActionButton } from "@components/types/ActionButton";
import { Input } from "@components/ui/input";
import { DialogEditFilial } from "../dialogEditFilial";
import { useRequestFilial } from "./useFiliaisPage";
import { DataTable } from "@components/dataTable";
import { Button } from "@components/ui/button";
import { PiArrowClockwiseBold } from "react-icons/pi";

const ListFilial = () => {
	const {
		handleNextPage,
		handlePreviousPage,
		handleSelectPerPage,
		pageInfo,
		filial,
		search,
		loadFiliais,
	} = useRequestFilial();

	const [filialSelected, setFilialSelected] = useState<FilialOutput>(
		{} as FilialOutput
	);
	const [isOpenDilogEditFilial, setIsOpenDilogEditFilial] = useState(false);

	const actionsFiliais: ActionButton[] = [
		{
			label: "Editar filial",
			icon: <MdModeEdit />,
			onClick: (row: FilialOutput) => {
				setFilialSelected(row);
				setIsOpenDilogEditFilial(true);
			},
		},
	];

	return (
		<>
			<div className="p-4 w-full flex flex-col mt-6">
				<h2 className="text-xl text-primary font-semibold">
					Listagem de filiais
				</h2>
				<h3 className="text-zinc-500">
					Visualize a listagem de filiais cadastradas e edite a selecionada.
				</h3>
				<div className="mt-6">
					<div className="space-y-2 mb-3 flex items-center justify-between">
						<div className="w-5/12 relative">
							<Input
								id="filial"
								placeholder="Pesquise por uma filial"
								value={search.value}
								onChange={(e) => {
									pageInfo.set((prev) => ({ ...prev, page: 1 }));
									search.set(e.target.value);
								}}
							/>
							<div className="absolute top-3 right-2 border-l-2 pl-2">
								<MdSearch size={18} />
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Button
								size="sm"
								className="space-x-2 font-semibold"
								onClick={() => loadFiliais()}
							>
								<PiArrowClockwiseBold />
								<span>Atualizar</span>
							</Button>
						</div>
					</div>
					<DataTable
						actions={actionsFiliais}
						columns={tableColumnsCadastroFilial}
						data={filial.value}
						pageInfo={pageInfo.value}
						handleSelectPerPage={handleSelectPerPage}
						handlePreviousPage={handlePreviousPage}
						handleNextPage={handleNextPage}
					/>
				</div>
			</div>
			{isOpenDilogEditFilial && (
				<DialogEditFilial
					isOpen={isOpenDilogEditFilial}
					handleClose={() => setIsOpenDilogEditFilial(false)}
					filialSelected={filialSelected}
				/>
			)}
		</>
	);
};

export { ListFilial };
