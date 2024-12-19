import { DataTable } from "@components/dataTable";
import { ActionButton } from "@components/types/ActionButton";
import { LuFileSearch } from "react-icons/lu";
import { useFilaContext } from "../../context/filaContext";
import { columnsFilaAtendidos } from "../columnsFilaAtendidos";
import { useEffect, useState } from "react";
import { EnvioDocumentos } from "../EnvioDocumentosAmparo";
import { AguardandoAtendimento } from "../../types/aguardandoAtendimento";
import { GetDocsInputDto } from "../../service/getDocsTasy/getDocsTasy.dto";
import { FilterPopover } from "@components/filter/Filter";
import dayjs from "dayjs";

const ListAtendidos = () => {
	const [openAnexos, setOpenAnexos] = useState<boolean>(false)
	const [selectedAtendimento, setSelectedAtendimento] = useState<GetDocsInputDto>()
	const {
		filaAtendidos,
		paginationAtendidos,
		loadFilaAtendidos,
	} = useFilaContext();

	const actionsAguardandoAtendimento: ActionButton[] = [
		{
			label: "Buscar documentos",
			icon: <LuFileSearch />,
			onClick: (row: AguardandoAtendimento) => {
				setSelectedAtendimento({
					nnumeguia: row.nnumeguia,
					nr_sequencia: row.nr_sequencia,
				})
				setOpenAnexos(true)
			},
		},
	];

	useEffect(() => {
		const debounce = setTimeout(() => {
			loadFilaAtendidos();
		}, 500);

		return () => clearTimeout(debounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paginationAtendidos.pageInfo.value.page, paginationAtendidos.pageInfo.value.perPage]);

	return (
		<>
			<div className="w-full flex flex-row-reverse mt-[-50px] pb-8">
				<FilterPopover
					variant={"default"}
					clickFilter={(data) => {
						loadFilaAtendidos(data);
					}}
					style={{
						width: "w-36",
					}}
					dataInicial={{
						label: "Data Inicial",
						defaultValues: dayjs().format("YYYY-MM-DD"),
					}}
					dataFinal={{
						label: "Data Final",
						defaultValues: dayjs().format("YYYY-MM-DD"),
					}}
				/>
			</div>
			<DataTable
				columns={columnsFilaAtendidos}
				data={filaAtendidos.value}
				actions={actionsAguardandoAtendimento}
				pageInfo={paginationAtendidos.pageInfo.value}
				handleNextPage={paginationAtendidos.handleNextPage}
				handlePreviousPage={paginationAtendidos.handlePreviousPage}
				handleSelectPerPage={paginationAtendidos.handleSelectPerPage}
			/>
			{openAnexos && (
				<EnvioDocumentos
					isOpen={openAnexos}
					handleClose={() => setOpenAnexos(false)}
					selectedAtendimento={selectedAtendimento}
				/>
			)}
		</>
	)
}

export { ListAtendidos };
