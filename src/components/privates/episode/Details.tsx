import DetailHeader from './DetailHeader';
import CommentList from './CommentList';
import { useEffect, useState } from 'react';
import episode from '@/api';
import { IApiBaseEpisode } from '@/types/episode';

export default function Details() {
  const episode_id = location.pathname;
  const [episodeDetail, setEpisodeDetail] = useState<IApiBaseEpisode>();

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const episodeData = await episode()
          .episode()
          .episodeDetail(episode_id ?? '');

        const episodeImage = await episode()
          .episode()
          .episodeImage(episode_id ?? '');

        if (episodeImage) {
          const base64 = btoa(
            new Uint8Array(episodeImage.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          );

          const imageDataUrl = `data:${episodeImage.headers['content-type']};base64,${base64}`;
          episodeData.data.image_url = imageDataUrl;
        }
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
        image_url={episodeDetail?.image_url ?? ''}
        title={episodeDetail?.title ?? ''}
        likes={episodeDetail?.episodeLikesCount}
        duration={episodeDetail?.duration ?? 0}
        description={episodeDetail?.description ?? ''}
      />
      <div className=" h-px bg-clr-text-primary my-12"></div>
      <h2>Comments</h2>
      <br />
      <CommentList comments={episodeDetail?.episodeComments} />
    </div>
  );
}
