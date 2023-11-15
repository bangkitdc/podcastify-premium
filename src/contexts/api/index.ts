import { api } from "@/api/support";
import { IApiBaseAPIContext } from "@/types/api";
import { createContext, useContext } from "react";

const context = createContext<IApiBaseAPIContext>({
  api: api,
  token: null,
  setToken: () => {
    return undefined;
  },
})

export default context;

export const useAPI = () => {
  return useContext(context);
}