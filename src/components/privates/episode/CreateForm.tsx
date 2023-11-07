import AddButton from "../../shares/buttons/AddButton";
import BaseInputText from "../../shares/inputs/BaseInputText";
import BaseFileUploader from "../../shares/uploads/Base";
import useFile from "../../../hooks/useFile";
import useInput from "../../../hooks/useInput";

import apiBase from "@/api";
import episode from "@/api";
import { IApiBaseError } from "@/types/http";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notifications/reducer";
import { FormEvent } from "react";

export default function CreateFormEpisode() {
  const [title, setTitle] = useInput("");
  const [description, setDescription] = useInput("");
  const [imageFile, setImageFile] = useFile(null);
  const [audioFile, setAudioFile] = useFile(null);

  const apiBaseError = apiBase().error<IApiBaseError>();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const image_url = imageFile ? imageFile.name : "";
      const audio_url = audioFile ? audioFile.name : "";

      const response = await episode()
        .episode()
        .createEpisode(title, description, 1, 1, 7250, audio_url, image_url);

      if (response.status === "success") {
        dispatch(
          addNotification({
            message: response.message,
            type: "success",
          })
        );
      }
    } catch (error) {
      apiBaseError.set(error);

      if(apiBaseError.getErrors("audio_url")) {
        dispatch(
          addNotification({
            message: apiBaseError.getErrors("audio_url")?.[0]?.toString(),
            type: "danger",
          })
        );
      }
      else{
        dispatch(
          addNotification({
            message: apiBaseError.getMessage(),
            type: "danger",
          })
        );
      }
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <BaseInputText
          id="episode-title"
          label="Title"
          placeholder="Enter episode title"
          value={title}
          setValue={setTitle}
          error={apiBaseError.getErrors("title")?.[0]?.toString()}
        />
        <BaseInputText
          id="episode-description"
          label="Description"
          placeholder="Enter episode description"
          value={description}
          setValue={setDescription}
          error={apiBaseError.getErrors("description")?.[0]?.toString()}
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
