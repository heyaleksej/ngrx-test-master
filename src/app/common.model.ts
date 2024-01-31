export interface IUser {
  id?: string;
  create: string;
  fio:string;
  position: string;
  email: string;
  password: string;
  phone: string;
}

export interface IFilter {
  id?: string;
  fio?: string;
  position?: string;
  email?: string;
}

export interface IUserState {
  users: IUser[];
  filter: IFilter | null;
}

