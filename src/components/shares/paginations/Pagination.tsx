import { ICONS_DIR } from "../../../config/config";

export default function Pagination({currentPage, totalPages} : {currentPage: number, totalPages: number}) {
  return(
    <div className="flex justify-center gap-4 items-center p-4">
      <button name="nav-btn">
        <img src={ICONS_DIR + "skip_previous.svg"} alt="nav-btn"  />
      </button>
      <button name="nav-btn" >
        <img src={ICONS_DIR + "left-arrow.svg"} alt="nav-btn"  />
      </button>
      <div >
        <span>{currentPage ?? "-"}</span> of <span>{totalPages ?? "-"}</span>
      </div>
      <button name="nav-btn" >
        <img src={ICONS_DIR + "right-arrow.svg"} alt="nav-btn"  />
      </button>
      <button name="nav-btn" >
        <img src={ICONS_DIR + "skip_next.svg"} alt="nav-btn"  />
      </button>
    </div>
  )
}