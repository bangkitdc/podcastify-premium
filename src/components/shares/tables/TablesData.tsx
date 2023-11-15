import { ICONS_DIR } from "@/config/config";

function TablesData({
  dataContext,
  dataContent,
  onClickManage,
  onNavigate,
  colsClass,
}: {
  dataContext: string[];
  dataContent: (string | number)[];
  onClickManage?: () => void;
  onNavigate?: () => void;
  colsClass?: string[];
}) {
  const handleClickManage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClickManage) {
      onClickManage();
    }
  };
  return (
    <tbody>
      <tr
        className={` group hover:bg-clr-background-highlight-two ${
          onNavigate ? " cursor-pointer" : ""
        }`}
        onClick={onNavigate ? () => onNavigate() : undefined}
      >
        {dataContent.map((d, index) => {
          return (
              <td className={colsClass ? colsClass[index] + ' group-hover:text-clr-text-primary font-thin ' : ''} key={dataContext[index]}>
                  {d}
              </td>
          );
        })}
        {onClickManage ? (
          <td className="flex justify-center items-center">
            <img
              className=" max-h-5 max-w-5 hidden group-hover:block cursor-pointer max-ipad:block"
              src={ICONS_DIR + "three-dots.svg"}
              onClick={handleClickManage}
            />
          </td>
        ) : null}
      </tr>
    </tbody>
  );
}

export default TablesData;
