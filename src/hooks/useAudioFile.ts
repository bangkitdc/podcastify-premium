import { addNotification } from '@/redux/notifications/reducer';
import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

function useAudioFile(defaultValue: FileList | null): [FileList | null, (e: ChangeEvent<HTMLInputElement> | null) => void] {
  const [file, setFile] = useState(defaultValue);
  const dispatch = useDispatch()
  function handleValueChange(event: ChangeEvent<HTMLInputElement> | null) {
    
    if(event){
      const tempFile = event.target.files
      if(tempFile && tempFile.length>0) {
        if(tempFile[0].type === 'audio/mpeg'){
          setFile(tempFile)
        } else {
          dispatch(addNotification({
            message: 'Invalid Audio File. MP3 Only',
            type: 'danger'
          }))
          setFile(null)
        }
      } 
    } else {
      setFile(null)
    }
    
  }

  return [file, handleValueChange];
}

export default useAudioFile;
