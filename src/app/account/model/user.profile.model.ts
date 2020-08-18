
export interface IUserProfile {
  id?: number;
  gender?: string;
  contact_address?: string;
  city?: string;
  state?: string;
  phone?: string;
  home_address?: string;
  zip_code?: string;
  local_government?: string;
  country?: string;
  created_at?: Date;
  updated_at?: Date;
  user?: number;
}

export class UserProfile implements IUserProfile{
  constructor(
    public id?: number,
    public gender?: string,
    public contact_address?: string,
    public city?: string,
    public state?: string,
    public country?: string,
    public home_address?: string,
    public local_government?: string,
    public phone?: string,
    public zip_code?: string,
    public created_at?: Date,
    public updated_at?: Date,
    public user?: number
  ) {
  }
}
