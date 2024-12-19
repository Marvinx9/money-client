
import { RiFileDownloadLine } from "react-icons/ri";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { useNavigate } from "react-router-dom";

type Props = {
	isOpen: boolean,
	handleClose: () => void
}

const DialogTelemedicina = ({ isOpen, handleClose }: Props) => {

	const navigate = useNavigate()
	const handleTelemedicina = () => {
		// Ao clicar em ir para telemedicina, garantir que o download seja realizado antes de redirecionar
		// Aguardando back
		console.log('clicou');
		if (1 + 1 === 2) {
			navigate('/farmacias/telemedicina')
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<div className="flex flex-col gap-2">
							<h1>
								Acesso à Guia de Atendimento
							</h1>
							<DialogDescription>
								Faça o download da guia de atendimento antes de prosseguir para telemedicina
							</DialogDescription>
						</div>
					</DialogTitle>
				</DialogHeader>
				<div className="flex items-center justify-center border-2 h-20 rounded-md gap-2 mt-4 cursor-pointer">
					<RiFileDownloadLine className="text-3xl" />
				</div>
				<div className="flex flex-col gap-4 mt-4">
					<Button
						className="bg-secondary"
						onClick={() => handleTelemedicina()}
					>
						Confirmar para Telemedicina
					</Button>
					<Button className="bg-transparent border-2 text-gray-500 hover:bg-red-600 hover:border-none hover:text-white " onClick={handleClose}>Cancelar</Button>
				</div>
			</DialogContent>
		</Dialog>
	)

}

export { DialogTelemedicina };

