import { Link } from "react-router-dom";

function Sidebar({
  navList,
  currentUrl,
}: // value,
// setValue,
{
  navList: Record<string, string[]>;
  currentUrl: string;
  // value: string;
  // setValue: (event: string) => void;
}) {
  return (
    <div className="flex flex-col px-2 py-4 bg-clr-background-base-two rounded-lg gap-2 col-span-1 row-span-6 font-medium">
      {Object.entries(navList).map(([url, [displayName, iconUrl]], index) => (
        <Link
          key={index}
          to={url}
          className={`flex justify-start gap-6 items-center cursor-pointer py-2 px-2 font-bold ${
            currentUrl === url ? "opacity-100" : "opacity-70"
          }`}
          // onClick={() => setValue(url)}
        >
          <img src={iconUrl} className="overflow-hidden" />
          <div>{displayName}</div>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
