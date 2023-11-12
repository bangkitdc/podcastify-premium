function TablesHeader({
  headers,
  percentage,
  colsClass,
}: {
  headers: string[];
  percentage: number[];
  colsClass?: string[];
}) {
  return (
    <tr>
      <th className="w-[5%]" style={{ width: '5%' }}>
        #
      </th>
      {headers.map((h, index) => (
        <th
          className={`${colsClass ? colsClass[index] : ''} w-[${
            percentage[index]
          }%]`}
          key={index}
        >
          {h}
        </th>
      ))}
    </tr>
  );
}

export default TablesHeader;
