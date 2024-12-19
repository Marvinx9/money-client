import { FarmaciasLayout } from "@modules/farmacias/components/layout";
import { ListUserComponent } from "../components/listUserTable";
import { RegisterUserComponent } from "../components/registerUser";

const RegisterUsuario = () => {
	return (
		<FarmaciasLayout>
			<div className="flex flex-col w-full">
				<RegisterUserComponent />
				<ListUserComponent />
			</div>
		</FarmaciasLayout>
	);
};

export { RegisterUsuario };

