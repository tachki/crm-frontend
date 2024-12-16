export interface IAuthForm {
  email: string
  password: string
}

export interface IUser {
  business_id: string
  created_at: string
  id: string
  is_verified: boolean
  login: string
  updated_at: string
  user_type: string
}

export interface IAuthLoginResponse {
  access_token: string
  refresh_token: string
  user: IUser
}

export interface IAuthRegisterResponse {
  user_id: string
}

export interface IAuthRefreshResponse {
  access_token: string
  refresh_token: string
}