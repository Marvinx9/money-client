import { useVerifyIfHasProfileToAccessSubModule } from "@shared/hooks/profileValidations/useVerifyIfHasProfileToAccessSubModule";

const FarmaciaGerenciamentoLoader = () => {
	const { execute } = useVerifyIfHasProfileToAccessSubModule();

	return execute(["ACESSOFARMACIAGERENCIAMENTO"]);
};

export { FarmaciaGerenciamentoLoader };

