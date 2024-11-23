/* eslint-disable react-hooks/exhaustive-deps */
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentBarControlButtons from "./AssignmentBarControlButtons";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import RightSideIcons from "./RightSideIcons";
import { addAssignment, deleteAssignment, setAssignments }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as assignmentClient from "./client";
import * as coursesClient from "../client";

export default function Assignments() {

  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [availableFromDate, setAvailableFromDate] = useState("");
  const [availableUntilDate, setAvailableUntilDate] = useState("");
  const dispatch = useDispatch();

  const { cid } = useParams();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const role = currentUser.role === "FACULTY";


  const fetchModules = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
    };
    useEffect(() => {
    fetchModules();
    }, []);


    const createAssignmentForCourse = async () => {
      if (!cid) return;
      const newAssignment = { title: assignmentName,
        description,          
        points,
        due_date: dueDate,
        available_from: availableFromDate,
        available_until: availableUntilDate, 
        course: cid };
      const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
      dispatch(addAssignment(assignment));
      fetchModules();
      };

  const removeAssignment = async (assignmentId: string) => {
    await assignmentClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
    fetchModules();
    };

    


  return (
    <div>
      <AssignmentControls setAssignmentName={setAssignmentName} assignmentName={assignmentName}
        addAssignment={createAssignmentForCourse}
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
                      deleteAssignment={() => removeAssignment(module._id)}
                      buttonId={`delete-assignment-${module._id}`} /></div>
                </li>))}
          </ul>
        </li>
      </ul>
    </div>
  );
}