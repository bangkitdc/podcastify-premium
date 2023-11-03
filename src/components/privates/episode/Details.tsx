import DetailHeader from "./DetailHeader"
import CommentList from "./CommentList"

export default function Details() {

  return(
    <div>
      <DetailHeader/>
      <div className=" h-px bg-clr-text-primary my-12"></div>
      <h1>Comments</h1>
      <br />
      <CommentList/>
    </div>
  )
}