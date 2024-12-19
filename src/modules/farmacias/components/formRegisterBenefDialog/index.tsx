import { CustomForm } from "@components/customForm"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@components/ui/dialog"
import { useRegisterBeneficiarioForm } from "@modules/farmacias/hooks/useRegisterBeneficiarioForm"
import { LuSave } from "react-icons/lu"

type DialogProp = {
    isOpen: boolean;
    onClose: () => void;
};

const FormRegisterBeneficiarioDialog = ({ isOpen, onClose }: DialogProp) => {
    const { resgisterBeneficiarioForm } = useRegisterBeneficiarioForm({ onClose });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="max-w-screen-lg"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Formulário de Cadastro</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para realizar a triagem do beneficiário.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full flex justify-center">
                    <CustomForm {...{ ...resgisterBeneficiarioForm, leftSideButtonIcon: <LuSave size={20} /> }} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export { FormRegisterBeneficiarioDialog }