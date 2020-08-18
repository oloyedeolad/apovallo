
export interface IRole {
  id?: number;
  title?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Role implements IRole {
  constructor(
    public id?: number,
    public title?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {
  }
}

export interface IUserActivation {
  user?: number;
  activation_key?: string;
}

export class UserActivation implements IUserActivation {
  constructor(
    public user?: number,
    public activation_Key?: string
  ) {
  }
}
