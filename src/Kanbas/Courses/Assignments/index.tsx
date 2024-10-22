import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentBarControlButtons from "./AssignmentBarControlButtons";
import { IoIosArrowDown } from "react-icons/io";
import * as db from "../../Database/";
import { useParams } from "react-router";
export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  
  
             return (
    <div>
      <AssignmentControls /> <br /><br /><br />
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
                  <a
                    className="wd-assignment-link"
                    href={`#/Kanbas/Courses/${module.course}/Assignments/${module._id}`}
                    style={{ display: "block", textDecoration: "none", color: "black" }}
                  >
                    <AssignmentControlButtons />
                    <div className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center">
                        <b>{module.title}</b>
                        <div className="wd-pos-relative-nudge-down">
                          <LessonControlButtons /></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="text-danger">Multiple Modules </span>
                        <span className="me-2">&nbsp; | <b>&nbsp;Not available until&nbsp;</b> {new Date(module.available_to).toLocaleDateString()} {new Date(module.available_to).toLocaleTimeString()} |&nbsp; <b>Due&nbsp;</b> {new Date(module.due_date).toLocaleDateString()} {new Date(module.due_date).toLocaleTimeString()} | {module.points} pts</span>
                      </div>
                    </div>
                  </a>
                </li>))}
          </ul>
        </li>
      </ul>
    </div>
  );
}