export type IApiBaseEpisode = {
  episode_id: number;
  title: string;
  description: string;
  creator_id: number;
  category_id: number;
  duration: number;
  image_url?: string;
  audio_url: string;
};
