import DetailHeader from "./DetailHeader";
import CommentList from "./CommentList";
import { useEffect, useState } from "react";
import episode from "@/api";
import { IApiBaseEpisode } from "@/types/episode";

export default function Details() {
  const episode_id = location.pathname;
  const [episodeDetail, setEpisodeDetail] = useState<IApiBaseEpisode>();

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const episodeData = await episode()
          .episode()
          .episodeDetail(episode_id ?? "");
        setEpisodeDetail(episodeData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEpisode();
  }, []);

  return (
    <div>
      <DetailHeader
        image_url={episodeDetail?.image_url ?? ""}
        title={episodeDetail?.title ?? ""}
        likes="60"
        duration={episodeDetail?.duration ?? 0}
        description={episodeDetail?.description ?? ""}
      />
      <div className=" h-px bg-clr-text-primary my-12"></div>
      <h1>Comments</h1>
      <br />
      <CommentList />
    </div>
  );
}
