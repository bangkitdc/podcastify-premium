import { ChangeEvent } from "react";
import { IMAGES_DIR } from "../../../config/config";

export default function BaseFileUploader({
  id,
  type,
  label,
  value,
  setValue,
}: {
  id: string;
  type?: string;
  label: string;
  value: File | null;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative px-0 flex flex-col">
      <label className="text-2xl">
        {label}
      </label>
      <input type="file" id={id} className=" hidden" onChange={setValue} />
      <div className="flex flex-row gap-3 items-center">
        <label
          htmlFor={id}
          className=" inline-block py-1 px-3 bg-clr-text-primary rounded-3xl border-1 border-solid border-clr-text-secondary-darken cursor-pointer text-clr-text-black hover:bg-clr-background-highlight-three"
        >
          Choose File
        </label>
        <span>{value?.name}</span>
      </div>
      {type == "image" ? (
        <img
          className=" w-64 h-auto mt-3"
          src={IMAGES_DIR + value?.name}
          alt=""
        />
      ) : null}
    </div>
  );
}
