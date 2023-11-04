import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addModal, close, show } from "@/redux/modals/reducer";

import PrimaryModal from "@/components/shares/modals/Primary";
import BaseTable from "@/components/shares/tables/BaseTable";
import BaseFileUploader from "@/components/shares/uploads/Base";

import useInput from "@/hooks/useInput";
import useFile from "@/hooks/useFile";
import ModalInputText from "@/components/shares/inputs/ModalInputText";
import { useNavigate } from "react-router-dom";

export default function ListEpisode() {
  const data = [
    ["id1", "Episode1", "Podcast1",],
    ["id2", "Episode2", "Podcast1",],
    ["id3", "Episode3", "Podcast2", ],
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create modal reference
  const modalManage = useRef("modalManage");
  dispatch(addModal(modalManage.current));

  // const modalDelete = useRef("modalDelete");
  // dispatch(addModal(modalDelete.current));

  const handleOpenModal = (modalId: string) => {
    dispatch(show(modalId));
  };

  const handleCloseModal = () => {
    dispatch(close(modalManage.current));
  };

  const onNavigate = (id: string) => [
    navigate(id)
  ]

  const handleSave = async () => {
    try {
      console.log("submitted");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const headers = ["Title", "Podcast"];
  const percentage = [50, 40, 10];

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
        onClickManage={() => handleOpenModal(modalManage.current)}
        onNavigate={onNavigate}
      />
      <PrimaryModal
        key={modalManage.current}
        id={modalManage.current}
        modalContent={
          <div className="flex flex-col gap-4">
            <h2 className="text-left">Edit episode</h2>
            <form className="flex flex-col gap-4">
              <ModalInputText
                id="episode-title"
                label="Title"
                placeholder="Title"
                value={title}
                setValue={setTitle}
              />
              <ModalInputText
                id="episode-description"
                label="Description"
                placeholder="Description"
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
            <div className="flex justify-between mt-10">
              <div>
                <button
                  className="text-sm font-bold bg-clr-text-danger hover:bg-clr-text-danger/90 py-2 px-6 rounded-full text-clr-text-black border-clr-background-highlight-one"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
              <div className="flex gap-4">
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
          </div>
        }
      />
    </>
  );
}
