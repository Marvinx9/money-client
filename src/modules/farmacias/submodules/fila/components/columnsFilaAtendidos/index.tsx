import { Badge } from "@components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Atendimento } from "../../service/listAtendimentos.dto";

const columnsFilaAtendidos: ColumnDef<Atendimento>[] = [
	{
		accessorKey: 'paciente',
		header: () => <div>Paciente</div>,
		cell: ({ row }) => {
			const paciente = (row.getValue<string>('paciente'))
			return (
				<div>
					<span className="uppercase">
						{paciente}
					</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'hora',
		header: 'Chegada',
		cell: ({ row }) => {
			return `${row.getValue<string>('hora')}`
		}
	},
	{
		accessorKey: 'nome_prestador',
		header: 'Médico(a)',
		cell: ({ row }) => {
			const medico = (row.getValue<string>('nome_prestador'))
			return (
				<div>
					<span className="uppercase">
						{medico}
					</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'situacao',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue<string>('situacao')
			switch (status) {
				case 'A':
					return (
						<Badge variant={"default"} className="w-32 flex justify-center items-center">
							<span className="text-white">
								Aguardando atendimento
							</span>
						</Badge>
					)
				case 'C':
					return (
						<Badge variant={"secondary"} className="w-32 flex justify-center items-center">
							<span className="text-white">
								Em Atendimento
							</span>
						</Badge>
					)
				case 'F':
					return (
						<Badge className="w-32 flex justify-center items-center bg-green-400">
							<span className="text-white">
								Finalizado
							</span>
						</Badge>
					)
				default:
					return <p className="text-slate-300">Sem status</p>;
			}
		}
	},
]

export { columnsFilaAtendidos };
