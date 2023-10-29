import { ChangeEvent } from "react";

export type BaseInputType = {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  value: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function BaseInputText({
  id,
  label,
  placeholder = "",
  required = true,
  disabled = false,
  value,
  setValue,
}: BaseInputType) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        required={required}
        disabled={disabled}
        className={`rounded shadow-input outline-none w-full box-border px-3 py-3.5 transition-all ease-in-out bg-clr-background-base-two text-sm placeholder-clr-text-primary-darken hover:shadow-input-modal-hover focus:shadow-input-modal-focus
          ${disabled ? "bg-clr-background-base-one" : ""}`}
      />
    </div>
  );
}