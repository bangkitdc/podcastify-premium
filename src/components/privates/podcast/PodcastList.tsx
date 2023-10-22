import PodcastCard from "./PodcastCard";

function PodcastList() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <h1>Podcasts Made By You</h1>
      <div className="grid grid-cols-4 grid-rows-1 gap-6 py-4 overflow-hidden">
        {arr.map(() => (
          <PodcastCard img_url="" />
        ))}
      </div>
    </>
  );
}

export default PodcastList;
