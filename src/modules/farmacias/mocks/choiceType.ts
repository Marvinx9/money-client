import { ChoiceType } from "../types/choiceType";

const choiceType: ChoiceType[] = [
    {
        value: "nome_beneficiario",
        label: "Nome",
        haveMask: false,
        mask: "",
    },
    {
        value: "cpf",
        label: "Cpf",
        haveMask: true,
        mask: "999.999.999-99",
    },
];

export { choiceType };
