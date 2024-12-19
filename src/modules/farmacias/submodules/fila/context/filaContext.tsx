/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { usePagination } from "@shared/hooks/pagination/usePagination";
import { errorHandler } from "@api/errorHandler";
import { FilaAtendidosContextType } from "../types/filaContextType";
import { Atendimento } from "../service/listAtendimentos.dto";
import { listAtendimentosService } from "../service/listAtendimentos.service";
import { dataCallbackFilter } from "@components/types/dataCallback";
import dayjs from "dayjs";

const FilaContext = createContext<FilaAtendidosContextType>(
    {} as FilaAtendidosContextType
);

const FilaContextProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([])
    const {
        pageInfo,
        handleNextPage,
        handlePreviousPage,
        handleSelectPerPage,
    } = usePagination();


    async function loadFilaAtendidos(data?: dataCallbackFilter) {
        const params = {
            page: pageInfo.value.page,
            size: pageInfo.value.perPage,
            atendido: 'true',
            data_inicial: data?.dataInicial
                ? dayjs(data.dataInicial).format("DD/MM/YYYY")
                : dayjs().format("DD/MM/YYYY"),
            data_final: data?.dataFinal
                ? dayjs(data.dataFinal).format("DD/MM/YYYY")
                : dayjs().format("DD/MM/YYYY"),
        };
        try {
            const result = await listAtendimentosService.execute(params)
            setAtendimentos(result.data);
            pageInfo.set({
                ...pageInfo.value,
                total: result.total,
            });
        } catch (error) {
            errorHandler(error);
        }
    }

    const values: FilaAtendidosContextType = {
        filaAtendidos: {
            value: atendimentos,
            set: setAtendimentos,
        },
        paginationAtendidos: {
            handleNextPage,
            handlePreviousPage,
            handleSelectPerPage,
            pageInfo,
        },
        loadFilaAtendidos,
    };
    return (
        <FilaContext.Provider value={values}>
            {children}
        </FilaContext.Provider>
    );
};

const useFilaContext = () => {
    const context = useContext(FilaContext);

    if (context === undefined) {
        throw new Error(
            "useFilaContext must be used within a FilaContextProvider"
        );
    }

    return context;
};

export { FilaContextProvider, useFilaContext };
