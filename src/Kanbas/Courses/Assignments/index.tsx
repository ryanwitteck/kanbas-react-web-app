import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentBarControlButtons from "./AssignmentBarControlButtons";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router";
import { useState } from "react";
import RightSideIcons from "./RightSideIcons";
import { addAssignment, deleteAssignment }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";


export default function Assignments() {

  //  const [assignments, setAssignment] = useState<any[]>(db.assignments);
  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [availableFromDate, setAvailableFromDate] = useState("");
  const [availableUntilDate, setAvailableUntilDate] = useState("");
  const dispatch = useDispatch();

  const { cid } = useParams();
  /*
  const addAssignments = () => {
    setAssignment([...db.assignments, {
      _id: new Date().getTime().toString(),
      title: assignmentName, course: cid
    }]);
    setAssignmentName("");
  };
  const deleteAssignment = (assignmentId: string) => {
    setAssignment(assignments.filter((a) => a._id !== assignmentId));
  };**/

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const role = currentUser.role === "FACULTY";

  return (
    <div>
      <AssignmentControls setAssignmentName={setAssignmentName} assignmentName={assignmentName}
        addAssignment={() => {
          dispatch(addAssignment({
            title: assignmentName,
            course: cid,
            description,
            points,
            due_date: dueDate,
            available_from: availableFromDate,
            available_until: availableUntilDate,
          }));
          setAssignmentName("");

        }}
        setDescription={setDescription}
        setPoints={setPoints}
        setDueDate={setDueDate}
        setAvailableFromDate={setAvailableFromDate}
        setAvailableUntilDate={setAvailableUntilDate}

      /> <br /><br /><br />
      <ul id="wd-assignment-list-item" className="list-group rounded-0 container-fluid px-3">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <IoIosArrowDown className="me-2 fs-3" />
            ASSIGNMENTS
            <AssignmentBarControlButtons />
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((module: any) => module.course === cid)
              .map((module: any) => (
                <li className="wd-lesson list-group-item p-3 ps-1">
                  {role ?
                    <a
                      className="wd-assignment-link"
                      href={`#/Kanbas/Courses/${module.course}/Assignments/${module._id}`}
                      style={{ display: "block", textDecoration: "none", color: "black" }}
                    >
                      <AssignmentControlButtons />
                      <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center">
                          <b>{module.title}</b>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="text-danger">Multiple Modules </span>
                          <span className="me-2">&nbsp; | <b>&nbsp;Not available until&nbsp;</b> {new Date(module.available_to).toLocaleDateString()} {new Date(module.available_to).toLocaleTimeString()} |&nbsp; <b>Due&nbsp;</b> {new Date(module.due_date).toLocaleDateString()} {new Date(module.due_date).toLocaleTimeString()} | {module.points} pts</span>
                        </div>
                      </div>
                    </a>
                    :
                    <div>
                      <AssignmentControlButtons />
                      <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center">
                          <b>{module.title}</b>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="text-danger">Multiple Modules </span>
                          <span className="me-2">&nbsp; | <b>&nbsp;Not available until&nbsp;</b> {new Date(module.available_to).toLocaleDateString()} {new Date(module.available_to).toLocaleTimeString()} |&nbsp; <b>Due&nbsp;</b> {new Date(module.due_date).toLocaleDateString()} {new Date(module.due_date).toLocaleTimeString()} | {module.points} pts</span>
                        </div>
                      </div> </div>}
                  <div style={{ position: "absolute", right: "0px", top: "40%" }}>
                    <RightSideIcons assignmentId={module._id}
                      deleteAssignment={() => dispatch(deleteAssignment(module._id))}
                      buttonId={`delete-assignment-${module._id}`} /></div>
                </li>))}
          </ul>
        </li>
      </ul>
    </div>
  );
}