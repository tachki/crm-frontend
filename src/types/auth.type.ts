export interface IAuthForm {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  login: string;
  business_id: string;
  is_verified: boolean;
  user_type: string;
  created_at: string;
  updated_at: string;
}

// export type TypeNoteListFormState = Partial<Omit<IUser, 'id' | 'updatedAt' | 'createdAt'>>

export interface IAuthLoginResponse {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface IAuthRegisterResponse {
  user_id: string;
}

export interface IAuthRefreshResponse {
  access_token: string;
  refresh_token: string;
}


export interface IСhoiceCar {
  stamp: string;
  model: string;
  year: string;
  number: string;
  kpp: string;
  classCar: string;
  price: string;
  text: string;
}


