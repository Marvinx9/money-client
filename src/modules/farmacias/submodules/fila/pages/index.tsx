import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { FarmaciasLayout } from "@modules/farmacias/components/layout";
import { ListAguardandoAtendimento } from "../components/listAguardandoAtendimento";
import { ListAtendidos } from "../components/listAtendidos";
import { useLocation } from "react-router-dom";

function FilaAtendimentoPage() {
	const location = useLocation();
	const tab = location.state?.tabValue || 'aguardando';

	return (
		<FarmaciasLayout>
			<div className="p-2">
				<h1 className="font-bold text-xl text-primary">Fila de Atendimento</h1>
				<h2 className="text-zinc-400 my-4">
					Gerencie a fila de atendimentos e visualize registros antigos.
				</h2>
			</div>
			<Tabs defaultValue={tab}>
				<TabsList className="flex items-center justify-start gap-4 bg-transparent">
					<TabsTrigger value="aguardando"
						className="w-1/6 h-10 border-2 border-gray-300 rounded-lg bg-zinc-200 text-gray-600
							data-[state=active]:bg-secondary data-[state=active]:border-none data-[state=active]:text-white">
						Aguardando Atendimento
					</TabsTrigger>
					<TabsTrigger value="atendido"
						className="w-1/6 h-10 border-2 border-gray-300 rounded-lg bg-zinc-200 text-gray-600
						data-[state=active]:bg-secondary data-[state=active]:border-none data-[state=active]:text-white">
						Atendidos
					</TabsTrigger>
				</TabsList>
				<TabsContent value="aguardando" className="p-1">
					<ListAguardandoAtendimento />
				</TabsContent>
				<TabsContent value="atendido" className="p-1">
					<ListAtendidos />
				</TabsContent>
			</Tabs>
		</FarmaciasLayout>
	);
}

export { FilaAtendimentoPage };
