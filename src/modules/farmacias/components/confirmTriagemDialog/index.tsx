import { errorHandler } from "@api/errorHandler";
import { Alert, AlertDescription } from "@components/ui/alert";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@components/ui/dialog"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@components/ui/select";
import { FormSchemaTriagem } from "@modules/farmacias/schema/formTriagemSchema";
import { GetPrestadorSolusInputDto, GetPrestadorSolusOutputDto } from "@modules/farmacias/services/getPrestadorSolus/getPrestadorSolus.dto";
import { getPrestadorSolusService } from "@modules/farmacias/services/getPrestadorSolus/getPrestadorSolus.service";
import { Agendas, GetPrestadorTasyInputDto } from "@modules/farmacias/services/getPrestadorTasy/getPrestadorTasy.dto";
import { getPrestadorTasyService } from "@modules/farmacias/services/getPrestadorTasy/getPrestadorTasy.service";
import { postUsuarioSolusInputDto } from "@modules/farmacias/services/postTriagemSolus/postTriagemSolus.dto";
import { postTriagemSolusService } from "@modules/farmacias/services/postTriagemSolus/postTriagemSolus.service";
import { postUsuarioTasyInputDto } from "@modules/farmacias/services/postTriagemTasy/postTriagemTasy.dto";
import { postTriagemTasyService } from "@modules/farmacias/services/postTriagemTasy/postTriagemTasy.service";
import { SearchBeneficiarioOutputDto } from "@modules/farmacias/services/searchBeneficiario/searchBeneficiario.dto";
import { treatsText } from "@shared/utils/filter";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuSave } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

type DialogProp = {
	isOpen: boolean;
	onClose: () => void;
	data: FormSchemaTriagem;
	selectedPeople: SearchBeneficiarioOutputDto;
};

