type UltimosAtendimento = {
	status: "Aguardando" | "Andamento" | "Atendido";
	"data_atendimento": string;
	"hora-atendimento": string;
	medico: string;
  };

  export type { UltimosAtendimento };
