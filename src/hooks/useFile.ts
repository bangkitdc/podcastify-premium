import { useState, ChangeEvent } from 'react';

function useFile(defaultValue: File | null): [File | null, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [file, setFile] = useState(defaultValue);

  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    const tempFile = event.target.files?.[0]
    
    if(tempFile) {
      setFile(tempFile)
    } else {
      setFile(null)
    }
  }

  return [file, handleValueChange];
}

export default useFile;
