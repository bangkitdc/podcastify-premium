import { IApiBaseResponse } from "@/types/http";
import support from "./support";
import { IApiBaseEpisode } from "@/types/episode";

const episode = () => {
  const { api, apiUrl } = support();

  const url = {
    episode: apiUrl.episode,
  };

  const episodes = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseEpisode[]>>(
      url.episode
    );

    return response.data;
  };

  const episodeDetail = async (id: string) => {
    const response = await api.get<IApiBaseResponse<IApiBaseEpisode>>(
      url.episode + id
    );

    return response.data;
  };

  const createEpisode = async (
    title: string,
    description: string,
    creator_id: number,
    category_id: number,
    duration: number,
    audio_url: string,
    image_url?: string
  ) => {
    const response = await api.post<IApiBaseResponse<IApiBaseEpisode>>(
      url.episode,
      {
        title,
        description,
        creator_id,
        category_id,
        duration,
        image_url,
        audio_url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  const updateEpisode = async (
    id: number,
    title: string,
    description: string,
    creator_id: number,
    category_id: number,
    duration: number,
    image_url: string = "",
    audio_url: string
  ) => {
    if (image_url === undefined) {
      image_url = "";
    }

    console.log(image_url);

    const response = await api.post<IApiBaseResponse<IApiBaseEpisode>>(
      url.episode + "/" + id,
      {
        title,
        description,
        creator_id,
        category_id,
        duration,
        image_url,
        audio_url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  const deleteEpisode = async (id: number) => {
    const response = await api.delete<IApiBaseResponse<IApiBaseEpisode>>(
      url.episode + "/" + id
    );

    return response.data;
  };

  return {
    episodes,
    episodeDetail,
    createEpisode,
    updateEpisode,
    deleteEpisode,
  };
};

export default episode;
