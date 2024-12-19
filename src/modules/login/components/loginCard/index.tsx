import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { CustomForm } from "@components/customForm";
import { useLoginForm } from "@modules/login/hooks/useLoginForm";
import { ArrowRight } from "lucide-react";
import { useConfirmCode } from "@modules/login/hooks/useConfirmCode";
import { useResetPassword } from "@modules/login/hooks/useResetPassword";
import { X } from "lucide-react";

const LoginCard = () => {
	const { loginCustomForm, forgotPassword, resetFormLogin } = useLoginForm();
	const { confirmCodeForm, codeConfirmed, resetFormCodeConfirmed } =
		useConfirmCode();
	const { resetPasswordForm, resetFormResetPassword } = useResetPassword();

	return (
		<Card className="rounded-3xl shadow-xl w-3/5 flex flex-col">
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle className="flex items-center">
						{!forgotPassword ? "Login" : "Redefinir Senha"}
					</CardTitle>
					{forgotPassword && (
						<div
							onClick={() => {
								resetFormLogin(),
									resetFormCodeConfirmed(),
									resetFormResetPassword();
							}}
							className="flex justify-center items-center p-2 border-none rounded-full hover:cursor-pointer hover:bg-[#F8F9FA]/75 bg-[#F8F9FA]"
						>
							<X size={16} color="#ADB5BD" />
						</div>
					)}
				</div>
			</CardHeader>
			<CardContent className="flex items-center justify-center">
				{!forgotPassword && !codeConfirmed && (
					<CustomForm
						{...{
							...loginCustomForm,
							rigthSideButtonIcon: <ArrowRight size={20} />,
						}}
					/>
				)}
				{forgotPassword && !codeConfirmed && (
					<div className="flex flex-col w-full gap-6">
						<div className="text-base text-[#ADB5BD]">
							<p>
								Um código de redefinição foi enviado para o
								email que você cadastrou. Acesse a sua caixa de
								email, copie o código e cole aqui. Não consegue
								localizar o email? Procure na caixa de spam.
							</p>
						</div>
						<CustomForm {...confirmCodeForm} />
					</div>
				)}
				{codeConfirmed && (
					<div className="flex flex-col w-full gap-3">
						<p className="text-base text-[#ADB5BD]">
							Defina uma nova senha segura.
						</p>
						<CustomForm {...resetPasswordForm} />
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export { LoginCard };
