import { ChangeEvent } from "react";
import { ICONS_DIR } from "@/config/config";

export type BaseInputType = {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "number" | "text";
  value: string;
  error?: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function ModalInputText({
  id,
  label,
  placeholder = "",
  disabled = false,
  value,
  error = "",
  setValue,
}: BaseInputType) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm block w-fit text-clr-text-primary">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        disabled={disabled}
        className={`rounded outline-none w-full box-border px-2.5 py-2 transition-all ease-in-out bg-clr-background-modal-input text-[13px] placeholder-clr-text-primary-darken ${
          error
            ? "shadow-input-error focus:shadow-input-focus-error"
            : "hover:shadow-input-hover focus:shadow-input-focus"
        }
          ${disabled ? "bg-clr-background-base-one" : ""}`}
      />
      {error && (
        <div className="flex gap-2 items-center">
          <img
            className="w-3 h-3 mb-[1px]"
            src={`${ICONS_DIR}warning.svg`}
            alt="Warning Icon"
          />
          <p className="text-[13px] font-thin text-clr-text-danger">{error}</p>
        </div>
      )}
    </div>
  );
}