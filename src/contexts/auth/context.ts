import { IApiBaseAuthContext, IApiBaseAuthLogin } from "@/types/auth";
import { IApiBaseResponse } from "@/types/http";
import { createContext, useContext } from "react";

const context = createContext<IApiBaseAuthContext>({
  user: null,

  login: async () => {
    // Simulate a login response (you should make an API call here)
    const loginResponse: IApiBaseResponse<IApiBaseAuthLogin> = {
      data: {
        user: {
          user_id: -1,
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          role_id: -1,
        },
        token: ""
      },
      status: "success",
      message: 'Login successful',
    };

    return Promise.resolve(loginResponse);
  },
  
  register: async () => {
    return undefined;
  },

  refreshToken: async () => {
    return undefined;
  },

  self: async () => {
    return undefined;
  },

  logout: async () => {
    return undefined;
  }
});

export default context;

export const useAuth = () => {
  return useContext(context);
}