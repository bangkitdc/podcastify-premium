import { IMAGES_DIR } from "@/config/config";

export default function DetailHeader() {
  return(
    <div className="flex flex-col items-center gap-3">
      <img className=" w-48 rounded-2xl" src={IMAGES_DIR + "episode-template.png"} alt="" />
      <h1>Title</h1>
      <p>20 Likes</p>
      <p>56 Minutes</p>
      <p className=" text-center text-clr-text-primary-darken">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil ducimus quas officia sit reiciendis natus libero voluptatibus ipsam, alias explicabo, laudantium excepturi nisi iste amet consequatur quae fuga sint velit?</p>
    </div>
  )
}