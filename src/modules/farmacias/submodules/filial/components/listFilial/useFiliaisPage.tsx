import { errorHandler } from "@api/errorHandler";
import { useEffect, useState } from "react";
import { listFilialService } from "../../service/listFiliais/listFilial.service";
import { FilialOutput } from "../../service/listFiliais/listFiliais.dto"
import { usePagination } from "@shared/hooks/pagination/usePagination";

function useRequestFilial() {
	const {
		handleNextPage,
		handlePreviousPage,
		handleSelectPerPage,
		pageInfo
	} = usePagination();
	const [searchFilial, setSearchFilial] = useState<string>("");
	const [filial, setFilial] = useState<FilialOutput[]>([]);

	async function loadFiliais() {
		if (searchFilial === "") return;

		const params = {
			nome: searchFilial,
			page: pageInfo.value.page,
			size: pageInfo.value.perPage,
		};
		try {
			const result = await listFilialService.execute(params);
			setFilial(result.data);
			pageInfo.set({
				...pageInfo.value,
				total: result.total,
			});
		} catch (error) {
			errorHandler(error);
		}
	}

	useEffect(() => {
		const debounce = setTimeout(() => {
			loadFiliais();
		}, 500);

		return () => clearTimeout(debounce);
	}, [searchFilial, pageInfo.value.page, pageInfo.value.perPage]);

	return {
		filial: {
			value: filial,
			set: setFilial,
		},
		search: {
			value: searchFilial,
			set: setSearchFilial,
		},
		pageInfo: {
			value: pageInfo.value,
			set: pageInfo.set,
		},
		handleNextPage,
		handlePreviousPage,
		handleSelectPerPage,
		loadFiliais,
	};
}

export { useRequestFilial };
