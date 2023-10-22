function TablesHeader({headers, percentage} : {headers: string[], percentage: number[]}) {
  return (
    <tr>
      <th className="text-sm">#</th>
      {headers.map((h, index) => (
        <th className={"width='" + percentage[index] + "%'"}>{h}</th>
      ))}
    </tr>
  );
}

export default TablesHeader
