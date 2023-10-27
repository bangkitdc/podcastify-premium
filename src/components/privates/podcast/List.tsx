import PodcastCard from "./PodcastCard";
import Pagination from "../../shares/paginations/Pagination";
import ManagePodcastModals from "./ManagePodcastModals";
import { useState, useEffect } from "react";
import useManageModal from "../../../hooks/useManageModal";

export default function ListPodcast() {
  const [isManageModalActive, podcastId, handleManageModal] = useManageModal();
  const [selectedData, setSelectedData] = useState([""]);

  const data = [
    ["Deddy", "Deddys", "pid1"],
    ["Mommy", "Mommys", "pid2"],
    ["Sonny", "Sonnys", "pid3"],
  ];

  useEffect(() => {
    setSelectedData(
      data.filter((d) => d[2] === podcastId).flatMap((d) => [d[0], d[1], d[2]])
    );
  }, [podcastId]);

  console.log(isManageModalActive);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-1 gap-6 py-4 overflow-hidden">
        {data.map((d) => (
          <PodcastCard
            podcastData={d}
            img_url=""
            handleManageModal={handleManageModal}
          />
        ))}
      </div>
      <Pagination currentPage={1} totalPages={10} />
      <ManagePodcastModals
        podcastId={podcastId}
        isEditModalActive={isManageModalActive}
        handleManageModal={handleManageModal}
        data={selectedData}
      />
    </>
  );
}
