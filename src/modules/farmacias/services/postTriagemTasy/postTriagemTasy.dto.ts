type postUsuarioTasyInputDto = {
    pa_max?: number,
    pa_min?: number,
    freq_cardiaca?: number,
    temperatura?: number,
    saturacao?: number,
    peso?: number,
    freq_respiratoria?: number,
    cd_medico?: string,
    cd_paciente: string,
    nr_sequencia: number;
    perfil: boolean | undefined,
    cd_convenio: number;
    convenio: string;
}

export type { postUsuarioTasyInputDto }