import AddButton from "../../shares/buttons/AddButton";
import BaseInputText from "../../shares/inputs/BaseInputText";
import BaseFileUploader from "../../shares/uploads/Base";
import useFile from "../../../hooks/useFile";
import useInput from "../../../hooks/useInput";

export default function CreateFormEpisode() {
  const [title, setTitle] = useInput("");
  const [description, setDescription] = useInput("");
  const [imageFile, setImageFile] = useFile(null);
  const [audioFile, setAudioFile] = useFile(null);

  return (
    <>
      <form className="flex flex-col gap-3">
        <BaseInputText
          id="episode-title"
          label="Title"
          placeholder="Enter episode title"
          required={false}
          value={title}
          setValue={setTitle}
        />
        <BaseInputText
          id="episode-description"
          label="Description"
          placeholder="Enter episode description"
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
          id="episode-audio-upload"
          type="audio"
          label="Audio File :"
          value={audioFile}
          setValue={setAudioFile}
        />
        <div className="flex justify-end mt-3">
          <AddButton text="Create Episode" />
        </div>
      </form>
    </>
  );
}
