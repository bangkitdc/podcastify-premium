import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addModal, close, show } from '@/redux/modals/reducer';

import PrimaryModal from '@/components/shares/modals/Primary';
import BaseFileUploader from '@/components/shares/uploads/Base';

import useInput from '@/hooks/useInput';
import useAudioFile from '@/hooks/useAudioFile';
import ModalInputText from '@/components/shares/inputs/ModalInputText';
import { useNavigate } from 'react-router-dom';

import episode from '@/api';
import apiBase from '@/api';
import { IApiBaseError } from '@/types/http';
import { addNotification } from '@/redux/notifications/reducer';
import { IApiBaseEpisode } from '@/types/episode';
import TablesHeader from '@/components/shares/tables/TablesHeader';
import TablesData from '@/components/shares/tables/TablesData';
import { IApiBaseCategory } from '@/types/category';
import BaseSelect from '@/components/shares/inputs/BaseSelect';
import useImageFile from '@/hooks/useImageFile';

export default function ListEpisode() {
  const [title, setTitle] = useInput('');
  const [description, setDescription] = useInput('');
  const [imageFile, setImageFile] = useImageFile(null);
  const [audioFile, setAudioFile] = useAudioFile(null);
  const [currentEpisodes, setCurrentEpisodes] = useState<IApiBaseEpisode[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<IApiBaseEpisode>();
  const [categories, setCategories] = useState<IApiBaseCategory[]>();
  const [category, selectCategory] = useInput('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const episodesData = await episode().episode().episodes();
        const categoryData = await apiBase().category().categories();
        setCategories(categoryData.data);
        setCurrentEpisodes(episodesData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const dispatch = useDispatch();
  const apiBaseError = apiBase().error<IApiBaseError>();
  const navigate = useNavigate();

  // Create modal reference
  const modalManage = useRef('modalManage');
  dispatch(addModal(modalManage.current));

  // const modalDelete = useRef("modalDelete");
  // dispatch(addModal(modalDelete.current));

  const handleOpenModal = async (episode_id?: string) => {
    apiBaseError.clear();
    try {
      const episodeData = await episode()
        .episode()
        .episodeDetail('/' + episode_id ?? '');

      setCurrentEpisode(episodeData.data);

      setTitle(episodeData.data.title);
      setDescription(episodeData.data.description);
      selectCategory(
        categories?.find((c) => c.name === episodeData.data.category.name)
          ?.name ?? '',
      );
    } catch (error) {
      console.error(error);
    }

    dispatch(show(modalManage.current));
  };

  const handleCloseModal = () => {
    setImageFile(null);
    setAudioFile(null);
    dispatch(close(modalManage.current));
  };

  const onNavigate = (id: string) => {
    navigate(id);
  };

  const handleSave = async () => {
    try {
      let duration = 0;

      if (currentEpisode) {
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
        }

        const selectedCategory = categories?.find(
          (c) => c.name === category,
        )?.category_id;

        const updatedEpisode = await episode()
          .episode()
          .updateEpisode(
            currentEpisode.episode_id,
            title,
            description,
            selectedCategory ?? 0,
            duration ? duration : currentEpisode.duration,
            imageFile,
            audioFile,
          );

        setCurrentEpisodes((prevEpisodes) => {
          return prevEpisodes.map((episode) =>
            episode.episode_id === updatedEpisode.data.episode_id
              ? updatedEpisode.data
              : episode,
          );
        });

        handleCloseModal();

        if (updatedEpisode.status === 'success') {
          dispatch(
            addNotification({
              message: updatedEpisode.message,
              type: 'success',
            }),
          );
        }
      }
    } catch (error) {
      apiBaseError.set(error);

      dispatch(
        addNotification({
          message: apiBaseError.getMessage(),
          type: 'danger',
        }),
      );
    }
  };

  const handleDelete = async () => {
    try {
      const deletedEpisode = await episode()
        .episode()
        .deleteEpisode(currentEpisode?.episode_id ?? -1);

      const updatedEpisodes = currentEpisodes.filter(
        (episode) => episode.episode_id !== deletedEpisode.data.episode_id,
      );

      setCurrentEpisodes(updatedEpisodes);
      handleCloseModal();

      if (deletedEpisode.status === 'success') {
        dispatch(
          addNotification({
            message: deletedEpisode.message,
            type: 'success',
          }),
        );
      }
      console.log(currentEpisodes);
    } catch (error) {
      apiBaseError.set(error);

      dispatch(
        addNotification({
          message: apiBaseError.getMessage(),
          type: 'danger',
        }),
      );
    }
  };

  function formatDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    const remainingSecondsFinal = remainingSeconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSecondsFinal).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  const headers = ['Title', 'Duration', ''];
  const colsClass = ['', 'whitespace-normal', 'hidden md:table-cell'];
  const percentage = [50, 40, 5];

  const categoriesOpt: string[] = [];
  if (categories) {
    categories.forEach((c) => {
      categoriesOpt.push(c.name);
    });
  }
  return (
    <>
      <table className=" text-clr-text-secondary">
        <TablesHeader
          headers={headers}
          percentage={percentage}
          colsClass={colsClass.slice(1)}
        />
        {currentEpisodes.map((episode, index) => {
          const dataContext = ['num', 'title', 'duration'];
          const duration = formatDuration(episode.duration);

          const dataContent = [index + 1, episode.title, duration];
          return (
            <TablesData
              key={index}
              dataContext={dataContext}
              dataContent={dataContent}
              onClickManage={() =>
                handleOpenModal(episode.episode_id.toString())
              }
              onNavigate={() => onNavigate(episode.episode_id.toString())}
              colsClass={colsClass}
            />
          );
        })}
      </table>
      <PrimaryModal
        key={modalManage.current}
        id={modalManage.current}
        modalContent={
          <div className="flex flex-col gap-4">
            <h2 className="text-left">Edit episode</h2>
            <form className="flex flex-col gap-4">
              <ModalInputText
                id="episode-title"
                label="Title"
                placeholder="Title"
                value={title}
                setValue={setTitle}
                error={apiBaseError.getErrors('title')?.[0]?.toString()}
              />
              <ModalInputText
                id="episode-description"
                label="Description"
                placeholder="Description"
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
            </form>
            <div className="flex justify-between mt-10">
              <div>
                <button
                  className="text-sm font-bold bg-clr-text-danger hover:bg-clr-text-danger/90 py-2 px-6 rounded-full text-clr-text-black border-clr-background-highlight-one"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="px-1 py-2 hover:text-clr-text-primary-darken text-sm"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="text-sm font-bold bg-clr-text-info hover:bg-clr-text-info-hover py-2 px-6 rounded-full text-clr-text-black border-clr-background-highlight-one"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}
