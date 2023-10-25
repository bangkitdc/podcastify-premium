import PodcastCard from "./PodcastCard";

function PodcastList({data, handleEditModal} : {data: string[][]; handleEditModal : (id?: string) => void}) {
  return (
    <>
      <h1>Podcasts Made By You</h1>
      <div className="grid grid-cols-4 grid-rows-1 gap-6 py-4 overflow-hidden">
        {data.map((d) => (
          <PodcastCard podcastData={d} img_url="" handleEditModal={handleEditModal}/>
        ))}
      </div>
    </>
  );
}

export default PodcastList;
