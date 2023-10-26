function TablesHeader({headers, percentage} : {headers: string[], percentage: number[]}) {
  return (
    <tr>
      <th className="w-[5%]" style={{width: "5%"}}>#</th>
      {headers.map((h, index) => (
        <th style={{width: percentage[index] + "%"}} key={index}>{h}</th>
      ))}
    </tr>
  );
}

export default TablesHeader
