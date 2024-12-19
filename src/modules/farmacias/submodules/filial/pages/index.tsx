import { FarmaciasLayout } from "@modules/farmacias/components/layout";
import { CadastroFilial } from "../components/cadastroFilial";
import { ListFilial } from "../components/listFilial";

const RegisterFilial = () => {
	return (
		<FarmaciasLayout>
			<div className="flex flex-col w-full">
				<CadastroFilial />
				<ListFilial />
			</div>
		</FarmaciasLayout>
	);
};

export { RegisterFilial };
