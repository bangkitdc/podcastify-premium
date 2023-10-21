import clsx from "clsx";
import { get } from "lodash";
import * as React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

export type InputTextProps = {
  label: string | null;
  id: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute; // text, email, password
  disabled?: boolean;
  validation?: RegisterOptions;
  containerClassName?: string;
}

export default function InputText({
  label,
  placeholder,
  id,
  type = "text",
  disabled = false,
  validation,
  containerClassName,
  ...rest
}: InputTextProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);
  const withLabel = label !== null;

  return (
    <div className={containerClassName}>
      {withLabel && (
        <label className="block" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={clsx("relative", withLabel && "mt-1")}>
        {/* {LeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {typeof LeftIcon === "string" ? (
              <Typography variant="s4">{LeftIcon}</Typography>
            ) : (
              <LeftIcon size="1em" className="text-xl text-typo" />
            )}
          </div>
        )} */}
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          disabled={disabled}
          className={clsx(
            "flex w-full rounded-lg shadow-sm",
            "min-h-[2.25rem] py-0 md:min-h-[2.5rem]",
            "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
            (disabled) &&
              "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            // LeftIcon && "pl-9",
            // rightNode && "pr-10"
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
      </div>
      {error && (
        <p className="text-red-500 mt-1">
          {error?.message?.toString()}
        </p>
      )}
    </div>
  );
}