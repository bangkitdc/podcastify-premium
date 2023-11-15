/* eslint-disable react-hooks/rules-of-hooks */
import { IApiBaseResponse } from "@/types/http";
import { api, support } from "./support";
import { IApiBaseEpisode } from "@/types/episode";

const episode = () => {
  const { apiUrl } = support();

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

  const episodeImage = async (id: string) => {
    const response = await api.get(
      url.episode + "/downloadImage" + id,
      {
        responseType: 'arraybuffer',
      }
    );
    console.log(response.data);
    
    return response
  }

  const createEpisode = async (
    title: string,
    description: string,
    category_id: number,
    duration: number,
    imageFile: FileList | null,
    audioFile: FileList | null,
  ) => {
    const formdata = new FormData();

    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append('category_id', category_id.toString());
    formdata.append('duration', duration.toString())

    if(audioFile instanceof FileList) {
      formdata.append('audio_file', audioFile[0])
    }

    if(imageFile instanceof FileList) {
      formdata.append('image_file', imageFile[0])
    }

    const response = await api.post<IApiBaseResponse<IApiBaseEpisode>>(
      url.episode,
      formdata,
      {
        headers: {
          "Content-Type": "multiform/form-data",
        },
      }
    );

    return response.data;
  };

  const updateEpisode = async (
    id: number,
    title: string,
    description: string,
    category_id: number,
    duration: number,
    imageFile: FileList | null,
    audioFile: FileList | null,
  ) => {
    const formdata = new FormData();

    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append('category_id', category_id.toString());
    formdata.append('duration', duration.toString())

    if(audioFile instanceof FileList) {
      formdata.append('audio_file', audioFile[0])
    }

    if(imageFile instanceof FileList) {
      formdata.append('image_file', imageFile[0])
    }

    const response = await api.post<IApiBaseResponse<IApiBaseEpisode>>(
      url.episode + "/" + id,
      formdata,
      {
        headers: {
          "Content-Type": "multiform/form-data",
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
    episodeImage,
    createEpisode,
    updateEpisode,
    deleteEpisode,
  };
};

export default episode;
