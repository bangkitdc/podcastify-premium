import { ICONS_DIR } from "@/config/config";

export default function Comment() {
  return (
    <div className=" grid grid-cols-10 grid-rows-2 pb-9">
      <div className=" flex items-center justify-center">
        <img
          className=" w-8 rounded-full col-span-1 row-span-2"
          src={ICONS_DIR + "user.svg"}
          alt=""
        />
      </div>
      <div className=" flex gap-2 col-span-9 items-center text-clr-text-secondary-darken">
        <p className=" font-thin">Username</p>
        <span className=" font-thin">•</span>
        <p className=" font-thin">Date</p>
      </div>
      <div className=" col-span-1"></div>
      <div className=" col-span-9">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus placeat sapiente doloremque, odit, eum atque earum voluptate commodi perspiciatis non vero velit asperiores? Ducimus non perspiciatis, sunt qui odit nam!</p>
      </div>
      <div className=" h-px bg-clr-background-highlight-two col-span-10 mt-4" ></div>
    </div>
  );
}
