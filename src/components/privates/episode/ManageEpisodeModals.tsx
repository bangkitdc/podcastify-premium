import BaseInputText from "../../shares/inputs/BaseInputText";
import BaseFileUploader from "../../shares/uploads/BaseFileUploader";
import useInput from "../../../hooks/useInput";
import useFile from "../../../hooks/useFile";
import BaseModal from "../../shares/modals/BaseModal";
import ConfirmationModal from "../../shares/modals/ConfirmationModal";

export default function ManageEpisodeModals({
  episodeId,
  isEditModalActive,
  isDeleteModalActive,
  handleEditModal,
  handleDeleteModal,
  data,
}: {
  episodeId: string;
  isEditModalActive: boolean;
  isDeleteModalActive: boolean;
  handleEditModal: () => void;
  handleDeleteModal: () => void;
  data: string[];
}) {
  const [title, setTitle] = useInput("");
  const [description, setDescription] = useInput("");
  const [imageFile, setImageFile] = useFile(null);
  const [audioFile, setAudioFile] = useFile(null);

  //TODO: fetch episode by id
  console.log(episodeId);

  const editEpisodeForm = (
    <>
      <h1 className="text-center">Edit Episode</h1>
      <form>
        <BaseInputText
          id="episode-title"
          label="Title"
          placeholder={data[1] ? data[1] : "Enter episode title"}
          is_require={false}
          value={title}
          setValue={setTitle}
        />
        <BaseInputText
          id="episode-description"
          label="Description"
          placeholder={data[2] ? data[2] : "Enter episode description"}
          is_require={false}
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
        <div className="flex justify-end gap-5 text-m pt-5">
          <button
            type="button"
            className=" font"
            onClick={() => handleEditModal()}
          >
            Cancel
          </button>
          <button className="font-bold bg-clr-text-info hover:bg-clr-text-info-hover py-1 px-5 rounded-full text-clr-text-black border-clr-background-highlight-one">
            Save Changes
          </button>
        </div>
      </form>
    </>
  );

  return (
    <>
      <BaseModal
        id="episode-list-edit-modal"
        active={isEditModalActive}
        modalContent={editEpisodeForm}
        onClose={() => handleEditModal()}
      />
      {/* <BaseModal id="episode-list-delete-modal" active={isDeleteModalActive} /> */}
      <ConfirmationModal
        heading="Delete Episode"
        text1="This will delete"
        data={data[0]}
        text2="from your library"
        confirmText="Delete"
        active={isDeleteModalActive}
        handleActive={handleDeleteModal}
      />
    </>
  );
}
