import { RxCaretDown, RxRocket } from "react-icons/rx";
import { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as quizClient from "./client";
import { updateQuiz } from "./reducer";
import { access } from "fs";


export default function QuizEditor() {

    const { cid, qid } = useParams();

    const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
    const quiz = quizzes.find((q: any) => q._id === qid);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [availableFrom, setAvailableFrom] = useState("");
    const [availableUntil, setAvailableUntil] = useState("");
    const [assignmentGroup, setAssignmentGroup] = useState("QUIZZES");
    const [quizType, setQuizType] = useState("GRADED");
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const [showCorrectAnswersDate, setShowCorrectAnswersDate] = useState("");
    const [shuffled, setShuffle] = useState(true);
    const [mutlipleAttempts, setMutlipleAttempts] = useState(false);
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
    const [webcam, setWebcam] = useState(false);
    const [lockQuestionAfterAnswering, setLockQuestionAfterAnswering] = useState(false);
    const [timeLimit, setTimeLimit] = useState(20);
    const [accessCode, setAccessCode] = useState("");



    const saveAssignment = async () => {
        const x = structuredClone(quiz);
        x.title = title;
        x.description = description;
        x.due_date = dueDate;
        x.available_start = availableFrom;
        x.available_end = availableUntil;
        x.group = assignmentGroup;
        x.quiz_type = quizType;
        x.shuffle = shuffled;
        x.multiple_attempts = mutlipleAttempts;
        x.one_question_at_a_time = oneQuestionAtATime;
        x.webcam_required = webcam;
        x.lock_questions_after_answering = lockQuestionAfterAnswering;
        x.time_limit = timeLimit;
        x.access_code = accessCode;
        x.correct_answer_release_date = showCorrectAnswersDate;
        x.show_correct_answers = showCorrectAnswers;

        await quizClient.updateQuiz(x);
        dispatch(updateQuiz(x));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    };
    
    const publishAssignment = async () => {
        const x = structuredClone(quiz);
        x.published = true;
        x.title = title;
        x.description = description;
        x.due_date = dueDate;
        x.available_start = availableFrom;
        x.available_end = availableUntil;
        x.group = assignmentGroup;
        x.quiz_type = quizType;
        x.shuffle = shuffled;
        x.multiple_attempts = mutlipleAttempts;
        x.one_question_at_a_time = oneQuestionAtATime;
        x.webcam_required = webcam;
        x.lock_questions_after_answering = lockQuestionAfterAnswering;
        x.time_limit = timeLimit;
        x.access_code = accessCode;
        x.correct_answer_release_date = showCorrectAnswersDate;
        x.show_correct_answers = showCorrectAnswers;

        await quizClient.updateQuiz(x);
        dispatch(updateQuiz(x));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    };


    useEffect(() => {
        if (quiz !== null) {
            setTitle(quiz.title);
            setDescription(quiz.description);
            setDueDate(quiz.due_date);
            setQuizType(quiz.quiz_type);
            setAssignmentGroup(quiz.group);
            setShuffle(quiz.shuffle);
            setTimeLimit(quiz.time_limit);
            setAvailableFrom(quiz.available_start);
            setAvailableUntil(quiz.available_end);
            setMutlipleAttempts(quiz.multiple_attempts);
            setAccessCode(quiz.access_code);
            setOneQuestionAtATime(quiz.one_question_at_a_time);
            setWebcam(quiz.webcam_required);
            setLockQuestionAfterAnswering(quiz.lock_questions_after_answering);
            setShowCorrectAnswers(quiz.show_correct_answers);
            setShowCorrectAnswersDate(quiz.correct_answer_release_date);
        }
    }, [quiz]);

    return (
        <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
            <ul className="nav nav-tabs ms-2">
                <li className="nav-item">
                    <a className="nav-link active">Details</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"
                        style={{ display: "block", textDecoration: "none", color: "red" }}
                        href={`#/Kanbas/Courses/${cid}/Quizzes/Questions/${qid}`}>Questions</a>
                </li>
            </ul>


            {/* ********************************* ^ TABS ^ ********************************* */}

            {/* ********************************* v BODY v ********************************* */}


            <div className="container mt-4">
                <div className="">
                    <label htmlFor="wd-name" className="form-label"><h4>Quiz Name</h4></label>
                    <input id="wd-name" className="form-control mb-4" value={title} onChange={(e) => setTitle(e.target.value)} style={{ maxWidth: "250px" }} />
                </div>

                {/* ********************************* ^ TITLE ^ ********************************* */}

                <div className="">
                    <label htmlFor="wd-description" className="form-label">Description</label>
                    <textarea style={{ maxWidth: "1000px", height: "100px" }} id="wd-description" onChange={(e) => setDescription(e.target.value)} className="form-control" value={description}>
                        {description}
                    </textarea>
                </div>

                {/* ********************************* ^ DESCRIPTION ^ ********************************* */}


                <div className="mt-5">
                    <div className="">
                        <label htmlFor="wd-type" style={{ position: 'relative', top: '-12px' }}>Quiz Type</label>
                    </div>
                    <div className="col-md-4">
                        <select id="wd-type" style={{ width: '200px' }} className="form-control" onChange={(e) => { setQuizType(e.target.value) }}>
                            <option value="GRADED" selected={quiz.quiz_type === "GRADED"}>Graded Quiz</option>
                            <option value="PRACTICE" selected={quiz.quiz_type === "PRACTICE"}>Practice Quiz</option>
                            <option value="SURVEY" selected={quiz.quiz_type === "SURVEY"}>Graded Survey</option>
                            <option value="UNGRADED" selected={quiz.quiz_type === "UNGRADED"}>Ungraded Survey</option>
                        </select>
                        <RxCaretDown style={{ position: "relative", left: '173px', top: '-33px' }} />
                    </div>
                </div>


                {/* ********************************* ^ QUIZ TYPE ^ ********************************* */}

                <div className="mt-3 " style={{ position: "relative", left: '300px', top: '-100px', }}>
                    <div className="">
                        <label htmlFor="wd-group" style={{ position: 'relative', top: '-12px' }}>Assignment Group</label>
                    </div>
                    <div className="col-md-4">
                        <select id="wd-group" style={{ width: '200px' }} className="form-control" onChange={(e) => { setAssignmentGroup(e.target.value) }}>
                            <option value="ASSIGNMENTS" selected={quiz.group === "ASSIGNMENTS"}>ASSIGNMENTS</option>
                            <option value="QUIZZES" selected={quiz.group === "QUIZZES"}>QUIZZES</option>
                            <option value="EXAMS" selected={quiz.group === "EXAMS"}>EXAMS</option>
                            <option value="PROJECT" selected={quiz.group === "PROJECT"}>PROJECT</option>
                        </select>
                        <RxCaretDown style={{ position: "relative", left: '173px', top: '-33px' }} />
                    </div>
                </div>
                {/* ********************************* ^ ASSIGNMENT GROUP ^ ********************************* */}
                <div className="mb-3" style={{ position: 'relative', top: '-100px', }}>
                    <label className="form-label" >Total Points: {quiz.points ? quiz.points : 0}</label>
                </div>
                <hr style={{ position: 'relative', top: '-100px', }} />

                {/* ********************************* ^ POINTS ^ ********************************* */}

                <h4 style={{ position: 'relative', top: '-100px' }}> <b>Options</b></h4>
                <div style={{ position: 'relative', top: '-100px', }} className="mt-3">
                    <input type="checkbox" id="wd-shuffle-answers" checked={shuffled} onChange={() => setShuffle(!shuffled)} className="" />
                    <label htmlFor="wd-shuffle-answers" className="">&nbsp; Shuffle Questions</label>
                </div>
                {/* ********************************* ^ SHUFFLED ^ ********************************* */}
                <div style={{ position: 'relative', top: '-100px' }} className="mt-3">
                    <input type="checkbox" id="wd-multiple-attempts" checked={mutlipleAttempts} onChange={() => setMutlipleAttempts(!mutlipleAttempts)} className="" />
                    <label htmlFor="wd-multiple-attempts" className="">&nbsp; Multiple Attempts</label>
                </div>
                {/* ********************************* ^ MULTIPLE ATTEMPTS ^ ********************************* */}
                <div style={{ position: 'relative', top: '-100px', }} className="mt-3">
                    <input type="checkbox" id="wd-one-q-at-a-time" checked={oneQuestionAtATime} onChange={() => setOneQuestionAtATime(!oneQuestionAtATime)} className="" />
                    <label htmlFor="wd-one-q-at-a-time" className="">&nbsp; One Question at a Time</label>
                </div>
                {/* ********************************* ^ ONE QUESTION AT A TIME ^ ********************************* */}
                <div style={{ position: 'relative', top: '-100px', }} className="mt-3">
                    <input type="checkbox" id="wd-webcam" checked={webcam} onChange={() => setWebcam(!webcam)} className="" />
                    <label htmlFor="wd-webcam" className="">&nbsp; Webcam Required </label>
                </div>
                {/* ********************************* ^ WEBCAM ^ ********************************* */}
                <div style={{ position: 'relative', top: '-100px', }} className="mt-3">
                    <input type="checkbox" id="wd-lock-after-answering" checked={lockQuestionAfterAnswering}
                        onChange={() => setLockQuestionAfterAnswering(!lockQuestionAfterAnswering)} className="" />
                    <label htmlFor="wd-lock-after-answering" className="">&nbsp; Lock Questions After Answering</label>
                </div>
                <div style={{ position: 'relative', top: '-100px', }} className="mt-3">
                    <input type="checkbox" id="wd-show-correct-answers" checked={showCorrectAnswers}
                        onChange={() => setShowCorrectAnswers(!showCorrectAnswers)} className="" />
                    <label htmlFor="wd-show-correct-answers" className="">&nbsp; Show Correct Answers</label>
                </div>
                {showCorrectAnswers && <div style={{ position: 'relative', top: '-100px', }} className="d-flex wd-flex-row-container justify-content-left align-items-center">
                    <input style={{ width: '220px', fontSize: '12px' }} type="datetime-local" id="wd-available-until" value={showCorrectAnswersDate} onChange={(e) => setShowCorrectAnswersDate(e.target.value)} className="form-control" />
                </div>}

                <hr style={{ position: 'relative', top: '-100px', }} />


                {/* ********************************* ^ LOCK QUESTION AFTER ANSWERING ^ ********************************* */}
                <div className="mt-4" style={{ position: 'relative', top: '-100px', }}>
                    <label htmlFor="wd-time-limmit" className="form-label">Time Limit</label>
                    <input type="number" id="wd-time-limit" className="form-control" value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))} style={{ maxWidth: "100px" }} />
                </div>
                {/* ********************************* ^ TIME LIMIT ^ ********************************* */}
                <div className="mt-4" style={{ position: 'relative', top: '-100px' }}>
                    <label htmlFor="wd-access-code" className="form-label">Access Code</label>
                    <input id="wd-access-code" className="form-control" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} style={{ maxWidth: "100px" }} />
                </div>
                <hr style={{ position: 'relative', top: '-100px', }} />
                {/* ********************************* ^ ACCESS CODE ^ ********************************* */}
                <div style={{ position: 'relative', top: '-100px' }} className="d-flex wd-flex-row-container  mb-3">
                    <div className=" d-flex">
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
                                    <input id="wd-assign-to" value="Everyone" className="form-control wd-assign-to" style={{ width: '220px' }} />
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
                {/* ********************************* ^ DATES ^ ********************************* */}
                <div style={{ position: 'relative', top: '-10px', }} className="d-flex justify-content-end">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes`}> <button className="btn btn-secondary me-3">Cancel</button> </Link>
                    <button onClick={saveAssignment} className="btn btn-danger me-3">Save</button>
                    <button onClick={publishAssignment} className="btn btn-success">Save & Publish</button>
                </div>
            </div>
        </div>
    );
}