// import { createRoot } from "react-dom/client";
import { IMAGES_DIR } from "../config/config";

export default function Error404page() {
  const errorpage = (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="mb-8">
        <img
          src={IMAGES_DIR + "white-upside-spotify.png"}
          alt="Logo"
          width="120px"
        />
      </div>
      <div className="flex flex-col items-center">
        <h1 className=" text-5xl m-4">Page not found</h1>
        <p className="text-clr-text-secondary pb-10">
          We can't seem to find the page you are looking for.
        </p>
        <div>
          <button className="py-4 px-8 rounded-full text-base bg-clr-text-primary text-clr-text-black border-2 border-solid border-clr-background-highlight-two">
            Home
          </button>
        </div>
      </div>
    </div>
  );
  //TODO : Change the whole page
  // const targetElement = document.getElementById('content') ?? document.createElement('div');
  
  // const root = createRoot(targetElement);
  // root.render(errorpage);

  return errorpage
}
