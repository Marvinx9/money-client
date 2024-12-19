type GetConveniosInputDto = {
    search?: string,
}

type GetConveniosOutputDto = {
    cd_convenio: number,
    ds_convenio: string,
    dt_inclusao: string,
    ie_tipo_convenio: number,
    cd_cgc: string,
    dt_atualizacao: string,
    nm_usuario: string,
    dt_dia_vencimemto: number,
    cd_condicao_pagamento: number,
    ie_codigo_convenio: string,
    nm_usuario_nrec: string,
}

export type { GetConveniosInputDto, GetConveniosOutputDto }