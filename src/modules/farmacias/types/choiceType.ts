type ChoiceType = {
    value: ChoiceTypeValue;
    label: string;
    haveMask: boolean;
    mask: string;
};

type ChoiceTypeValue = "nome_beneficiario" | "cpf";

export type { ChoiceType, ChoiceTypeValue };
