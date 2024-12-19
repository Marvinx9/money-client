import { useVerifyIfHasProfileToAccessSubModule } from "@shared/hooks/profileValidations/useVerifyIfHasProfileToAccessSubModule";

const FarmaciaLoader = () => {
	const { execute } = useVerifyIfHasProfileToAccessSubModule();

	return execute(["ACESSOFARMACIA", "ACESSOFARMACIAGERENCIAMENTO"]);
};

export { FarmaciaLoader };
