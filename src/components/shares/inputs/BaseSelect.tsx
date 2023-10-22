export default function BaseSelect({
  options,
  label,
  id,
}: {
  options: string[];
  label: string;
  id: string;
}) {
  return(
    <div className="flex relative w-fit flex-col">
    <label className="text-2xl" htmlFor={id}>{label}</label>
    <select name={id} id={id} className=" bg-clr-background-highlight-one rounded-xl text-clr-text-primary py-2 px-3 outline-none text-base cursor-pointer pe-10 hover:bg-clr-background-highlight-two">
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
    <div>
      <img src="" alt="" />
    </div>
  </div>
  )
}
