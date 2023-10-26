import { useState, ChangeEvent } from 'react';

function useInput(defaultValue: string = ''): [string, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return [value, handleValueChange];
}

export default useInput;
