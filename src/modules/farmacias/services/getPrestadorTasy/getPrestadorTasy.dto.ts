type GetPrestadorTasyInputDto = {
    page?: number;
    size?: number;
    total?: number;
}

type GetPrestadorTasyOutputDto = {
    agendas: Agendas[];
    page: number;
    size: number;
    total: number;
}

type Agendas = {
    cd_medico: string;
    id: number;
    hora: string;
    status: string;
    nome: string;
    especialidade: string;
    medico: string;
}

export type { GetPrestadorTasyInputDto, GetPrestadorTasyOutputDto, Agendas }