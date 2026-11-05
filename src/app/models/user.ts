// O que o back devolve no cadastro e no /auth/me (nunca vem a senha)
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
