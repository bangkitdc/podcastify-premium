import { APIType } from "@/api/support";

export type IApiBaseAPIContext = {
  api: APIType
  token: string | null;
  setToken: (token: string | null) => void;
};