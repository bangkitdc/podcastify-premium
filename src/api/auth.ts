import axios, { AxiosError } from 'axios';
import support from './support';

const auth = () => {
  const { apiUrl } = support();
  const url = {
    login: apiUrl.login,
    register: apiUrl.register,
  }

  const login = async (form: any) => {
    try {
      const response = await axios({
        method: 'POST',
        url: url.login,
        data: form
      })

      const data = response.data;
    } catch (error) {
      // const err = e as AxiosError
      // const errorMsg = err.response as ErrorRes
      // return errorMsg?.data?.message
    }
  }
}

export default auth;