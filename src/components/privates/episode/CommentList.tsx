import { IEpisodeCommentLessData } from '@/types/episode';
import Comment from './Comment';

export default function CommentList({
  comments,
}: {
  comments: IEpisodeCommentLessData[] | undefined;
}) {
  if (comments) {
    return (
      <>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </>
    );
  }
  return (
    <>
      <h3 className=" text-center">No Comment Available</h3>
    </>
  );
}
