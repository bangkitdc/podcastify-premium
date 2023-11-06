import { ICONS_DIR } from "@/config/config";

function TablesData({
  dataContext,
  dataContent,
  onClickManage,
  onNavigate,
}: {
  dataContext: string[];
  dataContent: (string | number)[];
  onClickManage?: () => void;
  onNavigate?: () => void;
}) {
  const handleClickManage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClickManage) {
      onClickManage();
    }
  };
  return (
    <>
      <tr
        className={` group hover:bg-clr-background-highlight-two ${
          onNavigate ? " cursor-pointer" : ""
        }`}
        onClick={onNavigate ? () => onNavigate() : undefined}
      >
        {dataContent.map((d, index) => {
          return (
            <>
              <td key={dataContext[index]}>
                <p className=" group-hover:text-clr-text-primary font-thin">
                  {d}
                </p>
              </td>
            </>
          );
        })}
        {onClickManage ? (
          <td className="flex gap-2 relative">
            <img
              className=" h-5 w-5 hidden group-hover:block cursor-pointer"
              src={ICONS_DIR + "three-dots.svg"}
              onClick={handleClickManage}
            />
          </td>
        ) : null}
      </tr>
    </>
  );
}

export default TablesData;
