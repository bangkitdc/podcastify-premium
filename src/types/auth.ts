import { IApiBaseResponse } from "./http"
import { IApiBaseUserSelf } from "./user"

export type IApiBaseAuthLogin = {
  user: IApiBaseUserSelf
  token: string
}

export type IApiBaseAuthRegister = {
  user: IApiBaseUserSelf
}

export type IApiBaseAuthContext = {
  user: IApiBaseUserSelf | null

  login: (
    username: string, 
    password: string
  ) => Promise<IApiBaseResponse<IApiBaseAuthLogin>>

  register: (
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    password: string
  ) => Promise<void>

  refreshToken: () => Promise<void>

  self: () => Promise<void>

  logout: () => Promise<void>
}