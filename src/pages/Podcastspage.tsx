import PodcastList from "../components/privates/podcast/PodcastList";
import Pagination from "../components/shares/paginations/Pagination";
import ManagePodcastModals from "../components/privates/podcast/ManagePodcastModals";
import { useEffect, useState } from "react";

function Podcastspage() {
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [podcastId, setPodcastId] = useState("");
  const [selectedData, setSelectedData] = useState(['']);

  const handleEditModal = (id?: string) => {
    id ? setPodcastId(id) : setPodcastId("");
    setIsEditModalActive(!isEditModalActive);
  };

  const data = [
    ["Deddy", "Deddys", "pid1"],
    ["Mommy", "Mommys", "pid2"],
    ["Sonny", "Sonnys", "pid3"],
  ];

  useEffect(() => {
    setSelectedData(
      data.filter((d) => d[2] === podcastId).flatMap((d) => [d[0], d[1], d[2]])
    );
  }, [podcastId]) 
  
  return (
    <>
      <PodcastList data={data} handleEditModal={handleEditModal}/>
      <Pagination currentPage={1} totalPages={10} />
      <ManagePodcastModals
        podcastId={podcastId}
        isEditModalActive={isEditModalActive}
        handleEditModal={handleEditModal}
        data={selectedData}
      />
    </>
  );
}

export default Podcastspage;
