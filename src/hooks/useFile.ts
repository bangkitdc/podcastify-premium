import { useState, ChangeEvent } from 'react';

function useFile(defaultValue: FileList | null): [FileList | null, (e: ChangeEvent<HTMLInputElement> | null) => void] {
  const [file, setFile] = useState(defaultValue);

  function handleValueChange(event: ChangeEvent<HTMLInputElement> | null) {
    
    if(event){
      const tempFile = event.target.files
      if(tempFile && tempFile.length>0) {
        setFile(tempFile)
      } 
    } else {
      setFile(null)
    }
    
  }

  return [file, handleValueChange];
}

export default useFile;