const ConfirmTriagemDialog = ({ isOpen, onClose, data, selectedPeople }: DialogProp) => {
	const navigate = useNavigate();
	const [prestadoresSolus, setPrestadoresSolus] = useState<GetPrestadorSolusOutputDto[]>([]);
	const [prestadoresTasy, setPrestadoresTasy] = useState<Agendas[]>([]);
	const [prestadorSelect, setPrestadorSelect] = useState<string>('');

	async function getPrestadorSolus() {
		const params: GetPrestadorSolusInputDto = {
			idade: selectedPeople.idade
		}
		try {
			const result = await getPrestadorSolusService.execute(params);
			setPrestadoresSolus(result);
		} catch (error) {
			errorHandler(error);
		}
	}

	async function getPrestadorTasy() {
		const params: GetPrestadorTasyInputDto = {
			page: 1,
			size: 10
		}
		try {
			const result = await getPrestadorTasyService.execute(params);
			setPrestadoresTasy(result.agendas);
		} catch (error) {
			errorHandler(error);
		}
	}

	async function saveTriagemTasy(data: FormSchemaTriagem) {
		if (data.risco !== 'urgente' && prestadorSelect === '') return;
		const paramsTasy: postUsuarioTasyInputDto = {
			cd_medico: prestadorSelect ? prestadoresTasy[Number(prestadorSelect)].cd_medico : undefined,
			cd_paciente: String(selectedPeople.id_pessoa!),
			nr_sequencia: prestadorSelect ? prestadoresTasy[Number(prestadorSelect)].id : 1,
			freq_cardiaca: Number(data.freq_cardiaca),
			freq_respiratoria: Number(data.freq_respiratoria),
			pa_max: Number(data.pres_arterial_max),
			pa_min: Number(data.pres_arterial_min),
			peso: Number(data.peso),
			saturacao: Number(data.saturacao),
			temperatura: Number(data.temperatura),
			perfil: data.risco === 'pouco' ? true : undefined,
			cd_convenio: Number(selectedPeople.convenio),
			convenio: selectedPeople.nomeConvenio,
		}
		try {
			await postTriagemTasyService.execute(paramsTasy)
			toast.success('Triagem concluida com Sucesso! Aguarde atendimento.')
			onClose()
			data.risco === 'pouco' ?
				navigate('/farmacias/fila-atendimento') :
				navigate('/farmacias/selecao-beneficiario')
		} catch (error) {
			errorHandler(error)
		}
	}
	async function saveTriagemSolus(data: FormSchemaTriagem) {
		if (data.risco !== 'urgente' && prestadorSelect === '') return;
		const paramsSolus: postUsuarioSolusInputDto = {
			id_ambulatorio: prestadorSelect ? prestadoresSolus[Number(prestadorSelect)].nambupres : 1,
			id_prestador: prestadorSelect ? Number(prestadoresSolus[Number(prestadorSelect)].nnumepres) : 1,
			nnumeespec: prestadorSelect ? Number(prestadoresSolus[Number(prestadorSelect)].nnumeespec) : 1,
			nnumeusua: Number(selectedPeople.id_usuario),
			nriscguia: 4,
			observacao: data.observacao ?? ' ',
			email_beneficiario: selectedPeople.email,
			fone_agendamento: selectedPeople.telefone,
			naltuguia: Number(data.altura),
			nfcarguia: Number(data.freq_cardiaca),
			nfresguia: Number(data.freq_respiratoria),
			npamaguia: Number(data.pres_arterial_max),
			npesoguia: Number(data.peso),
			ntempguia: Number(data.temperatura),
			cobpaobspa: data.observacao ?? ' ',
			perfil: data.risco === 'pouco' ? true : undefined,
		}
		console.log(paramsSolus);

		try {
			await postTriagemSolusService.execute(paramsSolus)
			toast.success('Triagem concluida com Sucesso! Aguarde atendimento.')
			onClose()
			data.risco === 'pouco' ?
				navigate('/farmacias/fila-atendimento') :
				navigate('/farmacias/selecao-beneficiario')
		} catch (error) {
			errorHandler(error)
		}
	}

	useEffect(() => {
		if (data.risco !== 'urgente') {
			if (selectedPeople.convenio === 'LIV') {
				getPrestadorSolus();
				setPrestadoresTasy([]);
				return;
			}
			getPrestadorTasy();
			setPrestadoresSolus([]);
		}
	}, [])

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Agendamento</DialogTitle>
					{data.risco !== 'urgente' && (
						<DialogDescription>
							Selecione o prestador e local para gerar o agendamento.
						</DialogDescription>
					)}
				</DialogHeader>
				<div className="w-full">
					<p className="font-bold mb-4">
						<span className="text-gray-400">Beneficiário(a): </span>{treatsText(selectedPeople.nome)}
					</p>
					{data.risco !== 'urgente' ? (
						<>
							<Label>Prestador</Label>
							<Select
								onValueChange={(e) => setPrestadorSelect(e)}
							>
								<SelectTrigger className="w-full h-10 mt-2 mb-6">
									<SelectValue placeholder="Selecione o prestador" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{prestadoresSolus.map((prestador, index) => (
											<SelectItem key={index} value={index.toString()}>
												{prestador.cnomepres}
											</SelectItem>
										))}
										{prestadoresTasy.map((prestador, index) => (
											<SelectItem key={index} value={index.toString()}>
												{prestador.medico}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<Button
								variant={'secondary'}
								className="w-full text-white gap-2"
								onClick={() => {
									selectedPeople.convenio === 'LIV' ?
										saveTriagemSolus(data) :
										saveTriagemTasy(data)
								}}
							>
								<LuSave size={20} />
								Salvar
							</Button>
						</>
					) : (
						<>
							<Alert variant="default" className="bg-gray-100 my-4">
								<AlertCircle size={20} color="gray" />
								<AlertDescription className="text-gray-600 text-sm">
									Ao indicar que a triagem do beneficiário não é pouco urgente, faz-se necessário orientá-lo(a) que busque atendimento na rede credenciada da operadora.
								</AlertDescription>
							</Alert>
							<Button
								variant={'secondary'}
								className="w-full text-white"
								onClick={() => {
									selectedPeople.convenio === 'LIV' ?
										saveTriagemSolus(data) :
										saveTriagemTasy(data)
								}}
							>
								Confirmar e Finalizar Atendimento
							</Button>
						</>
					)}
				</div>
			</DialogContent >
		</Dialog >
	)
}

export { ConfirmTriagemDialog }
