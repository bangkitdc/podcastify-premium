import { useState, useEffect } from 'react';

export default function useModal(defaultValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(defaultValue);

  function handleClickModal() {
    setValue(!value)
  }

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return [value, handleClickModal];
}
