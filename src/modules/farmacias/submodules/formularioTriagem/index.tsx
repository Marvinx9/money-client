import { CustomForm } from "@components/customForm";
import { Button } from "@components/ui/button";
import { ConfirmTriagemDialog } from "@modules/farmacias/components/confirmTriagemDialog";
import { FarmaciasLayout } from "@modules/farmacias/components/layout"
import { useTriagemForm } from "@modules/farmacias/hooks/useTriagemForm";
import { SearchBeneficiarioOutputDto } from "@modules/farmacias/services/searchBeneficiario/searchBeneficiario.dto";
import { treatsText } from "@shared/utils/filter";
import { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const FormTriagemPage = () => {
    const navigate = useNavigate();
    const [selectedPeople] = useState<SearchBeneficiarioOutputDto>(() => {
        const selectedPeopleLocalStorage = localStorage.getItem(
            "@farmacias-selected-people"
        );
        if (!selectedPeopleLocalStorage) {
            navigate("/farmacias/selecao-beneficiario");
            return {} as SearchBeneficiarioOutputDto;
        }

        const dataSelectedUser: SearchBeneficiarioOutputDto = JSON.parse(
            selectedPeopleLocalStorage
        );
        return dataSelectedUser;
    });
    const { triagemForm, formReset, data } = useTriagemForm(selectedPeople.convenio);
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (data) {
            setIsOpen(true)
        }
    }, [data])

    return (
        <FarmaciasLayout>
            <h2 className="text-xl font-semibold">
                Formulário de Triagem
            </h2>
            <h3 className="text-zinc-500">
                Preencha os campos a baixo para realizar a triagem de beneficiário.
            </h3>
            <div className="w-full flex justify-center mt-8 p-8">
                <div className="w-2/3 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <p className="font-bold">
                            <span className="text-gray-400">Beneficiário(a): </span>{treatsText(selectedPeople.nome)}
                        </p>
                        <Button
                            variant={'link'}
                            onClick={() => formReset()}
                        >
                            Limpar Formulário
                        </Button>
                    </div>
                    <CustomForm {...{ ...triagemForm, rigthSideButtonIcon: <LuArrowRight size={20} /> }} />
                </div>
            </div>
            {data && isOpen && (
                <ConfirmTriagemDialog
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    data={data}
                    selectedPeople={selectedPeople}
                />
            )}
        </FarmaciasLayout>
    )
}

export { FormTriagemPage }