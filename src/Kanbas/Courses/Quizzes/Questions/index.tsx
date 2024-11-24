import { RxCaretDown, RxRocket } from "react-icons/rx";
import { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as courseClient from "../../client"
import * as quizClient from "../client";
import { addQuestion, deleteQuestion, updateQuestion, setQuestions } from "./reducer";
import * as questionClient from "./client";
import QuizTopBar from "../QuizTopBar";
import { FaSearch, FaTrash } from "react-icons/fa";
import PreviewQuestion from "./PreviewQuestion";


export default function QuestionEditor() {

    const { cid, qid } = useParams();

    const questions = useSelector((state: any) => state.questionReducer.questions);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        const quizzes = await quizClient.findQuestionsForQuiz(qid as string);
        dispatch(setQuestions(quizzes));
    };
    useEffect(() => {
        fetchQuestions();
    }, []);


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

    const removeQuestion = async (questionId: string) => {
        await questionClient.deleteQuestion(questionId); //change
        dispatch(deleteQuestion(questionId));
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
                    <a className="nav-link active">Questions</a>
                </li>
            </ul>
            <br />

            <div className="input-group me-1 float-start" style={{ width: '200px' }}>
                <span className="input-group-text" id="search-icon"><FaSearch /></span>
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-icon" />
            </div>

            {/* ********************************* ^ TABS ^ ********************************* */}
            <button onClick={createQuestionForQuiz} className="btn btn-danger me-3 mb-3 float-end"> Create Question</button>
            {/* ********************************* v BODY v ********************************* */}

            <ul className="container mt-4 wd-lessons list-group rounded-0">
                {questions
                    .map((question: any) => {
                        return (
                            <li className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center ms-3">
                                        <a style={{ display: "block", textDecoration: "none", color: "black" }}
                                            href={`#/Kanbas/Courses/${cid}/Quizzes/Questions/${qid}/Editor/${question._id}`}>
                                            <b>{question.title}</b>
                                        </a>
                                        <button className="btn border-0 p-0 bg-transparent" onClick={() => removeQuestion(question._id)}><FaTrash className="text-danger me-2 mb-1" /></button>
                                    </div>
                                    <PreviewQuestion question={question}/>
                                </div>
                            </li>);
                    })}
            </ul>
        </div>
    );
}