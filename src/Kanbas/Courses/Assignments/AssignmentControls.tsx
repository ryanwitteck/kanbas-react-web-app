import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import AssignmentAdder from "./AssignementAdder";


export default function AssignmentControls(
    { assignmentName,
        setAssignmentName,
        addAssignment,
        setDescription,
        setPoints,
        setDueDate,
        setAvailableFromDate,
        setAvailableUntilDate }:
        {
            assignmentName: string;
            setAssignmentName: (title: string) => void;
            addAssignment: () => void;
            setDescription: (description: string) => void;
            setPoints: (points: number) => void;
            setDueDate: (date: string) => void;
            setAvailableFromDate: (date: string) => void;
            setAvailableUntilDate: (date: string) => void;
        }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const role = currentUser.role === "FACULTY";

    return (
        <div id="wd-assignment-controls" className="text-nowrap px-3">
            <div className="input-group me-1 float-start" style={{ width: '200px' }}>
                <span className="input-group-text" id="search-icon"><FaSearch /></span>
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-icon" />
            </div>
            {role && <button id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end" data-bs-toggle="modal" data-bs-target="#wd-add-assignment-dialog">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment</button>}
            {role && <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group</button>}
            <AssignmentAdder
                dialogTitle="Add Assignment"
                assignmentName={assignmentName}
                setAssignmentName={setAssignmentName}
                addAssignment={addAssignment}
                setDescription={setDescription}
                setPoints={setPoints}
                setDueDate={setDueDate}
                setAvailableFromDate={setAvailableFromDate}
                setAvailableUntilDate={setAvailableUntilDate} />
        </div>
    );
}
