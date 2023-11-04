import { useAuth } from "@/contexts";
import { IMAGES_DIR } from "../../../config/config";

function Topbar() {
  const { user } = useAuth();

  return (
    <div className=" sticky top-0 col-span-3 flex justify-end py-4 px-6 items-center">
      <div className="items-center font-medium text-base cursor-pointer">
        <button className="gap-2 bg-clr-background-base-one cursor-pointer float-right rounded-full border-none text-clr-text-primary items-center inline-flex text-base h-8 py-0 px-1 max-w-[182.5]">
          <img
            className="w-6 h-6 rounded-[50%] inline-block"
            src={IMAGES_DIR + "avatar-template.png"}
            alt=""
          />
          <p className=" text-sm my-0 mx-[10] font-semibold">{user?.username}</p>
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default Topbar;
