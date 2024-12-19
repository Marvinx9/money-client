import { cn } from "@components/lib/utils";
import { Badge } from "@components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { FilialOutput } from "../../service/listFiliais/listFiliais.dto";
import { treatsText } from "@shared/utils/filter";

const tableColumnsCadastroFilial: ColumnDef<FilialOutput>[] = [
	{
		accessorKey: "nome",
		header: "Nome",
		cell: ({ row }) => {
			const nome = row.getValue<string>("nome");
			return treatsText(nome);
		},
	},
	{
		accessorKey: "nome_farmacia",
		header: "Farmácia",
		cell: ({ row }) => {
			const nome = row.getValue<string>("nome_farmacia");
			return treatsText(nome);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue<number>("status");
			return (
				<div className="w-full flex items-center justify-center">
					<Badge
						className={cn(
							"w-32 flex justify-center items-center",
							`${status === 1 ? "bg-emerald-500" : "bg-red-500"}`,
							`${status === 1 ? "hover:bg-emerald-600" : "hover:bg-red-600"}`
						)}
					>
						<span className="text-white">
							{status === 1 ? "Ativo" : "Inativo"}
						</span>
					</Badge>
				</div>
			);
		},
	},
];

export { tableColumnsCadastroFilial };
