import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormProps } from "@shared/types/customFormProps";
import { formSchemaTriagem, FormSchemaTriagem } from "../schema/formTriagemSchema";
import { useState } from "react";
import { cn } from "@components/lib/utils";

function useTriagemForm(convenio: string) {
    const form = useForm<FormSchemaTriagem>({
        resolver: zodResolver(formSchemaTriagem),
        defaultValues: {
            peso: undefined,
            altura: undefined,
            imc: undefined,
            temperatura: undefined,
            freq_cardiaca: undefined,
            freq_respiratoria: undefined,
            pres_arterial_min: undefined,
            pres_arterial_max: undefined,
            saturacao: undefined,
            observacao: undefined,
            risco: "pouco",
        },
    });
    const [data, setData] = useState<FormSchemaTriagem>()
    const formReset = () => form.reset();

    const triagemForm: CustomFormProps = {
        form,
        onsubmit: form.handleSubmit((data) => {
            setData(data)
        }),
        inputs: [
            {
                id: "peso",
                name: "peso",
                type: "text",
                label: "Peso",
                styleDiv: cn("w-1/3 p-2", convenio !== 'LIV' && 'w-1/3'),
            },
            {
                id: "altura",
                name: "altura",
                type: "text",
                label: "Altura",
                styleDiv: cn("w-1/3 p-2", convenio !== 'LIV' && 'hidden'),
            },
            {
                id: "imc",
                name: "imc",
                type: "text",
                label: "IMC",
                styleDiv: cn("w-1/3 p-2", convenio !== 'LIV' && 'hidden'),
            },
            {
                id: "saturacao",
                name: "saturacao",
                type: "string",
                label: "Saturação",
                styleDiv: cn(convenio !== 'LIV' ? "w-1/3 p-2" : "hidden"),
            },
            {
                id: "temperatura",
                name: "temperatura",
                type: "string",
                label: "Temperatura (C°)",
                styleDiv: cn("w-1/2 p-2", convenio !== 'LIV' && 'w-1/3'),
            },
            {
                id: "freq_cardiaca",
                name: "freq_cardiaca",
                type: "string",
                label: "Freq. Cardíaca (Bpm)",
                styleDiv: "w-1/2 p-2",
            },
            {
                id: "freq_respiratoria",
                name: "freq_respiratoria",
                type: "string",
                label: "Freq. Respiratória (Rpm)",
                styleDiv: "w-1/2 p-2",
            },
            {
                id: "pres_arterial_min",
                name: "pres_arterial_min",
                type: "string",
                label: "Pressão Arterial (Min)",
                styleDiv: cn(convenio !== 'LIV' ? "w-1/2 p-2" : "hidden"),
            },
            {
                id: "pres_arterial_max",
                name: "pres_arterial_max",
                type: "string",
                label: "Pressão Arterial (Máx)",
                styleDiv: "w-1/2 p-2",
            },
            {
                id: "observacao",
                name: "observacao",
                type: "textarea",
                label: "Observação",
                placeholder: "Observação...",
                styleInput: "w-full h-28 text-base",
                styleDiv: cn("w-full p-2", convenio !== 'LIV' && 'hidden'),
            },
            {
                id: "risco",
                name: "risco",
                type: "radio",
                label: "",
                radio: [
                    { label: "Pouco Urgente", value: "pouco" },
                    { label: "Urgente", value: "urgente" },
                ],
                styleDiv: "w-full p-2",
            },
        ],
        styleForm: "w-full flex flex-row flex-wrap items-center gap-0",
        styleButtonDiv: "w-full p-2",
        styleButton: "w-1/3 bg-secondary hover:bg-[#f68f69]",
        buttonLabel: "Continuar",
    };

    return {
        triagemForm,
        formReset,
        data,
    }
}

export { useTriagemForm }