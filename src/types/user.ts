export type IApiBaseUser = {
  user_id: number
  email: string
  username: string
  first_name: string
  last_name: string
  password: string
  role_id: number
  created_at: Date
  updated_at: Date
}

export type IApiBaseUserSelf = {
  user_id: number
  email: string
  username: string
  first_name: string
  last_name: string
  role_id: number
}