import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addModal, close, show } from "@/compossables/useModalState/reducer";

import PrimaryModal from "@/components/shares/modals/Primary";
import BaseTable from "@/components/shares/tables/BaseTable";
import BaseFileUploader from "@/components/shares/uploads/Base";

import useInput from "@/hooks/useInput";
import useFile from "@/hooks/useFile";
import ConfirmationModal2 from "@/components/shares/modals/Confirmation2";
import ModalInputText from "@/components/shares/inputs/ModalInputText";

export default function ListEpisode2() {
  const data = [
    ["Episode1", "Podcast1", "id1"],
    ["Episode2", "Podcast1", "id2"],
    ["Episode3", "Podcast2", "id3"],
  ];

  const dispatch = useDispatch();

  // Create modal reference
  const modalEdit = useRef("modalEdit");
  dispatch(addModal(modalEdit.current));

  const modalDelete = useRef("modalDelete");
  dispatch(addModal(modalDelete.current));

  const handleOpenModal = (modalId: string) => {
    dispatch(show(modalId));
  };

  const handleCloseModal = () => {
    dispatch(close(modalEdit.current));
  }

  const handleSave = async () => {
    try {
      console.log("submitted");
    } catch (error) {
      console.error(error);
    }
  }

  const headers = ["Title", "Podcast", "Manage"];
  const percentage = [50, 30, 20];

  // TODO:dont use like this
  // make it fetch every open/ empty
  const [title, setTitle] = useInput("");
  const [description, setDescription] = useInput("");
  const [imageFile, setImageFile] = useFile(null);
  const [audioFile, setAudioFile] = useFile(null);

  return (
    <>
      <BaseTable
        headers={headers}
        percentage={percentage}
        data={data}
        manageOption={true}
        manageText={["Edit", "Delete"]}
        onClickManage1={() => handleOpenModal(modalEdit.current)}
        onClickManage2={() => handleOpenModal(modalDelete.current)}
      />
      <PrimaryModal
        key={modalEdit.current}
        id={modalEdit.current}
        modalContent={
          <div className="flex flex-col gap-4">
            <h2 className="text-left">Edit episode</h2>
            <form className="flex flex-col gap-4">
              <ModalInputText
                id="episode-title"
                label="Title"
                placeholder="Title"
                required={false}
                value={title}
                setValue={setTitle}
              />
              <ModalInputText
                id="episode-description"
                label="Description"
                placeholder="Description"
                required={false}
                value={description}
                setValue={setDescription}
              />
              <BaseFileUploader
                id="episode-poster-upload"
                type="image"
                label="Poster File :"
                value={imageFile}
                setValue={setImageFile}
              />
              <BaseFileUploader
                id="episode-poster-upload"
                type="audio"
                label="Audio File :"
                value={audioFile}
                setValue={setAudioFile}
              />
            </form>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-1 py-2 hover:text-clr-text-primary-darken text-sm"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="text-sm font-bold bg-clr-text-info hover:bg-clr-text-info-hover py-2 px-6 rounded-full text-clr-text-black border-clr-background-highlight-one"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        }
      />
      <ConfirmationModal2
        id={modalDelete.current}
        heading="Delete episode"
        text1="Do you want to delete"
        data={data[0][0]}
        text2="from your library?"
        confirmText="Yes"
      />
    </>
  );
}