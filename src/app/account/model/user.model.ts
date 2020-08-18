import {IRole} from './role.model';

export interface IUser {
  id?: number;
  username?: string;
  email?: string;
  /*role?: IRole;*/
  status?: string;
 /* phone?: string;*/
  is_staff?: boolean;
/*  gender?: string;*/
  is_admin?: boolean;
  first_name?: string;
  last_name?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User implements IUser {
  constructor(
    public id?: number,
    public username?: string,
    public  email?: string,
    public first_name?: string,
    public last_name?: string,
    public is_staff?: boolean,
    public is_admin?: boolean,
    /*public gender?: string,
    public role?: IRole,*/
    /*public phone?: string,*/
    public status?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public password?: string
  ) {}
}
