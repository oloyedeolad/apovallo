import {IUser} from './user.model';

export interface ILogin {
  rememberMe?: boolean;
  username?: string;
  password?: string;
  oldPassword?: string;
}

export class Login implements ILogin {
  constructor(public rememberMe?: boolean, public username?: string, public password?: string, public oldPassword?: string) {
  }
}

export interface ILoginResponse {
  user: IUser;
  refresh: string;
  access: string;
}

export class LoginResponse implements ILoginResponse {
  constructor(public user: IUser, public refresh: string, public access: string) {}
}
