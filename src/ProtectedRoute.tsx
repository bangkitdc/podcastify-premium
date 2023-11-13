import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./components/shares/navbars/Sidebar";
import { ICONS_DIR } from "./config/config";
import Topbar from "./components/shares/navbars/Topbar";

interface ProtectedRouteProps {
  isAuth: boolean;
  isAdmin: boolean;
  currentUrl: string;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuth, isAdmin, currentUrl, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate, isAuth]);

  const creatorNavList = {
    // url, [display, iconUrl]
    "/": ["Your Episodes", ICONS_DIR + "episode.svg"],
    "/create-episode": ["Create Episode", ICONS_DIR + "add-circle.svg"],
    "/subscriber": ["Your Subscribers", ICONS_DIR + "subscriber.svg"],
  };

  const adminNavList = {
    "/": ["Subcription Requests", ICONS_DIR + "subscriber.svg"],
  };

  const [isLtMd, setIsLtMd] = useState(window.innerWidth < 1024);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsLtMd(window.innerWidth < 1024);
    })
  }, [])

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-6 h-screen gap-2 overflow-hidden p-2">
        {isAdmin ? (
          <Sidebar navList={adminNavList} currentUrl={currentUrl} />
        ) : (
          <Sidebar navList={creatorNavList} currentUrl={currentUrl} />
        )}
        {/* <Sidebar navList={navList} currentUrl={currentUrl} /> */}
        <div className={`flex flex-col relative row-span-6 overflow-y-scroll rounded-lg bg-clr-background-base-two ${isLtMd ? 'col-span-4' : 'col-span-3'}`}>
          {/* Gradient */}
          {/* <div className=" absolute h-[50vh] bg-gradient-to-b from-clr-text-primary via-clr-background-highlight-three to-clr-background-base-two w-full z-0"></div> */}
          <Topbar />
          <div className="flex-1 z-[1] py-0 px-6">
            {/* {isAdmin ? (
              <Route path="/" element={<SubscribeReq />} />
            ) : (
              <Route path="/" element={<Episodes />} />
            )} */}
            {/* <Route path="/episodes" element={<Episodes />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/create-episode" element={<CreateEpisode />} />
            <Route path="/create-podcast" element={<CreatePodcast />} /> */}
            {/* <Route path="/*" /> */}
            {/* TODO: Error page */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedRoute;
