import { DataTable } from "@components/dataTable";
import { ActionButton } from "@components/types/ActionButton";
import { useContext, useEffect, useState } from "react";
import { PiVideoCameraLight } from "react-icons/pi";
import { AguardandoAtendimento } from "../../types/aguardandoAtendimento";
import { columnsAguardandoAtendimento } from "../columnsAguardandoAtendimento";
//TODO: lógica do modal ainda não confirmada
// import { DialogCancelarAtendimento } from "../dialogCancelarAtendimento";
// import { DialogTelemedicina } from "../dialogTelemedicina";
import { listAtendimentosService } from "../../service/listAtendimentos.service";
import { errorHandler } from "@api/errorHandler";
import { Atendimento } from "../../service/listAtendimentos.dto";
import { TelemedicinaContext } from "@modules/farmacias/context/telemedicinaContext";
import { useNavigate } from "react-router-dom";

const ListAguardandoAtendimento = () => {
	//TODO: lógica do modal ainda não confirmada
	// const [isOpenDialogCancelarAtendimento, setIsOpenDialogCancelarAtendimento] = useState(false)
	// const [isOpenDialogTelemedicina, setIsOpenDialogTelemedicina] = useState(false)
	// const [selectedPessoa, setSelectedPessoa] = useState<AguardandoAtendimento | null>(null)
	const [atendimentos, setAtendimentos] = useState<Atendimento[]>([])

	const navigate = useNavigate()
	const { setCredentials } = useContext(TelemedicinaContext);

	async function getFila() {
		try {
			const response = await listAtendimentosService.execute({
				page: 1,
				size: 20,
				waiting_atendimento: 'true',
				on_atendimento: 'true',
				checkinOrder: 'true',
			})
			setAtendimentos(response.data)
		} catch (error) {
			errorHandler(error)
		}
	}

	const actions: ActionButton[] = [
		{
			icon: <PiVideoCameraLight />,
			label: 'Telemedicina',
			disabled: ({ session_id, paciente_token }: AguardandoAtendimento) => !(session_id && paciente_token),
			onClick: (row: AguardandoAtendimento) => {
				//TODO: lógica do modal ainda não confirmada
				// setSelectedPessoa(row)
				setCredentials({
					session_id: row.session_id,
					paciente_token: row.paciente_token
				})
				navigate("/farmacias/telemedicina")
			},
		},
	];

	useEffect(() => {
		getFila();

		const intervalId = setInterval(() => {
			getFila();
		}, 45000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			<DataTable
				actions={actions}
				columns={columnsAguardandoAtendimento}
				data={atendimentos}
			/>

			{/* TODO: lógica do modal ainda não confirmada */}
			{/* {isOpenDialogTelemedicina && (
				<DialogTelemedicina
					isOpen={isOpenDialogTelemedicina}
					handleClose={() => setIsOpenDialogTelemedicina(false)}
				/>
			)}
			{isOpenDialogCancelarAtendimento && (
				<DialogCancelarAtendimento
					isOpen={isOpenDialogCancelarAtendimento}
					handleClose={() => setIsOpenDialogCancelarAtendimento(false)}
					pessoa={selectedPessoa}
				/>
			)} */}

		</>
	)
}

export { ListAguardandoAtendimento };
