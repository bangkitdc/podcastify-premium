import AddButton from '../../shares/buttons/AddButton';
import BaseInputText from '../../shares/inputs/BaseInputText';
import BaseFileUploader from '../../shares/uploads/Base';
import useAudioFile from '../../../hooks/useAudioFile';
import useInput from '../../../hooks/useInput';

import apiBase from '@/api';
import episode from '@/api';
import { IApiBaseError, IApiBaseResponseError } from '@/types/http';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/redux/notifications/reducer';
import { FormEvent, useEffect, useState } from 'react';
import BaseSelect from '@/components/shares/inputs/BaseSelect';
import { IApiBaseCategory } from '@/types/category';
import useImageFile from '@/hooks/useImageFile';

export default function CreateFormEpisode() {
  const [title, setTitle] = useInput('');
  const [description, setDescription] = useInput('');
  const [categories, setCategories] = useState<IApiBaseCategory[]>();
  const [category, selectCategory] = useInput('');
  const [imageFile, setImageFile] = useImageFile(null);
  const [audioFile, setAudioFile] = useAudioFile(null);

  const apiBaseError = apiBase().error<IApiBaseError>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryData = await apiBase().category().categories();

      setCategories(categoryData.data);
      selectCategory(categoryData.data[0].name);
    };

    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let audioReqErr = false;
    try {
      let duration = 0;

      if (audioFile) {
        const audioObject = URL.createObjectURL(audioFile[0]);
        const audioElement = new Audio(audioObject);

        const getAudioDuration = () => {
          return new Promise((resolve) => {
            audioElement.addEventListener('loadedmetadata', () => {
              duration = audioElement.duration;
              resolve(duration);
            });
          });
        };

        await getAudioDuration();
      } else {
        audioReqErr = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error: IApiBaseResponseError<any> = {
          status: 'error',
          message: 'Audio Required',
          errors: '',
        };

        throw error;
      }

      const selectedCategory = categories?.find(
        (c) => c.name === category,
      )?.category_id;

      const response = await episode()
        .episode()
        .createEpisode(
          title,
          description,
          selectedCategory ?? 0,
          duration,
          imageFile,
          audioFile,
        );

      if (response.status === 'success') {
        dispatch(
          addNotification({
            message: response.message,
            type: 'success',
          }),
        );
      }
    } catch (error) {
      apiBaseError.set(error);

      if (audioReqErr) {
        dispatch(
          addNotification({
            message: error.message,
            type: 'danger',
          }),
        );
      } else {
        dispatch(
          addNotification({
            message: apiBaseError.getMessage(),
            type: 'danger',
          }),
        );
      }
    }
  };
  const categoriesOpt: string[] = [];
  if (categories) {
    categories.forEach((c) => {
      categoriesOpt.push(c.name);
    });
  }

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <BaseInputText
          id="episode-title"
          label="Title"
          placeholder="Enter episode title"
          value={title}
          setValue={setTitle}
          error={apiBaseError.getErrors('title')?.[0]?.toString()}
        />
        <BaseInputText
          id="episode-description"
          label="Description"
          placeholder="Enter episode description"
          value={description}
          setValue={setDescription}
          error={apiBaseError.getErrors('description')?.[0]?.toString()}
        />
        <BaseSelect
          options={categoriesOpt}
          label="Select Category"
          id="episode-category-input"
          value={category}
          setValue={selectCategory}
        />
        <BaseFileUploader
          id="episode-poster-upload"
          type="image"
          label="Poster File :"
          value={imageFile}
          setValue={setImageFile}
        />
        <BaseFileUploader
          id="episode-audio-upload"
          type="audio"
          label="Audio File :"
          value={audioFile}
          setValue={setAudioFile}
        />
        <div className="flex justify-end mt-3">
          <AddButton text="Create Episode" />
        </div>
      </form>
    </>
  );
}
