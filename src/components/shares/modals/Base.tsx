import { ReactNode } from "react";
import useModal from "../../../hooks/useModal";

export default function BaseModal({
  id,
  active = false,
  modalContent,
}: {
  id: string
  active?: boolean;
  modalContent?: ReactNode;
}) {
  
  const [isActive, setIsActive] = useModal(active)
  const display = isActive ? "block" : "hidden";

  return (
    <div
      id={id}
      className={`top-0 left-0 fixed w-full h-screen z-50 ${display}`}
    >
      <div
        className="bg-black bg-opacity-50 backdrop-blur-md absolute top-0 left-0 w-full h-full z-0"
        onClick={setIsActive}
      ></div>
      <div className="flex justify-center items-center h-full">
        <div className="relative bg-clr-background-modal p-6 rounded-lg shadow-sm w-[524px] z-30">
          {modalContent}
        </div>
      </div>
    </div>
  );
}
