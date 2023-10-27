import { Route, Routes, useLocation } from "react-router-dom";
import { ICONS_DIR } from "./config/config.ts";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Episodes from "./pages/creator/Episodes.tsx";
import Sidebar from "./components/shares/navbars/Sidebar.tsx";
import Topbar from "./components/shares/navbars/Topbar.tsx";
import Podcasts from "./pages/creator/Podcasts.tsx";
import CreateEpisode from "./pages/creator/CreateEpisode.tsx";
import CreatePodcast from "./pages/creator/CreatePodcast.tsx";
import SubscribeReq from "./pages/admin/SubscribeReq.tsx";

function App() {
  const currentUrl = useLocation().pathname;

  const isAuth = true;
  const isAdmin = false;

  const creatorNavList = {
    // url, [display, iconUrl]
    "/": ["Your Episodes", ICONS_DIR + "episode.svg"],
    "/podcasts": ["Your Podcasts", ICONS_DIR + "podcast.svg"],
    "/create-episode": ["Create Episode", ICONS_DIR + "add-circle.svg"],
    "/create-podcast": ["Create Podcast", ICONS_DIR + "add-circle.svg"],
  };

  const adminNavList = {
    "/": ["Subcription Requests", ICONS_DIR + "episode.svg"],
  }

  if (isAuth) {
    return (
      <div className="grid grid-cols-4 grid-rows-6 h-screen gap-2 overflow-hidden p-2">
        {isAdmin ? <Sidebar navList={adminNavList} currentUrl={currentUrl} /> : <Sidebar navList={creatorNavList} currentUrl={currentUrl} />}
        {/* <Sidebar navList={navList} currentUrl={currentUrl} /> */}
        <div className="flex flex-col relative col-span-3 row-span-6 overflow-scroll rounded-lg bg-clr-background-base-two">
          {/* Gradient */}
          {/* <div className=" absolute h-[50vh] bg-gradient-to-b from-clr-text-primary via-clr-background-highlight-three to-clr-background-base-two w-full z-0"></div> */}
          <Topbar />
          <div className="flex-1 z-[1] py-0 px-6">
            <Routes>
              {isAdmin ? <Route path="/" element={<SubscribeReq/>}/> : <Route path="/" element={<Episodes />} />}
              {/* <Route path="/" element={<Episodes />} /> */}
              <Route path="/episodes" element={<Episodes />} />
              <Route path="/podcasts" element={<Podcasts />} />
              <Route path="/create-episode" element={<CreateEpisode />} />
              <Route path="/create-podcast" element={<CreatePodcast />} />
              <Route path="/*" />
              {/* TODO: Error page */}
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
