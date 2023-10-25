function TablesData({
  data,
  onClickManage1,
  onClickManage2,
  manageOption,
  manageText,
}: {
  data: string[][];
  manageOption: boolean;
  manageText?: string[];
  onClickManage1: (id?:string) => void;
  onClickManage2: (id?:string) => void;
}) {
  return (
    <>
      <tr>
        <td colSpan={5}></td>
      </tr>
      {data.map((d, index) => (
        <tr className=" hover:bg-clr-background-highlight-two">
          <td>{index+1}</td>
          <td>
            <img src="" alt="" />
            <div>
              <p>{d[0]}</p>
            </div>
          </td>
          <td>
            <p>{d[1]}</p>
          </td>
          {manageOption && manageText ? <td className="flex gap-2">
            <p
              className="hover:underline cursor-pointer font-thin"
              onClick={() => onClickManage1(d[2])}
            >
              {manageText[0]}
            </p>
            <p>|</p>
            <p
              className="hover:underline cursor-pointer font-thin"
              onClick={() => onClickManage2(d[2])}
            >
              {manageText[1]}
            </p>
          </td> : null}
        </tr>
      ))}
    </>
  );
}

export default TablesData;
