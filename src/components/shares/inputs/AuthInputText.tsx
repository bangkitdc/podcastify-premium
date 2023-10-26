import { ChangeEvent } from "react";

export type AuthInputType = {
  id: string;
  inputLabel: string;
  isPassword?: boolean;
  value: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

function AuthInputText({
  id,
  inputLabel,
  isPassword = false,
  value,
  setValue,
}: AuthInputType) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base block w-fit text-clr-text-primary"
      >
        {inputLabel}
      </label>
      <input
        id={id}
        type={isPassword ? "password" : "text"}
        placeholder={inputLabel}
        value={value}
        onChange={setValue}
        className="py-3 px-3 bg-clr-background-base-two rounded border-0 outline-none w-full text-clr-text-primary"
      />
    </div>
  );
}

export default AuthInputText;
