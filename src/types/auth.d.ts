export type IApiBaseAuthLogin = {
  // Token
  status: string
  message: string
  data: {
    token?: string
  }
}

export type IApiBaseAuthError = {
  status: string
  message: string
}