import { useState, ChangeEvent } from "react";

function useInput(
  defaultValue: string = ""
): [string, (e: ChangeEvent<HTMLInputElement> | string) => void] {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange(event: ChangeEvent<HTMLInputElement> | string) {
    if (typeof event === "string") {
      setValue(event);
    } else {
      setValue(event.target.value);
    }
  }

  return [value, handleValueChange];
}

export default useInput;
