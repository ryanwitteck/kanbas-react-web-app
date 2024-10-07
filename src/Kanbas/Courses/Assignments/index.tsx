import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import AssignmentControls from "./AssignmentControls";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentBarControlButtons from "./AssignmentBarControlButtons";
import { IoIosArrowDown } from "react-icons/io";

export default function Assignments() {
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
            <li className="wd-lesson list-group-item p-3 ps-1">
              <a
                className="wd-assignment-link"
                href="#/Kanbas/Courses/1234/Assignments/123"
                style={{ display: "block", textDecoration: "none", color: "black" }}
              >

                <AssignmentControlButtons />
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <b>A1</b>
                    <div className="wd-pos-relative-nudge-down">
                      <LessonControlButtons /></div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-danger">Multiple Modules </span>
                    <span className="me-2"></span> | <b>&nbsp;Not available until&nbsp;</b> May 6 at 12:00am |&nbsp; <b>Due&nbsp;</b> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
              </a>
            </li>

            <li className="wd-lesson list-group-item p-3 ps-1">

              <a
                className="wd-assignment-link"
                href="#/Kanbas/Courses/1234/Assignments/123"
                style={{ display: "block", textDecoration: "none", color: "black" }}
              >
                <AssignmentControlButtons />
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <b>A2</b>
                    <div className="wd-pos-relative-nudge-down">
                      <LessonControlButtons /></div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-danger">Multiple Modules </span>
                    <span className="me-2"></span> | <b>&nbsp;Not available until&nbsp;</b> May 20 at 12:00am |&nbsp; <b>Due&nbsp;</b> May 27 at 11:59pm | 100 pts
                  </div>
                </div>
              </a>
            </li>

            <li className="wd-lesson list-group-item p-3 ps-1">

              <a
                className="wd-assignment-link"
                href="#/Kanbas/Courses/1234/Assignments/123"
                style={{ display: "block", textDecoration: "none", color: "black" }}
              >
                <AssignmentControlButtons />
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <b>A3</b>
                    <div className="wd-pos-relative-nudge-down">
                      <LessonControlButtons /></div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-danger">Multiple Modules </span>
                    <span className="me-2"></span> | <b>&nbsp;Not available until&nbsp;</b> April 1 at 12:00am |&nbsp; <b>Due&nbsp;</b> March 1 at 11:59pm | 100 pts
                  </div>
                </div>
                
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
