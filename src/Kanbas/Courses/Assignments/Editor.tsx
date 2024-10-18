/* eslint-disable jsx-a11y/anchor-has-content */
import { RxCaretDown } from "react-icons/rx";
import "../../style.css";
import * as db from "../../Database/";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    
    const assignment = db.assignments.filter((module: any) => module._id === aid);
    const defaultAssignment = (assignment[0] && assignment[0].group && assignment[0].group === "ASSIGNMENTS") ? true : false;
    const defaultQuiz = (assignment[0] && assignment[0].group && assignment[0].group === "QUIZZES")? true : false;
    const defaultExam = (assignment[0] && assignment[0].group && assignment[0].group === "EXAMS")? true : false;
    const defaultProject = (assignment[0] && assignment[0].group && assignment[0].group === "PROJECT")? true : false;

    const defaultPercentage = (assignment[0] && assignment[0].display_grade_as && assignment[0].display_grade_as === "PERCENTAGE")? true : false;
    const defaultDecimal = (assignment[0] && assignment[0].display_grade_as && assignment[0].display_grade_as === "DECIMAL")? true : false;
    const defaultLetter = (assignment[0] && assignment[0].display_grade_as && assignment[0].display_grade_as === "LETTER")? true : false;
    
    const defaultOnline = (assignment[0] && assignment[0].submission_type && assignment[0].submission_type === "ONLINE")? true : false;
    const defaultInPerson = (assignment[0] && assignment[0].submission_type && assignment[0].submission_type === "INPERSON")? true : false;
    

    const defaultTextEntry = (assignment[0] && assignment[0].online_entry_type && assignment[0].online_entry_type.text)? true : false; // Need redundant if-else for type checking later, compiler complains
    const defaultURL = (assignment[0] && assignment[0].online_entry_type && assignment[0].online_entry_type.url)? true : false;
    const defaultMedia = (assignment[0] && assignment[0].online_entry_type && assignment[0].online_entry_type.media)? true : false;
    const defaultAnnotations = (assignment[0] && assignment[0].online_entry_type && assignment[0].online_entry_type.annotations)? true : false;
    const defaultFileUpload = (assignment[0] && assignment[0].online_entry_type && assignment[0].online_entry_type.file_upload)? true : false;
    
    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="wd-name" className="form-label"><h4>Assignment Name</h4></label>
                    <input id="wd-name" value={` ${(assignment[0] && assignment[0].title) ? assignment[0].title : `Enter Title Here:`}`} className="form-control" />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <textarea id="wd-description" rows={9} className="form-control">
                        {` ${(assignment[0] && assignment[0].description) ? assignment[0].description :
                            `The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.
                            The landing page should include the following:
  
                            - Your full name and section
                            - Links to each of the lab assignments
                            - Link to the Kanbas application
                            - Links to all relevant source code repositories
  
                            The Kanbas application should include a link to navigate back to the landing page.`}`}

                    </textarea>
                </div>
            </div>


            <div className=" wd-flex-row-container justify-content-center align-items-center mb-3">
                <div className="col-2 d-flex">
                    <label htmlFor="wd-points">Points</label>
                </div>
                <div className="col-4">
                    <input id="wd-points" style={{ width: '250px' }} value={` ${(assignment[0] && assignment[0].points) ? assignment[0].points : 100}`} className="form-control" />
                </div>
            </div>
            <div className=" d-flex wd-flex-row-container justify-content-center align-items-center mb-3">
                <div className="col-2 d-flex">
                    <label htmlFor="wd-group" style={{ position: 'relative', top: '-12px' }}>Assignment Group</label>
                </div>
                <div className="col-md-4">
                    <select id="wd-group" style={{ width: '250px' }} className="form-control">
                        <option value="ASSIGNMENTS" selected={defaultAssignment}>ASSIGNMENTS</option>
                        <option value="QUIZZES" selected={defaultQuiz}>QUIZZES</option>
                        <option value="EXAMS" selected={defaultExam}>EXAMS</option>
                        <option value="PROJECT" selected={defaultProject}>PROJECT</option>
                    </select>
                    <RxCaretDown style={{ position: "relative", left: '223px', top: '-33px', pointerEvents: 'none' }} />
                </div>
            </div>

            <div className=" d-flex wd-flex-row-container justify-content-center align-items-center mb-3">
                <div className="col-2 d-flex">
                    <label htmlFor="wd-display-grade-as" style={{ position: 'relative', top: '-12px' }} >Display Grade As</label>
                </div>
                <div className="col-md-4">
                    <select id="wd-display-grade-as" style={{ width: '250px' }} className="form-control">
                        <option value="PERCENTAGE" selected={defaultPercentage}>PERCENTAGE</option>
                        <option value="DECIMAL" selected={defaultDecimal}>DECIMAL</option>
                        <option value="LETTER" selected={defaultLetter}>LETTER</option>
                    </select>
                    <RxCaretDown style={{ position: "relative", left: '223px', top: '-33px', pointerEvents: 'none' }} />
                </div>
            </div>

            <div className=" d-flex wd-flex-row-container justify-content-center align-items-baseline mb-3" >
                <div className="col-2 d-flex">
                    <label htmlFor="wd-submission-type">Submission Type</label>
                </div>
                <div className="col-4 col-md-4">
                    <div className="container mt-4 border wd-rounded-corners-all-around wd-border-thin border-secondary form-control" style={{ width: "250px", height: "250px", marginLeft: '0px' }}>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center">
                            <div className="col-md-4">
                                <select id="wd-submission-type" style={{ width: '220px' }} className="form-control wd-submission-type">
                                    <option value="ONLINE" selected={defaultOnline}>Online</option>
                                    <option value="In-Person" selected={defaultInPerson}>In-Person</option>
                                </select>
                                <RxCaretDown className="wd-submission-type-arrow" />
                            </div>
                        </div>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center mb-2">
                            <div className="col-md-4">
                                <label style={{ width: '220px' }} className="wd-submission-type">Online Entry Options</label>
                            </div>
                        </div>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center ">
                            <input type="checkbox" id="wd-text-entry" checked={defaultTextEntry} className="wd-button-type" />
                            <label htmlFor="wd-text-entry"  className="wd-button-text-type">&nbsp; Text Entry</label>
                        </div>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center ">
                            <input type="checkbox" id="wd-website-url" checked={defaultURL}  className="wd-button-type-url" />
                            <label htmlFor="wd-website-url"  className="wd-button-text-type-url">&nbsp; Website URL</label>
                        </div>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center ">
                            <input type="checkbox" id="wd-media-recordings" checked={defaultMedia} className="wd-button-type-mr" />
                            <label htmlFor="wd-media-recordings" className="wd-button-text-type-mr">&nbsp; Media Recordings</label>
                        </div>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center ">
                            <input type="checkbox" id="wd-student-annotation" checked={defaultAnnotations} className="wd-button-type-sa" />
                            <label htmlFor="wd-student-annotation" className="wd-button-text-type-sa">&nbsp; Student Annotation</label>
                        </div>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center ">
                            <input type="checkbox" id="wd-file-upload" checked={defaultFileUpload} className="wd-button-type-fu" />
                            <label htmlFor="wd-file-upload" className="wd-button-text-type-fu">&nbsp; File Upload</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" d-flex wd-flex-row-container justify-content-center align-items-baseline mb-3" >
                <div className="col-2 d-flex">
                    <label className="wd-assign">Assign</label>
                </div>
                <div className="col-4 col-md-4">
                    <div className="container mt-4 border wd-rounded-corners-all-around wd-border-thin border-secondary form-control" style={{ width: "250px", height: "250px", marginLeft: '0px' }}>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center">
                            <div className="col-md-4">
                                <label style={{ width: '220px' }} className="wd-assign-to" htmlFor="wd-assign-to"><b>Assign To</b></label>
                            </div>
                        </div>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center mb-2">
                            <div className="col-md-4">
                                <input id="wd-assign-to" value="Everyone" className="form-control wd-assign-to" style={{ width: '220px' }} />
                            </div>
                        </div>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center">
                            <div className="col-md-4">
                                <label style={{ width: '220px' }} htmlFor="wd-due-date" className="wd-assign-to"><b>Due</b></label>
                            </div>
                        </div>
                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center ">
                            <input type="date" id="wd-due-date" value={`${(assignment[0] && assignment[0].due_date) ? assignment[0].due_date : ``}`} className="form-control" />
                        </div>

                        <div className=" d-flex wd-flex-row-container justify-content-center align-items-center">
                            <div className="col-md-4">
                                <label style={{ width: '100px' }} htmlFor="wd-available-from" className=""><b>Available From</b></label>
                            </div>
                            <div className="col-md-6">
                                <label style={{ width: '100px' }} htmlFor="wd-available-until" className="wd-until"><b>Until</b></label>
                            </div>
                        </div>
                        <div className=" d-flex wd-flex-row-container justify-content-start align-items-center " style={{ gap: '20px' }}>
                            <input style={{ width: '100px' }} type="date" id="wd-available-from" value={`${(assignment[0] && assignment[0].available_to) ? assignment[0].available_to : ``}`} className="form-control" />
                            <input style={{ width: '100px' }} type="date" id="wd-available-until" value={`${(assignment[0] && assignment[0].available_from) ? assignment[0].available_from : ``}`} className="form-control" />
                        </div>
                    </div>
                </div>
            </div>



            <hr />

            <div className="d-flex justify-content-end">
                <Link to={`/Kanbas/Courses/${cid}/Assignments/`}> <button className="btn btn-secondary me-3">Cancel</button> </Link>

                <Link to={`/Kanbas/Courses/${cid}/Assignments/`}> <button className="btn btn-danger">Submit</button> </Link>

            </div>
        </div>
    );
}


