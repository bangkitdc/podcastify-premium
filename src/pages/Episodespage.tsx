import { useEffect, useState } from "react";
import Pagination from "../components/shares/paginations/Pagination";
import BaseTable from "../components/shares/tables/BaseTable";
import ManageEpisodeModals from "../components/privates/episode/ManageEpisodeModals";

function Episodespage() {
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [episodeId, setEpisodeId] = useState("");
  const [selectedData, setSelectedData] = useState(['']);

  const data = [
    ["Episode1", "Podcast1", "id1"],
    ["Episode2", "Podcast1", "id2"],
    ["Episode3", "Podcast2", "id3"],
  ];

  const handleEditModal = (id?: string) => {
    id ? setEpisodeId(id) : setEpisodeId("");
    setIsEditModalActive(!isEditModalActive);
  };
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const handleDeleteModal = () => {
    setIsDeleteModalActive(!isDeleteModalActive);
  };

  useEffect(() => {
    setSelectedData(
      data.filter((d) => d[2] === episodeId).flatMap((d) => [d[0], d[1], d[2]])
    );
  }, [episodeId])  

  const headers = ["Title", "Podcast", "Manage"];
  const percentage = [50, 30, 20];

  return (
    <>
      <h1>Episodes By You</h1>
      <BaseTable
        headers={headers}
        percentage={percentage}
        data={data}
        manageOption={true}
        manageText={["Edit", "Delete"]}
        onClickManage1={handleEditModal}
        onClickManage2={handleDeleteModal}
      />
      <Pagination currentPage={1} totalPages={10} />
      <ManageEpisodeModals
        episodeId={episodeId}
        isEditModalActive={isEditModalActive}
        isDeleteModalActive={isDeleteModalActive}
        handleEditModal={handleEditModal}
        data={selectedData}
      />
    </>
  );
}

export default Episodespage;
