import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { DataTable } from "@components/dataTable";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@components/ui/select";
import { LuPlayCircle } from "react-icons/lu";
import { FarmaciasLayout } from "../components/layout"
import { choiceType } from "../mocks/choiceType";
import { ChoiceType, ChoiceTypeValue } from "../types/choiceType";
import { ActionButton } from "@components/types/ActionButton";
import { columnsBeneficiarioFarmacia } from "../components/benefFarmaciaColumns";
import { SearchBeneficiarioInputDto, SearchBeneficiarioOutputDto } from "../services/searchBeneficiario/searchBeneficiario.dto";
import { maskProps } from "@shared/utils/masks";
import { searchBeneficiarioService } from "../services/searchBeneficiario/searchBeneficiario.service";
import { getConveniosService } from "../services/getConvenios/getConvenios.service";
import { GetConveniosOutputDto } from "../services/getConvenios/getConvenios.dto";
import { FormRegisterBeneficiarioDialog } from "../components/formRegisterBenefDialog";
import { errorHandler } from "@api/errorHandler";

const FarmaciasPage = () => {
	const navigate = useNavigate();

	const [searchListPeople, setSearchListPeople] = useState("");
	const [typeChoice, setTypeChoice] = useState<ChoiceType>(choiceType[0]);
	const [listPeople, setListPeople] = useState<SearchBeneficiarioOutputDto[]>([]);
	const [allConvenios, setAllConvenios] = useState<GetConveniosOutputDto[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [firstRequest, setFirstRequest] = useState(false);
	const [formRegister, setFormRegister] = useState(false);
	const [convenios, setConvenios] = useState<string>('LIV-Liv Saúde');

	const actionsSearchBeneficiario: ActionButton[] = [
		{
			label: "Iniciar Triagem",
			icon: <LuPlayCircle size={20} />,
			onClick: (row: SearchBeneficiarioOutputDto) => {
				const convenio = convenios.split('-')
				localStorage.setItem(
					"@farmacias-selected-people",
					JSON.stringify({ ...row, convenio: convenio[0], nomeConvenio: convenio[1] })
				);
				navigate('/farmacias/selecao-beneficiario/triagem')
			},
		},
	];

	function handleChangeOptionSearch(value: ChoiceTypeValue) {
		const optionSelected = choiceType.find((choice) => choice.value === value);
		if (optionSelected) {
			setTypeChoice(optionSelected);
		}

		setSearchListPeople("");
	}

	async function loadList(searchInput: string) {
		setIsLoading(true);
		if (searchInput === "") {
			setListPeople([]);
			setIsLoading(false);
			setFirstRequest(false)
			return;
		}

		const search = {
			cpf: "",
			nome_beneficiario: "",
		};
		search[typeChoice.value] = searchInput;

		const convenio = convenios.split('-')
		const params: SearchBeneficiarioInputDto = {
			...search,
			convenio: convenio[0],
		}
		try {
			const result = await searchBeneficiarioService.execute({ ...params });
			setListPeople(result);
			!result.length && setFirstRequest(true)
		} catch (error) {
			errorHandler(error)
		} finally {
			setIsLoading(false);
		}
	}

	async function getConvenios() {
		try {
			const result = await getConveniosService.execute();
			setAllConvenios(result);
		} catch (error) {
			errorHandler(error)
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		let search = "";
		if ((typeChoice.value === "cpf") && searchListPeople.replace(/[^0-9]/g, "").length > 0) {
			search = searchListPeople.replace(/[^0-9]/g, "");
		} else {
			search = searchListPeople;
		}

		const debounce = setTimeout(() => loadList(search), 500);
		return () => clearTimeout(debounce);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchListPeople, convenios]);

	useEffect(() => {
		getConvenios()
	}, [])

	return (
		<FarmaciasLayout>
			<h2 className="text-xl text-primary font-semibold">
				Seleção do Beneficiário
			</h2>
			<h3 className="text-zinc-500">
				Pesquise por um beneficiário abaixo e selecione um clicando no
				registro correspondente.
			</h3>
			<div className="w-full flex p-1 gap-4 mt-6">
				<div>
					<Label className="mb-2">Selecione convênio:</Label>
					<Select
						defaultValue={convenios}
						onValueChange={(e) => {
							setConvenios(e)
						}}
					>
						<SelectTrigger className="w-[200px] h-10">
							<SelectValue placeholder="Selecione um Convênio" />
						</SelectTrigger>
						<SelectContent className="max-h-56">
							<SelectGroup>
								<SelectItem key={'LIV'} value={'LIV' + '-' + 'Liv Saúde'}>
									Liv Saúde
								</SelectItem>
								{allConvenios.map((convenio, index) => (
									<SelectItem key={index} value={String(convenio.cd_convenio + '-' + convenio.ds_convenio)}>
										{convenio.ds_convenio}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label className="mb-2">Consulta por:</Label>
					<Select
						onValueChange={handleChangeOptionSearch}
						defaultValue={typeChoice.value}
					>
						<SelectTrigger className="w-[200px] h-10">
							<SelectValue placeholder="Consulta por:" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{choiceType.map((choice, index) => (
									<SelectItem key={index} value={choice.value}>
										{choice.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="w-2/5">
					<Label className="mb-2">Pesquisar:</Label>
					{typeChoice.haveMask ? (
						<Input
							value={searchListPeople}
							placeholder={maskProps['cpf'].placeholder}
							onChange={(e) => {
								setSearchListPeople(maskProps['cpf'].function(e.target.value))
							}}
							maxLength={maskProps['cpf'].maxLength}
						/>
					) : (
						<Input
							id={typeChoice.value}
							type="text"
							placeholder="Pesquise por um beneficiário..."
							onChange={(e) => setSearchListPeople(e.target.value)}
							value={searchListPeople}
						/>
					)}
				</div>
			</div>
			<div className="w-full mt-6">
				<DataTable
					isLoading={isLoading}
					actions={actionsSearchBeneficiario}
					columns={columnsBeneficiarioFarmacia}
					data={listPeople}
					notFound={{
						actionText: firstRequest && convenios !== 'LIV' ? 'Clique aqui para cadastrar um novo beneficiário' : undefined,
						action: firstRequest && convenios !== 'LIV' ? () => setFormRegister(true) : undefined,
						text: firstRequest && convenios !== 'LIV' ? 'Beneficiário não encontrado. ' : 'Pesquise por beneficiários usando os filtros acima',
					}}
				/>
			</div>
			{formRegister && (
				<FormRegisterBeneficiarioDialog
					isOpen={formRegister}
					onClose={() => setFormRegister(false)}
				/>
			)}
		</FarmaciasLayout>
	)
}

export { FarmaciasPage }