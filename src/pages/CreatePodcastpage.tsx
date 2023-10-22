import AddButton from "../components/shares/buttons/AddButton";
import BaseInputText from "../components/shares/inputs/BaseInputText";
import BaseSelect from "../components/shares/inputs/BaseSelect";
import BaseUploader from "../components/shares/uploads/BaseUploader";
import useFile from "../hooks/useFile";
import useInput from "../hooks/useInput";

function CreatePodcastPage() {
  const [title, setTitle] = useInput("");
  const [description, setDescription] = useInput("");
  const [imageFile, setImageFile] = useFile(null);

  const categories = ["Comedy", "Horror", "Deep Talk", "18+"]
  return (
    <form className="flex flex-col gap-3">
      <BaseInputText
        id="episode-title"
        label="Title"
        placeholder="Enter episode title"
        is_require={false}
        value={title}
        setValue={setTitle}
      />
      <BaseInputText
        id="episode-description"
        label="Description"
        placeholder="Enter episode description"
        is_require={false}
        value={description}
        setValue={setDescription}
      />
      <BaseSelect options={categories} label="Category" id="testselect"/>
      <BaseUploader
        id="episode-poster-upload"
        type="image"
        label="Upload a poster file :"
        value={imageFile}
        setValue={setImageFile}
      />
      <div className="flex justify-end mt-3">
        <AddButton text="Add Episode" />
      </div>
    </form>
  );
}

export default CreatePodcastPage;
