import TablesHeader from "./TablesHeader";
import TablesData from "./TablesData";

export default function BaseTable({
  headers,
  percentage,
  data, // [[id, ..., ..., ...], [id, ..., ..., ...]]
  manageOption,
  onClickManage,
  onNavigate,
}: {
  headers: string[];
  percentage: number[];
  data: string[][];
  manageOption: boolean;
  onClickManage: (id?: string) => void;
  onNavigate?: (id: string) => void;
}) {
  return (
    <>
      <table className=" text-clr-text-secondary">
        <TablesHeader headers={headers} percentage={percentage} />
        {manageOption ? (
          <TablesData
            data={data}
            onClickManage={onClickManage}
            onNavigate={onNavigate}
          />
        ) : (
          <TablesData
            data={data}
            onNavigate={onNavigate}
          />
        )}
      </table>
    </>
  );
}
