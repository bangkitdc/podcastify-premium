export default function ConfirmationModal({
  heading,
  text1,
  data,
  text2,
  confirmText,
  active,
  handleActive,
}: {
  heading: string;
  text1: string;
  data?: string;
  text2?: string;
  confirmText: string;
  active: boolean;
  handleActive: () => void;
}) {
  const display = active ? "block" : "hidden";
  
  return (
    <div
      className={` bg-[#000000b3] top-0 left-0 fixed w-full h-full z-[1001] ${display}`}
    >
      <div className="flex justify-center items-center fixed z-[1001] left-0 right-0 w-full h-full overflow-auto">
        <div className=" absolute bg-clr-text-primary p-6 rounded-lg shadow-sm w-[524px] z-30">
          <h1 className=" text-clr-text-black">{heading}</h1>
          <p className=" text-clr-text-black">
            {text1}
            &nbsp;
            <span className=" font-extrabold">{data}</span>
            &nbsp;
            {text2}
          </p>
          <div className="flex justify-end gap-5 text-m pt-5">
            <button type="button" className=" text-clr-text-black" onClick={handleActive}>
              Cancel
            </button>
            <button className="font-bold bg-clr-text-info hover:bg-clr-text-info-hover py-1 px-5 rounded-full text-clr-text-black border-clr-background-highlight-one">
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
