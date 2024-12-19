import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@components/ui/dialog"
import { Textarea } from "@components/ui/textarea"

import { Button } from "@components/ui/button"

type Props = {
	pessoa: any
	isOpen: boolean,
	handleClose: () => void,
}

const DialogCancelarAtendimento = ({ isOpen, handleClose, pessoa }: Props) => {

	const handleCancelarAtendimento = () => { console.log('Cancelar Atendimento') }

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<div className="flex flex-col gap-2">
							<h1>
								Cancelar atendimento
							</h1>
							<DialogDescription>
								Insira a causa do cancelamento da consulta
							</DialogDescription>
						</div>
					</DialogTitle>
				</DialogHeader>
				<div>
					<div className="my-2">
						<span className="font-bold">Beneficiário(a):</span>{" "}
						<span className="font-bold text-black">{pessoa.paciente}</span>
					</div>
					<div className="flex flex-col gap-2 mt-4 text-black">
						<span>
							Motivo (obrigatório):
						</span>
						<Textarea className="resize-none" />
					</div>
					<div className="flex flex-col gap-4 mt-4">
						<Button className="bg-secondary" onClick={handleCancelarAtendimento}>Confirmar e Finalizar Atendimento</Button>
						<Button className="bg-transparent border-2 text-gray-500 hover:bg-red-600 hover:border-none hover:text-white " onClick={handleClose}>Cancelar</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)

}

export { DialogCancelarAtendimento }
