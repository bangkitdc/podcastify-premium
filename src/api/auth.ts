import { IApiBaseAuthLogin, IApiBaseAuthRegister } from '@/types/auth';
import support from './support';
import { IApiBaseResponse } from '@/types/http';

const auth = () => {
  const { api, apiUrl } = support();
  const url = {
    login: apiUrl.login,
    register: apiUrl.register,
    refreshToken: apiUrl.refreshToken,
    logout: apiUrl.logout,
  }

  const login = async (
    username: string, 
    password: string
  ) => {
    
    const response = await api.post<IApiBaseResponse<IApiBaseAuthLogin>>(
      url.login, {
        username,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data;
  }

  const register = async (
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    password: string,
  ) => {
    const response = await api.post<IApiBaseResponse<IApiBaseAuthRegister>>(
      url.register, {
        email,
        username,
        first_name,
        last_name,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    return response.data;
  }

  const refreshToken = async () => {
    // try {
      const res = await api.post<IApiBaseResponse<IApiBaseAuthLogin>>(
        url.refreshToken,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

    return res.data;
    // } catch (error) {
    //   // Handled by error.ts
    // }
  }

  const logout = async () => {
    const res = await api.post<IApiBaseResponse<null>>(
      url.logout,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return res.data;
  }

  return {
    login,
    register,
    refreshToken,
    logout
  }
}

export default auth;