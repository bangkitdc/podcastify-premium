import { ICONS_DIR } from '@/config/config';
import { IEpisodeCommentLessData } from '@/types/episode';

export default function Comment({
  comment,
}: {
  comment: IEpisodeCommentLessData;
}) {
  return (
    <div className=" grid grid-cols-10 grid-rows-2 pb-9">
      <div className=" flex items-center justify-center">
        <img
          className=" w-8 rounded-full col-span-1 row-span-2 max-ipad:w-5"
          src={ICONS_DIR + 'user.svg'}
          alt=""
        />
      </div>
      <div className=" flex gap-2 col-span-9 items-center text-clr-text-secondary-darken">
        <p className=" font-thin">{comment.username}</p>
        <span className=" font-thin">•</span>
        <p className=" font-thin">
          {formatDateDetail(comment.created_at.toString())}
        </p>
      </div>
      <div className=" col-span-1"></div>
      <div className=" col-span-9">
        <p>{comment.comment_text}</p>
      </div>
      <div className=" h-px bg-clr-background-highlight-two col-span-10 mt-4"></div>
    </div>
  );
}

function formatDateDetail(dateString: string): string {
  const dateTime = new Date(dateString);

  const day = dateTime.getDate().toString().padStart(2, '0');
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    dateTime,
  );
  const year = dateTime.getFullYear().toString();
  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    dateTime,
  );

  return `${dayName}, ${day} ${month} ${year}`;
}
