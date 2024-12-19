type GetUserInputDto = {
	page: number;
	size: number;
	nome: string;
}

type GetUserOutputDto = {
	nnumeusua: number
	cncomusua: string
	c_cpfusua: string
};

export type { GetUserInputDto, GetUserOutputDto };

