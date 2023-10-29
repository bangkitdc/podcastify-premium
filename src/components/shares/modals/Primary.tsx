import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ModalState } from "@/types/modal";
import { close } from "@/compossables/useModalState/reducer";
import { RootState } from "@/compossables/store";

export default function PrimaryModal({
  id,
  modalContent,
}: {
  id: string;
  modalContent?: ReactNode;
}) {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(close(id));
  };

  const modals = useSelector((state: RootState) => state.modal);
  const isActive =
    modals.find((modal: ModalState) => modal.target === id)
      ?.show || false;

  return (
    <div
      id={id}
      className={`top-0 left-0 fixed w-full h-screen z-50 ${isActive ? 'block' : 'hidden'}`}
    >
      <div
        className="bg-black bg-opacity-50 backdrop-blur-md absolute top-0 left-0 w-full h-full z-0"
        onClick={handleCloseModal}
      ></div>
      <div className="flex justify-center items-center h-full">
        <div className="relative bg-clr-background-modal p-6 rounded-lg shadow-sm w-[524px] z-30">
          {modalContent}
        </div>
      </div>
    </div>
  );
}