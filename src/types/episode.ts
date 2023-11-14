export type IApiBaseEpisode = {
  episode_id: number;
  title: string;
  description: string;
  user: {
    first_name: string;
    last_name: string;
  };
  creator_id: number;
  category: {
    name: string;
  };
  duration: number;
  image_url?: string | null;
  audio_url: string;

  // Comments
  episodeComments: IEpisodeCommentLessData[];

  // Likes
  episodeLikesCount: number;

  // Like status
  episodeLiked?: boolean;

  created_at: Date;
};

export type IEpisodeCommentLessData = {
  comment_id: number;
  username: string;
  comment_text: string;
  created_at: Date;
  updated_at: Date;
};
