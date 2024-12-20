type LoginInputDto = {
  username: string;
  password: string;
  remembe_me;
};

type LoginOutputDto = {
  accessToken: string;
  refreshToken: string;
} & UserData;

type UserData = {
  id_usuario: number;
  nome_usuario: string;
  nome: string;
  id_farmacia: number;
  farmacia: string;
  profiles: string[];
};

type Perfil = {
  [key in string]: string[];
};

export type { LoginInputDto, LoginOutputDto, Perfil, UserData };
