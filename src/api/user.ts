import { IApiBaseUserSelf } from "@/types/user";
import support from "./support";
import { IApiBaseResponse } from "@/types/http";

const auth = () => {
  const { api, apiUrl } = support();
  const url = {
    self: apiUrl.self
  }

  const self = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseUserSelf>>(
      url.self, { }
    )

    return response.data;
  }

  return {
    self,
  }
}

export default auth;