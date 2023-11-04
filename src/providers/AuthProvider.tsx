import apiBase from "@/api";
import support from "@/api/support";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts";
import { IApiBaseUserSelf } from "@/types/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { api } = support();

  const navigate = useNavigate();
  
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IApiBaseUserSelf | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (
    username: string, 
    password: string
  ) => {
    const res = await apiBase().auth().login(username, password);

    if (res.status === 'success') {
      // Set token to header
      api.defaults.headers['Authorization'] = `Bearer ${res.data?.token}`;
      setToken(res.data?.token);
      setUser(res.data.user);
      // navigate("/");
    }

    return res;
  }

  const register = async (
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    password: string
  ) => {
    const res = await apiBase().auth().register(email, username, first_name, last_name, password);

    if (res.status === "success") {
      navigate("/login");
    }
  }

  const refreshToken = async () => {
    const res = await apiBase().auth().refreshToken();

    if (res.status === "success") {
      api.defaults.headers["Authorization"] = `Bearer ${res.data?.token}`;
      setToken(res.data.token);
      setIsLoading(false);

      try {
        await self();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const self = async () => {
    const res = await apiBase().user().self();

    if (res.status === "success") {
      setUser(res.data);
    }
  }

  const logout = async () => {
    const res = await apiBase().auth().logout();

    if (res.status === "success") {
      delete api.defaults.headers["Authorization"];
      setToken(null);
      setUser(null);
      navigate("/login");
    }
  }

  useEffect(() => {
    const fetchRefreshToken = async () => {
      if (location.pathname === "/login" || location.pathname === "/register") {
        setIsLoading(false);

        if (user) {
          navigate("/");
        }
      } else {
        try {
          await refreshToken();
        } catch (error) {
          setIsLoading(false);
          navigate("/login");
        }
      }
    };

    fetchRefreshToken();
  }, []);

  if (isLoading) {
    return <div></div>
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token: token,
        login,
        register,
        refreshToken,
        self,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}