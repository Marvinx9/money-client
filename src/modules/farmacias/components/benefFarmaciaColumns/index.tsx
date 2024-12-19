import { SearchBeneficiarioOutputDto } from "@modules/farmacias/services/searchBeneficiario/searchBeneficiario.dto";
import { treatsText } from "@shared/utils/filter";
import { ColumnDef } from "@tanstack/react-table";

const columnsBeneficiarioFarmacia: ColumnDef<SearchBeneficiarioOutputDto>[] = [
    {
        accessorKey: "nome",
        header: "Nome do beneficiário",
        cell: ({ row }) => {
            const value = row.getValue<string>("nome");
            return (
                <p>{treatsText(value)}</p>
            );
        },
    },
    {
        accessorKey: "cpf",
        header: "Cpf",
    },
    {
        accessorKey: "telefone",
        header: "Telefone",
    },
    {
        accessorKey: "nascimento",
        header: "Data de nascimento",
    },
];

export { columnsBeneficiarioFarmacia };
