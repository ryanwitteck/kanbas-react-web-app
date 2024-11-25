import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function QuizTopBar({ addQuiz }: { addQuiz: () => void; }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    return (<div>
        <div className="input-group me-1 float-start" style={{ width: '200px' }}>
            <span className="input-group-text" id="search-icon"><FaSearch /></span>
            <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-icon" />
        </div>
        {isFaculty && <div><button className="btn btn-lg btn-secondary me-1 float-end ">
            <BsThreeDotsVertical className="position-relative " style={{ bottom: "1px" }} />
        </button>

            <button id="wd-add-assignment" onClick={addQuiz} className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz</button></div>}

    </div>);
}