import Comment from "./Comment"

export default function CommentList() {
  const array = [1,2,3,4,5]
  return(
    <>
    {
      array.map(() => (
        <Comment/>
      ))
    }
    </>
  )
}