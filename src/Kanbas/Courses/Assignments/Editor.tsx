import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment } from "./reducer";
import "../../style.css";
import { RxCaretDown } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import * as assignmentClient from "./client";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();

    const assignments = useSelector((state: any) => state.assignmentReducer.assignments);
    const assignment = assignments.find((module: any) => module._id === aid);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(0);
    const [dueDate, setDueDate] = useState("");
    const [availableFrom, setAvailableFrom] = useState("");
    const [availableUntil, setAvailableUntil] = useState("");
    const [submissionType, setSubmissionType] = useState("ONLINE");
    const [assignmentGroup, setAssignmentGroup] = useState("ASSIGNMENT");
    const [displayGrade, setDisplayGrade] = useState("PERCENTAGE");


    const [text, setText] = useState(false);
    const [url, setUrl] = useState(false);
    const [mediaRecording, setMediaRecording] = useState(false);
    const [studentAnnotation, setStudentAnnotation] = useState(false);
    const [fileUpload, setFileUpload] = useState(false);
    const [assignTo] = useState("Everyone"); // will eventually need to be an array of users

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const saveAssignment = async () => {
        const x = {
            _id: aid,
            title,
            description,
            points,
            due_date: dueDate,
            available_from: availableFrom,
            available_to: availableUntil,
            submission_type: submissionType,
            group: assignmentGroup,
            text_entry: text,
            url_entry: url,
            media_recording: mediaRecording,
            student_annotation: studentAnnotation,
            file_upload: fileUpload,
            display_grade_as: displayGrade
        };
    
        await assignmentClient.updateAssignment(x);
        dispatch(updateAssignment(x));
        navigate(`/Kanbas/Courses/${cid}/Assignments/`);
    };

    useEffect(() => {
        if (assignment !== null) {
            setTitle(assignment.title);
            setDescription(assignment.description);
            setPoints(assignment.points);
            setDueDate(assignment.due_date);
            setAvailableFrom(assignment.available_from);
            setAvailableUntil(assignment.available_to);
            setSubmissionType(assignment.submission_type);
            setAssignmentGroup(assignment.assignmentGroup);
            setDisplayGrade(assignment.display_grade_as);
            setText(assignment.text_entry);
            setUrl(assignment.url_entry);
            setMediaRecording(assignment.media_recording);
            setStudentAnnotation(assignment.student_annotation);
            setFileUpload(assignment.file_upload);

        }
    }, [assignment]);

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="wd-name" className="form-label"><h4>Assignment Name</h4></label>
                    <input id="wd-name" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <textarea id="wd-description" rows={9} onChange={(e) => setDescription(e.target.value)} className="form-control" value={description}>
                        {description}
                    </textarea>
                </div>
            </div>

            <div className=" wd-flex-row-container justify-content-center align-items-center mb-3">
                <div className="col-2 d-flex">
                    <label htmlFor="wd-points">Points</label>
                </div>
                <div className="col-4">
                    <input id="wd-points" style={{ width: '250px' }} value={points} onChange={(e: any) => setPoints(e.target.value)} className="form-control" />
                </div>
            </div>
            <div className="d-flex wd-flex-row-container justify-content-center align-items-center mb-3">
                <div className="col-2 d-flex">
                    <label htmlFor="wd-group" style={{ position: 'relative', top: '-12px' }}>Assignment Group</label>
                </div>
                <div className="col-md-4">
                    <select id="wd-group" style={{ width: '250px' }} className="form-control" onChange={(e) => { setAssignmentGroup(e.target.value) }}>
                        <option value="ASSIGNMENTS" selected={assignment.group === "ASSIGNMENTS"}>ASSIGNMENTS</option>
                        <option value="QUIZZES" selected={assignment.group === "QUIZZES"}>QUIZZES</option>
                        <option value="EXAMS" selected={assignment.group === "EXAMS"}>EXAMS</option>
                        <option value="PROJECT" selected={assignment.group === "PROJECT"}>PROJECT</option>
                    </select>
                    <RxCaretDown style={{ position: "relative", left: '223px', top: '-33px', pointerEvents: 'none' }} />
                </div>
            </div>

            <div className=" d-flex wd-flex-row-container justify-content-center align-items-center mb-3" >
                <div className="col-2 d-flex">
                    <label htmlFor="wd-display-grade-as" style={{ position: 'relative', top: '-12px' }} >Display Grade As</label>
                </div>
                <div className="col-md-4">
                    <select id="wd-display-grade-as" style={{ width: '250px' }} className="form-control" onChange={(e) => { setDisplayGrade(e.target.value) }}>
                        <option value="PERCENTAGE" selected={assignment.display_grade_as === "PERCENTAGE"}>PERCENTAGE</option>
                        <option value="DECIMAL" selected={assignment.display_grade_as === "DECIMAL"}>DECIMAL</option>
                        <option value="LETTER" selected={assignment.display_grade_as === "LETTER"}>LETTER</option>
                    </select>
                    <RxCaretDown style={{ position: "relative", left: '223px', top: '-33px', pointerEvents: 'none' }} />
                </div>
            </div>

            <div className=" d-flex wd-flex-row-container justify-content-center align-items-baseline mb-3">
                <div className="col-2 d-flex">
                    <label htmlFor="wd-submission-type">Submission Type</label>
                </div>
                <div className="col-4 col-md-4">
                    <div className="container mt-4 border wd-rounded-corners-all-around wd-border-thin border-secondary form-control" style={{ width: "250px", height: "250px", marginLeft: '0px' }}>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center">
                            <div className="col-md-4">
                                <select id="wd-submission-type" style={{ width: '220px' }} className="form-control wd-submission-type" value={submissionType} onChange={(e) => setSubmissionType(e.target.value)}>
                                    <option value="ONLINE" selected={submissionType === "ONLINE"}>Online</option>
                                    <option value="In-Person" selected={submissionType === "In-Person"}>In-Person</option>
                                </select>
                                <RxCaretDown className="wd-submission-type-arrow" />
                            </div>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center mb-2">
                            <div className="col-md-4">
                                <label style={{ width: '220px' }} className="wd-submission-type">Online Entry Options</label>
                            </div>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center">
                            <input type="checkbox" id="wd-text-entry" checked={text} onChange={() => setText(!text)} className="wd-button-type" />
                            <label htmlFor="wd-text-entry" className="wd-button-text-type">&nbsp; Text Entry</label>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center">
                            <input type="checkbox" id="wd-website-url" checked={url} onChange={() => setUrl(!url)} className="wd-button-type-url" />
                            <label htmlFor="wd-website-url" className="wd-button-text-type-url">&nbsp; Website URL</label>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center">
                            <input type="checkbox" id="wd-media-recordings" checked={mediaRecording} onChange={() => setMediaRecording(!mediaRecording)} className="wd-button-type-mr" />
                            <label htmlFor="wd-media-recordings" className="wd-button-text-type-mr">&nbsp; Media Recordings</label>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center">
                            <input type="checkbox" id="wd-student-annotation" checked={studentAnnotation} onChange={() => setStudentAnnotation(!studentAnnotation)} className="wd-button-type-sa" />
                            <label htmlFor="wd-student-annotation" className="wd-button-text-type-sa">&nbsp; Student Annotation</label>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center">
                            <input type="checkbox" id="wd-file-upload" checked={fileUpload} onChange={() => setFileUpload(!fileUpload)} className="wd-button-type-fu" />
                            <label htmlFor="wd-file-upload" className="wd-button-text-type-fu">&nbsp; File Upload</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex wd-flex-row-container justify-content-center align-items-baseline mb-3">
                <div className="col-2 d-flex">
                    <label className="wd-assign">Assign</label>
                </div>
                <div className="col-4 col-md-4">
                    <div className="container mt-4 border wd-rounded-corners-all-around wd-border-thin border-secondary form-control" style={{ width: "250px", height: "250px", marginLeft: '0px' }}>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center">
                            <div className="col-md-4">
                                <label style={{ width: '220px' }} className="wd-assign-to" htmlFor="wd-assign-to"><b>Assign To</b></label>
                            </div>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center mb-2">
                            <div className="col-md-4">
                                <input id="wd-assign-to" value={assignTo} className="form-control wd-assign-to" style={{ width: '220px' }} />
                            </div>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center">
                            <div className="col-md-4">
                                <label style={{ width: '220px' }} htmlFor="wd-due-date" className="wd-assign-to"><b>Due</b></label>
                            </div>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center">
                            <input type="datetime-local" id="wd-due-date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="form-control" style={{ fontSize: '12px' }} />
                        </div>

                        <div className="d-flex wd-flex-row-container justify-content-left align-items-center">
                            <div className="col-md-4">
                                <label style={{ width: '200px' }} htmlFor="wd-available-from" className=""><b>Available From</b></label>
                            </div>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-center align-items-center">
                            <input style={{ width: '220px', fontSize: '12px' }} type="datetime-local" id="wd-available-from" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} className="form-control" />
                        </div>

                        <div className="d-flex wd-flex-row-container justify-content-left align-items-left">
                            <div className="col-md-4">
                                <label style={{ width: '100px', position: "relative", left: "-0px" }} htmlFor="wd-available-until" className="wd-until"><b>Until</b></label>
                            </div>
                        </div>
                        <div className="d-flex wd-flex-row-container justify-content-left align-items-center">
                            <input style={{ width: '220px', fontSize: '12px' }} type="datetime-local" id="wd-available-until" value={availableUntil} onChange={(e) => setAvailableUntil(e.target.value)} className="form-control" />
                        </div>

                    </div>
                </div>
            </div>

            <hr />

            <div className="d-flex justify-content-end">
                <Link to={`/Kanbas/Courses/${cid}/Assignments/`}> <button className="btn btn-secondary me-3">Cancel</button> </Link>

                <button onClick={saveAssignment} className="btn btn-danger">Submit</button>

            </div>
        </div>
    );
}
