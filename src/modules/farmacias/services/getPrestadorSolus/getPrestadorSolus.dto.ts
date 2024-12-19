type GetPrestadorSolusInputDto = {
    idade: string;
}

type GetPrestadorSolusOutputDto = {
    nnumepres: number;
    nambupres: number;
    cnomelocal: string;
    cnomepres: string;
    choraagend: string;
    nnumeespec: number;
    idade_maxima: number;
    idade_minima: number;
}

export type { GetPrestadorSolusInputDto, GetPrestadorSolusOutputDto }