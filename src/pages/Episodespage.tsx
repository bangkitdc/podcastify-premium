import TablesHeader from "../components/shares/tables/TablesHeader";
import TablesData from "../components/shares/tables/TablesData";
function Episodespage() {
  const headers = ["Name", "Description"];
  const percentage = [50, 50];
  const data = [["1", "Podcast1", "A good man"],["2", "Podcast2", "A good good man"],];

  return (
    <>
      <table>
        <TablesHeader headers={headers} percentage={percentage} />
        <TablesData data={data} page="episode" />
      </table>
    </>
  );
}

export default Episodespage;
