export enum UserRoles {
  USER = "user",
  PIZZAR = "pizzar",
  ADMIN = "admin",
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegistrationCredentials extends ILoginCredentials {
  name: string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  id: string;
}

export interface IAccess {
  token: string;
  expires: Date;
}

export interface IRefresh {
  token: string;
  expires: Date;
}

export interface ITokens {
  access: IAccess;
  refresh: IRefresh;
}

export interface IAuthResponseModel {
  user: IUser;
  tokens: ITokens;
}
