import { ChangeEvent, useState } from "react";
import { ICONS_DIR } from "@/config/config";

export type BaseInputType = {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "number" | "text" | "password" | "password-no-eye";
  value: string;
  error?: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function BaseInputText({
  id,
  label,
  placeholder = "",
  disabled = false,
  type = "text",
  value,
  error = "",
  setValue,
}: BaseInputType) {
  const needEye = type === "password";
  const typeInput = type === "password-no-eye" ? "password" : type;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base block w-fit text-clr-text-primary"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={
            typeInput === "password"
              ? showPassword
                ? "text"
                : "password"
              : typeInput
          }
          placeholder={placeholder}
          value={value}
          onChange={setValue}
          disabled={disabled}
          className={`rounded shadow-input outline-none w-full box-border px-3 py-3.5 transition-all ease-in-out bg-clr-background-base-two text-sm placeholder-clr-text-primary-darken ${
            error
              ? "shadow-input-error focus:shadow-input-focus-error"
              : "hover:shadow-input-hover focus:shadow-input-focus"
          }
          ${disabled ? "bg-clr-background-base-one" : ""}`}
        />

        {needEye && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button type="button" onClick={togglePasswordVisibility}>
              <img
                className="w-5 h-5"
                src={`${ICONS_DIR}${
                  showPassword ? "eye-open.svg" : "eye-closed.svg"
                }`}
                alt="Eye Btn Icon"
              />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="flex gap-2 items-center">
          <img
            className="w-4 h-4 mb-[1px]"
            src={`${ICONS_DIR}warning.svg`}
            alt="Warning Icon"
          />
          <p className="text-sm font-thin text-clr-text-danger">{error}</p>
        </div>
      )}
    </div>
  );
}