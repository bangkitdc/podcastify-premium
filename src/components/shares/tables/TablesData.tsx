import { ICONS_DIR } from "@/config/config";

function TablesData({
  data,
  onClickManage,
  onNavigate,
}: {
  data: string[][];
  onClickManage?: (id?: string) => void;
  onNavigate?: (id: string) => void;
}) {
  return (
    <>
      <tr>
        <td colSpan={5}></td>
      </tr>
      {data.map((d, index) => (
        <tr
          className={` group hover:bg-clr-background-highlight-two ${
            onNavigate ? " cursor-pointer" : ""
          }`}
          onClick={onNavigate ? () => onNavigate(d[0]) : undefined}
        >
          <td>{index + 1}</td>
          {d.slice(0, d.length - 1).map((_, index) => {
            return (
              <td>
                <p className=" group-hover:text-clr-text-primary">{d[index + 1]}</p>
              </td>
            );
          })}
          {onClickManage ? (
            <td className="flex gap-2 relative">
              <img
                className=" h-5 w-5 hidden group-hover:block cursor-pointer"
                src={ICONS_DIR + "three-dots.svg"}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickManage(d[0]);
                }}
              />
            </td>
          ) : null}
        </tr>
      ))}
    </>
  );
}

export default TablesData;
