type LoginInputDto = {
  username: string;
  password: string;
};

type LoginOutputDto = {
  access_token: string;
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
