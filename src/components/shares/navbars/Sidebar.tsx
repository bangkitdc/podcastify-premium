import apiBase from "@/api";
import { useAuth } from "@/contexts";
import { FormEvent } from "react";
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
  const apiBaseError = apiBase().error();
  const { logout } = useAuth();

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await logout();
    } catch (error) {
      apiBaseError.set(error);
      if (apiBaseError.getMessage()) {
        // console.log(apiBaseError.message);
        // TODO: notification handle

        alert(apiBaseError.getMessage());
      }
    } 
  }

  return (
    <div className="flex flex-col px-2 py-4 bg-clr-background-base-two rounded-lg gap-2 col-span-1 row-span-6 font-medium justify-between">
      <div>
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
      <div>
        <button
          onClick={handleLogout}
        >
          Logout sayang
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
