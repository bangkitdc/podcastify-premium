import { ReactNode } from "react";

export default function BaseModal({
  id,
  active = false,
  modalContent,
}: {
  id: string
  active?: boolean;
  modalContent?: ReactNode;
}) {

  const display = active ? "block" : "hidden";

  return (
    <div
      id={id}
      className={` bg-[#000000b3] top-0 left-0 fixed w-full h-full z-[1001] ${display}`}
    >
      <div className="flex justify-center items-center fixed z-[1001] left-0 right-0 w-full h-full overflow-auto">
        <div className=" absolute bg-clr-background-modal p-6 rounded-lg shadow-sm w-[524px] z-30">
          {modalContent}
        </div>
      </div>
    </div>
  );
}
