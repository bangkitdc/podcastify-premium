import { addNotification } from '@/redux/notifications/reducer';
import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

function useImageFile(defaultValue: FileList | null): [FileList | null, (e: ChangeEvent<HTMLInputElement> | null) => void] {
  const [file, setFile] = useState(defaultValue);
  const dispatch = useDispatch()
  function handleValueChange(event: ChangeEvent<HTMLInputElement> | null) {
    const validImage = ['image/png', 'image/jpg', 'image/jpeg'];

    if(event){
      const tempFile = event.target.files
      if(tempFile && tempFile.length>0) {
        if(validImage.includes(tempFile[0].type)){
          setFile(tempFile)
        } else {
          dispatch(addNotification({
            message: 'Invalid Audio File. PNG/JPG/JPEG Only',
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

export default useImageFile;
