import { useNavigate } from "react-router-dom"

function TablesData({
  data,
  page,
}: {
  data: string[][];
  page?: string
}) {
  const navigate = useNavigate()

  const handleRowClick = (url: string) => {
    navigate(url)
  }
  return (
    <>
      <tr>
        <td colSpan={5}></td>
      </tr>
      {data.map((d, index) => (
          <tr onClick={() => handleRowClick("/" + page + "/" + index)} className=" cursor-pointer hover:bg-clr-background-base-two">
            <td>{d[0]}</td>
            <td>
              <img src="" alt="" />
              <div>
                <p>{d[1]}</p>
              </div>
            </td>
            <td>{d[2]}</td>
          </tr>
      ))}
    </>
  );
}

export default TablesData;
