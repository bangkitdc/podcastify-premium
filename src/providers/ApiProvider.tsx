import apiBase from "@/api";
import { api, support } from "@/api/support";
import { APIContext } from "@/contexts";
import { AxiosRequestHeaders } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface APIProviderProps {
  children: React.ReactNode;
}

export default function APIProvider({ children }: APIProviderProps) {
  api.interceptors.request.use(
    async (config) => {
      const accessToken = api.defaults.headers.common['Authorization']?.toString();

      config.headers = {
        ...config.headers,
        Authorization: `${accessToken}`,
      } as AxiosRequestHeaders;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let refresh: any = null;

  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (redirectUrl) {
      navigate(redirectUrl);
      setRedirectUrl(null); // Reset redirect URL after navigation
    }
  }, [redirectUrl]);

  const { apiUrl } = support();
  const navigate = useNavigate();

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && originalRequest.url === apiUrl.refreshToken) {
        setRedirectUrl('/login');
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          refresh = refresh ? refresh : apiBase().auth().refreshToken();
          const res = await refresh;

          refresh = null;

          if (res.status === 'success') {
            setToken(res.data?.token);
          } else {
            return Promise.reject(error);
          }
          return api(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );

  const setToken = (token: string | null) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };

  return (
    <APIContext.Provider
      value={{
        token:
          api.defaults.headers.common['Authorization']?.toString() ||
          null,
        setToken,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}