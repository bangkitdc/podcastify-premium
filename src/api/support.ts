const support = () => {
  const URL = process.env.API_BASE_URL as string;

  const apiUrl = {
    login: URL + '/login',
    register: URL +'/register'
  }

  return { apiUrl };
}

export default support;
