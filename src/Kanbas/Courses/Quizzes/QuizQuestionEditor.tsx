import { RxCaretDown, RxRocket } from "react-icons/rx";
import { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as courseClient from "../client"
import * as quizClient from "./client";
import { addQuestion, deleteQuestion, updateQuestion, setQuestions } from "./Questions/reducer";


export default function QuizQuestionEditor() {

    const { cid, qid } = useParams();

    const questions = useSelector((state: any) => state.questionReducer.questions);
    const question = questions.find((q: any) => q._id === qid);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [group, setGroup] = useState("MULTIPLE");

    const fetchQuestions = async () => {
        const quizzes = await quizClient.findQuestionsForQuiz(qid as string);
        dispatch(setQuestions(quizzes));
      };
      useEffect(() => {
        fetchQuestions();
      }, []);

      useEffect(() => {
        if (question !== undefined) {
            setTitle(question.title);
            setDescription(question.description);
        }
    }, [question]);
    
      const createQuestionForQuiz = async () => {
        if (!qid || !cid) return;
        const newQuestion = {
          title: "A New Question",
          quiz: qid
        };
        const question = await quizClient.createQuestionForQuiz(qid, newQuestion);
        dispatch(addQuestion(question));
        fetchQuestions();
      };

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link"
                        style={{ display: "block", textDecoration: "none", color: "red" }}
                        href={`#/Kanbas/Courses/${cid}/Quizzes/Editor/${qid}`}>Details</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" href="#">Questions</a>
                </li>
            </ul>


            {/* ********************************* ^ TABS ^ ********************************* */}
            {!question && <button onClick={createQuestionForQuiz} className="btn btn-danger me-3"> Create Question</button>}
            {/* ********************************* v BODY v ********************************* */}
            {question && <div>
                <div className="container mt-4">
                    <div className="">
                        <label htmlFor="wd-name" className="form-label"><h4>Question Name</h4></label>
                        <input id="wd-name" className="form-control mb-4" value={title} onChange={(e) => setTitle(e.target.value)} style={{ maxWidth: "250px" }} />
                    </div>
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
                        <select id="wd-type" style={{ width: '200px' }} className="form-control" onChange={(e) => { setGroup(e.target.value) }}>
                            <option value="GRADED" selected={question.group === "MULTIPLE"}>Multiple Choice</option>
                            <option value="PRACTICE" selected={question.group === "TF"}>True/False</option>
                            <option value="SURVEY" selected={question.group === "FILL_IN"}>Fill In</option>
                        </select>
                        <RxCaretDown style={{ position: "relative", left: '173px', top: '-33px' }} />
                    </div>
                </div>
            </div>}

        </div>
    );
}