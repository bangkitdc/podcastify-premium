import { useEffect, useState } from "react";
import BaseTable from "../../shares/tables/BaseTable";
import Pagination from "../../shares/paginations/Pagination";
import ManageEpisodeModals from "./ManageEpisodeModals";
import useManageModal from "../../../hooks/useManageModal";

export default function ListEpisode() {
  const [ isEditModalActive, episodeIdEdit, handleEditModal] = useManageModal()
  const [ isDeleteModalActive, episodeIdDelete, handleDeleteModal] = useManageModal()
  const [selectedData, setSelectedData] = useState([""]);

  const data = [
    ["Episode1", "Podcast1", "id1"],
    ["Episode2", "Podcast1", "id2"],
    ["Episode3", "Podcast2", "id3"],
  ];

  useEffect(() => {
    setSelectedData(
      data.filter((d) => d[2] === episodeIdDelete || episodeIdEdit).flatMap((d) => [d[0], d[1], d[2]])
    );
  }, [episodeIdEdit, episodeIdDelete]);

  const headers = ["Title", "Podcast", "Manage"];
  const percentage = [50, 30, 20];

  return (
    <>
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
        episodeId={episodeIdEdit || episodeIdDelete}
        isEditModalActive={isEditModalActive}
        isDeleteModalActive={isDeleteModalActive}
        handleEditModal={handleEditModal}
        data={selectedData}
      />
    </>
  );
}
