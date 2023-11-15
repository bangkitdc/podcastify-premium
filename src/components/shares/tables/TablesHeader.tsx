function TablesHeader({
  headers,
  percentage,
  colsClass,
  manage,
}: {
  headers: string[];
  percentage: number[];
  colsClass?: string[];
  manage?: boolean;
}) {
  return (
    <thead>
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
      {manage ? <th className="w-[5%] max-ipad:w-[20%]"></th> : ''}
    </tr>
    </thead>
  );
}

export default TablesHeader;
