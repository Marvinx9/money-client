type SearchBeneficiarioInputDto = {
    cpf: string;
    nome_beneficiario: string;
    convenio: string;
};

type SearchBeneficiarioOutputDto = {
    cpf: string;
    email?: string;
    id_pessoa?: number;
    id_usuario?: number;
    idade: string;
    mae: string;
    nascimento: string;
    nome: string;
    plano: string;
    telefone: string;
    convenio: string;
    nomeConvenio: string;
};

export type { SearchBeneficiarioInputDto, SearchBeneficiarioOutputDto };
