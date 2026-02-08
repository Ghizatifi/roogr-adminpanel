
interface TableHeaderProps {
  header: any[];
}
export default function TableHeader({header}:TableHeaderProps) {
  return (
    <thead className="bg-[#EDEDED] dark:bg-[#3E3E46]">
    <tr>
      {header.map((head, index) =>(
        <th key={index} scope="col" className="px-2 py-2 text-[18px] font-[400] border-l
        border-gray-400 text-center">{head}</th>
      ))}
    </tr>
</thead>
  )
}
