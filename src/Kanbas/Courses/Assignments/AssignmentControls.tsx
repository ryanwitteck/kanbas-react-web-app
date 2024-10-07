import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

export default function AssignmentControls() {
    return (
        <div id="wd-assignment-controls" className="text-nowrap px-3">
            <div className="input-group me-1 float-start" style={{ width: '200px' }}>
                <span className="input-group-text" id="search-icon"><FaSearch /></span>
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-icon" />
            </div>
            <button id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment</button>
            <button id="wd-add-assignmen-groupt" className="btn btn-lg btn-secondary me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group</button>
        </div>
    );
}
