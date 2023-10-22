import { IMAGES_DIR } from "../../../config/config";
function PodcastCard({ img_url }: { img_url: string }) {
  return (
    <div className=" bg-clr-background-card p-4 rounded-lg h-fit shadow cursor-pointer flex flex-col hover:bg-clr-background-highlight-two">
      <div className="w-full pb-[100%] relative">
        {img_url ? (
          <img src={img_url} alt="Testing" />
        ) : (
          <img
            className=" w-full h-full rounded-ss-md shadow-xl object-cover object-center absolute top-0 left-0 wbg-auto"
            src={IMAGES_DIR + "podcast-template.png"}
          ></img>
        )}
      </div>

      <p>Title</p>
      <div>
        <p>Creator</p>
      </div>
    </div>
  );
}

export default PodcastCard;
