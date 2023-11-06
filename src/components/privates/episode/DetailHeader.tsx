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
  likes: string;
  duration: number;
  description: string;
}) {
  const minutesToHoursAndMinutes = (
    minutes: number
  ): {
    hours: number;
    minutes: number;
  } => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return { hours, minutes: remainingMinutes };
  };

  const { hours, minutes } = minutesToHoursAndMinutes(duration);

  return (
    <div className="flex flex-col items-center gap-3">
      <img
        className=" w-48 rounded-2xl"
        src={image_url ? image_url : IMAGES_DIR + "episode-template.png"}
        alt=""
      />
      <h1>{title}</h1>
      <p>{likes} Likes</p>
      <p>
        {hours
          ? hours + " Hours " + minutes + " Minutes"
          : minutes + " Minutes"}
      </p>
      <p className=" text-center text-clr-text-primary-darken">{description}</p>
    </div>
  );
}
