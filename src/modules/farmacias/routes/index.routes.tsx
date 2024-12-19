import { RouteObject } from "react-router-dom";
import { FormTriagemPage } from "../submodules/formularioTriagem";
import { TelemedicinaPage } from "../submodules/telemedicina";
import { FarmaciasPage } from "../pages";
import { TesteTelemedicinaPage } from "../submodules/testeTelemedicina";
import { FilaAtendimentoPage } from "../submodules/fila/pages";
import { TelemedicinaContextProvider } from "../context/telemedicinaContext";
import { FilaContextProvider } from "../submodules/fila/context/filaContext";
import { FarmaciaGerenciamentoLoader } from "../loaders/farmaciaGerenciamentoLoader";
import { FarmaciaLoader } from "../loaders/farmaciaLoader";
import { RegisterFilial } from "../submodules/filial/pages";
import { RegisterUsuario } from "../submodules/usuario/page";

const farmaciasRoutes: RouteObject[] = [
	{
		path: "/farmacias/selecao-beneficiario",
		element: <FarmaciasPage />,
		loader: FarmaciaLoader,
	},
	{
		path: "/farmacias/selecao-beneficiario/triagem",
		element: <FormTriagemPage />,
		loader: FarmaciaLoader,
	},
	{
		path: "/farmacias/fila-atendimento",
		element: (
			<TelemedicinaContextProvider>
				<FilaContextProvider>
					<FilaAtendimentoPage />
				</FilaContextProvider>
			</TelemedicinaContextProvider>
		),
		loader: FarmaciaLoader,
	},
	{
		path: "/farmacias/teste-telemedicina",
		element: <TesteTelemedicinaPage />,
		loader: FarmaciaLoader,
	},
	{
		path: "/farmacias/telemedicina",
		element: (
			<TelemedicinaContextProvider>
				<TelemedicinaPage />
			</TelemedicinaContextProvider>
		),
		loader: FarmaciaLoader,
	},
	{
		path: "/farmacias/filial",
		element: <RegisterFilial />,
		loader: FarmaciaGerenciamentoLoader,
	},
	{
		path: "/farmacias/usuario",
		element: <RegisterUsuario />,
		loader: FarmaciaGerenciamentoLoader,
	},
]

export { farmaciasRoutes }
