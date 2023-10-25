import { Route, Routes, useLocation} from "react-router-dom";
import { ICONS_DIR } from "./config/config.ts";
import RegisterPage from "./pages/Registerpage.tsx";
import Loginpage from "./pages/Loginpage.tsx";
import Episodespage from "./pages/Episodespage.tsx";
import Sidebar from "./components/shares/navbars/Sidebar.tsx";
import Topbar from "./components/shares/navbars/Topbar.tsx";
import Podcastspage from "./pages/Podcastspage.tsx";
import CreateEpisodepage from "./pages/CreateEpisodepage.tsx";
import CreatePodcastpage from "./pages/CreatePodcastpage.tsx";

function App() {

  const currentUrl= useLocation().pathname
  
  const isAuth = true;

  const navList = { // url, [display, iconUrl]
    '/': ['Your Episodes', ICONS_DIR + 'episode.svg'],
    '/podcasts': ['Your Podcasts', ICONS_DIR + 'podcast.svg'],
    '/create-episode' : ['Create Episode', ICONS_DIR + 'add-circle.svg'],
    '/create-podcast' : ['Create Podcast', ICONS_DIR + 'add-circle.svg'],
  }

  if (isAuth) {
    return (
      <div className="grid grid-cols-4 grid-rows-6 h-screen gap-2 overflow-hidden p-2">
        <Sidebar navList={navList} currentUrl={currentUrl}/>
        <div className="flex flex-col relative col-span-3 row-span-6 overflow-scroll rounded-lg bg-clr-background-base-two">
          {/* Gradient */}
          {/* <div className=" absolute h-[50vh] bg-gradient-to-b from-clr-text-primary via-clr-background-highlight-three to-clr-background-base-two w-full z-0"></div> */}
          <Topbar />
          <div className="flex-1 z-[1] py-0 px-6">
            <Routes>
              <Route path="/" element={<Episodespage />} />
              <Route path="/episodes" element={<Episodespage />} />
              <Route path="/podcasts" element={<Podcastspage />} />
              <Route path="/create-episode" element={<CreateEpisodepage />} />
              <Route path="/create-podcast" element={<CreatePodcastpage />} />
              <Route path="/*"/>
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
        <Route path="/" element={<Loginpage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
