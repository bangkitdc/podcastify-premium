import BaseInputText from "../../shares/inputs/BaseInputText";
import BaseFileUploader from "../../shares/uploads/Base";
import useInput from "../../../hooks/useInput";
import useFile from "../../../hooks/useFile";
import BaseModal from "../../shares/modals/Base";
import ConfirmationModal from "../../shares/modals/Confirmation";

export default function ManagePodcastModals({
  podcastId,
  isEditModalActive,
  isDeleteModalActive,
  handleManageModal,
  data,
}: {
  podcastId: string;
  isEditModalActive: boolean;
  isDeleteModalActive: boolean;
  handleManageModal: () => void;
  data: string[];
}) {
  const [title, setTitle] = useInput("");
  const [description, setDescription] = useInput("");
  const [imageFile, setImageFile] = useFile(null);

  const editPodcastForm = (
    <>
      <h1 className="text-center">Edit Podcast</h1>
      <form>
        <BaseInputText
          id="podcast-title"
          label="Title"
          placeholder={data[0] ? data[0] : "Enter podcast title"}
          is_require={false}
          value={title}
          setValue={setTitle}
        />
        <BaseInputText
          id="podcast-description"
          label="Description"
          placeholder={data[0] ? data[0] : "Enter podcast description"}
          is_require={false}
          value={description}
          setValue={setDescription}
        />
        <BaseFileUploader
          id="podcast-poster-upload"
          type="image"
          label="Poster File :"
          value={imageFile}
          setValue={setImageFile}
        />
        <div className="flex justify-end gap-5 text-m pt-5">
          <button
            type="button"
            className=" font"
            onClick={() => handleManageModal()}
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

  //TODO: fetch episode by id
  console.log(podcastId);

  return (
    <>
      <BaseModal
        id="podcast-list-edit-modal"
        active={isEditModalActive}
        modalContent={editPodcastForm}
      />
      <ConfirmationModal
        heading="Delete Podcast"
        text1="This will delete"
        data={data[0]}
        text2="from your library"
        confirmText="Delete"
        active={isDeleteModalActive}
      />
    </>
  );
}
