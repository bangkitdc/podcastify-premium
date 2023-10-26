import { ChangeEvent } from "react";

export type BaseInputType = {
  id: string;
  label: string;
  placeholder: string;
  is_require?: boolean;
  value: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function BaseInputText({
  id,
  label,
  placeholder = "",
  is_require = true,
  value,
  setValue,
}: BaseInputType) {
  return (
    <div className="flex flex-col">
      <label className=" text-2xl">{label}</label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        required={is_require}
        className=" w-1/2 rounded-3xl text-clr-background-base-one py-1 px-1 outline-none border-solid border-2 text-base bg-clr-text-primary"
      />
    </div>
  );
}
