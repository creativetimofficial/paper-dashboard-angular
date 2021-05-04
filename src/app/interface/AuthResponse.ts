export interface Auth {
  user: AuthUser;
  tokens: Tokens;
}

export interface Tokens {
  access: Access;
  refresh: Access;
}

export interface Access {
  token: string;
  expires: Date;
}

export interface AuthUser {
  role: string;
  isEmailVerified: boolean;
  name: string;
  email: string;
  id: string;
}
