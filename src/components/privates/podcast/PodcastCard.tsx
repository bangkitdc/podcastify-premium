import { ICONS_DIR, IMAGES_DIR } from "../../../config/config";
function PodcastCard({podcastData, img_url, handleManageModal }: {podcastData: string[]; img_url: string, handleManageModal : (id?: string) => void }) {
  
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

      <p className=" overflow-hidden whitespace-nowrap text-ellipsis">
        {podcastData[0]}
      </p>
      <div>
        <img onClick={() => handleManageModal(podcastData[2])} src={ICONS_DIR + "edit.svg"} alt="" />
      </div>
    </div>
  );
}

export default PodcastCard;
