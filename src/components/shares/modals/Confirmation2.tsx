import { RootState } from "@/compossables/store";
import { close } from "@/compossables/useModalState/reducer";
import { ModalState } from "@/types/modal";
import { useDispatch, useSelector } from "react-redux";

export default function ConfirmationModal2({
  id,
  heading,
  text1,
  data,
  text2,
  confirmText,
}: {
  id: string;
  heading: string;
  text1: string;
  data?: string;
  text2?: string;
  confirmText: string;
}) {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(close(id));
  };

  const modals = useSelector((state: RootState) => state.modal);
  const isActive =
    modals.find((modal: ModalState) => modal.target === id)?.show || false;

  return (
    <div
      id={id}
      className={`top-0 left-0 fixed w-full h-screen z-50 ${
        isActive ? "block" : "hidden"
      }`}
    >
      <div
        className="bg-black black bg-opacity-50 backdrop-blur-md absolute top-0 left-0 w-full h-full z-0"
        onClick={handleCloseModal}
      ></div>
      <div className="flex justify-center items-center h-full">
        <div className="relative bg-clr-background-modal p-6 rounded-lg shadow-sm w-[524px] z-30 flex flex-col gap-5">
          <h2 className=" text-clr-text-primary">{heading}</h2>
          <p className=" text-clr-text-primary text-sm font-thin">
            {text1}
            &nbsp;
            <span className="font-extrabold">{data}</span>
            &nbsp;
            {text2}
          </p>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="text-sm px-1 py-1.5 hover:text-clr-text-primary-darken"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="text-sm font-bold bg-clr-text-info hover:bg-clr-text-info-hover py-2 px-6 rounded-full text-clr-text-black border-clr-background-highlight-one"
              // onClick={handleSave}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
