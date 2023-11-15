/* eslint-disable react-hooks/rules-of-hooks */
import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBaseCategory } from "@/types/category";

const category = () => {
  const { apiUrl } = support();

  const url = {
    category: apiUrl.category
  }

  const categories = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseCategory[]>>(
      url.category
    );

    return response.data;
  }

  return {
    categories
  };
};

export default category