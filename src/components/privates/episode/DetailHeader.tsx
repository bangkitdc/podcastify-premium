import { IMAGES_DIR } from "@/config/config";

export default function DetailHeader({
  image_url,
  title,
  likes,
  duration,
  description,
}: {
  image_url: string;
  title: string;
  likes: number | undefined;
  duration: number;
  description: string;
}) {
  const secondsToHoursMinutesAndSeconds = (
    seconds: number
  ): {
    hours: number;
    minutes: number;
    seconds: number;
  } => {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return { hours, minutes: remainingMinutes, seconds: remainingSeconds };
  };  

  const { hours, minutes, seconds } = secondsToHoursMinutesAndSeconds(duration);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className=" w-48 h-48">
        <img
          className=" w-full h-full rounded-2xl object-cover"
          src={image_url ? image_url : IMAGES_DIR + "episode-template.png"}
          alt=""
        />
      </div>
      <h1 className=" text-center">{title}</h1>
      <p>{likes ?? 0} Likes</p>
      <p>
        {hours
          ? hours + " Hours " + minutes + " Minutes " + seconds + " Seconds"
          : (minutes ? minutes + " Minutes " + seconds + " Seconds" : seconds + " Seconds")}
      </p>
      <p className=" text-center text-clr-text-primary-darken">{description}</p>
    </div>
  );
}
