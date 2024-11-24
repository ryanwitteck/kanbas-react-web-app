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
import { FaSearch } from "react-icons/fa";


export default function Questions() {

    const { cid, qid, quid } = useParams();
    //Quizzes/Questions/:qid/Editor/:quid
    const questions = useSelector((state: any) => state.questionReducer.questions);
    const question = questions.find((q: any) => q._id === quid);

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
        await questionClient.deleteQuestion(questionId);
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
                <a className="nav-link"
                        style={{ display: "block", textDecoration: "none", color: "red" }}
                        href={`#/Kanbas/Courses/${cid}/Quizzes/Questions/${qid}`}>Questions</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active">{question.title}</a>
                </li>
            </ul>
            <br />



            {/* ********************************* ^ TABS ^ ********************************* */}

            {/* ********************************* v BODY v ********************************* */}

            <div className="d-flex justify-content-end">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/Questions/${qid}`}> <button className="btn btn-secondary me-3">Cancel</button> </Link>
                <button className="btn btn-danger me-3">Save</button>
            </div>
            {/* ********************************* ^ BOTTOM BUTTONS ^ ********************************* */}

        </div>
    );
}