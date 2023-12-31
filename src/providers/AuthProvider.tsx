import apiBase from "@/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, useAPI } from "@/contexts";
import { IApiBaseUserSelf } from "@/types/user";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  
  const { setToken } = useAPI();
  const [user, setUser] = useState<IApiBaseUserSelf | null>(null);

  const login = async (
    username: string, 
    password: string
  ) => {
    const res = await apiBase().auth().login(username, password);
    if (res.status === 'success') {
      // Set token to header
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/");
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
      setToken(res.data.token);
      // setIsLoading(false);

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
      setToken(null);
      setUser(null);
      navigate("/login");
    }
  }

  useEffect(() => {
    const fetchRefreshToken = async () => {
      if (location.pathname === "/login" || location.pathname === "/register") {
        // setIsLoading(false);

        if (user) {
          navigate("/");
        }
      } else {
        try {
          await refreshToken();
        } catch (error) {
          // setIsLoading(false);
          navigate("/login");
        }
      } 
    };

    fetchRefreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        refreshToken,
        self,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}