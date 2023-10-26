import TablesHeader from "./TablesHeader";
import TablesData from "./TablesData";

export default function BaseTable({
  headers,
  percentage,
  data,
  manageOption,
  manageText,
  onClickManage1,
  onClickManage2,
}: {
  headers: string[];
  percentage: number[];
  data: string[][];
  manageOption: boolean;
  manageText: string[];
  onClickManage1: (id?: string) => void;
  onClickManage2: (id?:string) => void;
}) {
  return (
    <>
      <table className=" text-clr-text-secondary">
        <TablesHeader headers={headers} percentage={percentage} />
        <TablesData data={data} manageOption={manageOption} manageText={manageText} onClickManage1={onClickManage1} onClickManage2={onClickManage2}/>
      </table>
    </>
  );
}
