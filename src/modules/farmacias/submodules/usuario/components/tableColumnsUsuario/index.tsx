import { ColumnDef } from "@tanstack/react-table";
import { UsuarioOutput } from "../../services/getUserFilial/listUsuario.dto";
import { treatsText } from "@shared/utils/filter";

const tableColumnsUsuarioFilial: ColumnDef<UsuarioOutput>[] = [
	{
		accessorKey: "cncomusua",
		header: "Nome",
		cell: ({ row }) => {
			const nome = row.getValue<string>("cncomusua");
			return treatsText(nome);
		},
	},
	{
		accessorKey: "cnomeusua",
		header: "Usuário",
		cell: ({ row }) => {
			const nome = row.getValue<string>("cnomeusua");
			return treatsText(nome);
		},
	},
	{
		accessorKey: "nome_filial",
		header: "Filial",
		cell: ({ row }) => {
			const nome = row.getValue<string>("nome_filial");
			return treatsText(nome);
		},
	},

];

export { tableColumnsUsuarioFilial };

