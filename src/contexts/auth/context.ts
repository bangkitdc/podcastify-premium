import { IApiBaseAuthContext } from "@/types/auth";
import { createContext, useContext } from "react";

const context = createContext<IApiBaseAuthContext>({
  user: null,
  token: null,

  login: async () => {
    return undefined;
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

  logout: () => {}
});

export default context;

export const useAuth = () => {
  return useContext(context);
}