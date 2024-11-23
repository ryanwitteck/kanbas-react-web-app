
import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";

export default function QuizDetails() {

    const { cid, qid } = useParams();

    const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
    const quiz = quizzes.find((q: any) => q._id === qid);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /*
             FIELD SPLURGE
    */
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




    //MISC FUNCTIONS 
    let gradeTypeMessage = "Graded Quiz";
    switch (quiz.quiz_type) {
        case "GRADED":
            gradeTypeMessage = "Graded Quiz";
            break;
        case "PRACTICE":
            gradeTypeMessage = "Practice Quiz";
            break;
        case "SURVEY":
            gradeTypeMessage = "Graded Survey";
            break;
        case "UNGRADED":
            gradeTypeMessage = "Ungraded Survey";
            break;
        default:
            gradeTypeMessage = "Graded Quiz";
    }
    return (
        <div className="container mt-2">
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-secondary me-2">Preview
                </button>
                <button className="btn btn-secondary">
                    <IoIosLink /> Edit
                </button>
            </div> <hr />

            {/* -------------------------------------------------------------- */}
            <h2>{quiz.title}</h2>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Quiz Type:
                </b>
                <div className="col">
                    {gradeTypeMessage}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Points:
                </b>
                <div className="col">
                    {quiz.points ? quiz.points : 0}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Assignment Group:
                </b>
                <div className="col">
                    {quiz.group}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Shuffle Answers:
                </b>
                <div className="col">
                    {quiz.shuffle ? "Yes" : "No"}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Time Limit:
                </b>
                <div className="col">
                    {quiz.time_limit} Minutes
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Mutliple Attempts:
                </b>
                <div className="col">
                    {quiz.multiple_attempts ? "Yes" : "No"}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    How Many Attempts:
                </b>
                <div className="col">
                    {quiz.attempt_count}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Show Correct Answers:
                </b>
                <div className="col">
                    {quiz.show_correct_answers ? "Yes" : "No"} {/* Implement date if feel like it*/}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Access Code:
                </b>
                <div className="col">
                    {quiz.access_code}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    One Question at a Time:
                </b>
                <div className="col">
                    {quiz.one_question_at_a_time ? "Yes" : "No"}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Webcam Required:
                </b>
                <div className="col">
                    {quiz.webcam_required ? "Yes" : "No"}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Lock Questions After Answering:
                </b>
                <div className="col">
                    {quiz.lock_questions_after_answering ? "Yes" : "No"}
                </div>
            </div>
            <div className="d-flex row mt-1">
                <b className="col" style={{ textAlign: "right" }}>
                    Published:
                </b>
                <div className="col">
                    {quiz.published ? "Yes" : "No"}
                </div>
            </div>

            {/**** DUE ********** FOR ****** AVAILABLE ***** UNTIL */}
            <table className="table mt-5">
                <thead>
                    <tr className=""><th>Due</th><th>For</th><th>Available From</th><th>Available Until</th></tr>
                </thead>
                <tbody>
                    <tr className=""><td> {new Date(quiz.due_date).toLocaleDateString()}</td><td>Everyone</td><td> {new Date(quiz.available_start).toLocaleDateString()}</td><td> {new Date(quiz.available_end).toLocaleDateString()}</td></tr>
                  
                </tbody>
            </table>

        </div>
    );
}