import { PageResponse } from "@shared/types/pageResponse";
import { Atendimento } from "../service/listAtendimentos.dto";
import { dataCallbackFilter } from "@components/types/dataCallback";

type FilaAtendidosContextType = {
    filaAtendidos: {
        value: Atendimento[];
        set: React.Dispatch<React.SetStateAction<Atendimento[]>>;
    };
    paginationAtendidos: {
        handleNextPage: () => void;
        handlePreviousPage: () => void;
        handleSelectPerPage: (perPage: number) => void;
        pageInfo: {
            value: PageResponse;
            set: React.Dispatch<React.SetStateAction<PageResponse>>;
        };
    };
    loadFilaAtendidos: (data?: dataCallbackFilter) => void;
};

export type { FilaAtendidosContextType };
