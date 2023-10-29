import AddButton from "../../shares/buttons/AddButton";
import BaseInputText from "../../shares/inputs/BaseInputText";
import BaseSelect from "../../shares/inputs/BaseSelect";
import BaseFileUploader from "../../shares/uploads/Base";
import useFile from "../../../hooks/useFile";
import useInput from "../../../hooks/useInput";

export default function CreateFormPodcast() {
  const [title, setTitle] = useInput("");
  const [description, setDescription] = useInput("");
  const [imageFile, setImageFile] = useFile(null);

  const categories = ["Comedy", "Horror", "Deep Talk", "18+"];
  return (
    <>
      <form className="flex flex-col gap-3">
        <BaseInputText
          id="podcast-title"
          label="Title"
          placeholder="Enter podcast title"
          required={false}
          value={title}
          setValue={setTitle}
        />
        <BaseInputText
          id="podcast-description"
          label="Description"
          placeholder="Enter podcast description"
          required={false}
          value={description}
          setValue={setDescription}
        />
        <BaseSelect options={categories} label="Category" id="testselect" />
        <BaseFileUploader
          id="podcast-poster-upload"
          type="image"
          label="Poster File :"
          value={imageFile}
          setValue={setImageFile}
        />
        <div className="flex justify-end mt-3">
          <AddButton text="Create Podcast" />
        </div>
      </form>
    </>
  );
}
