import { RxRocket } from "react-icons/rx";
import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function QuizQuestionEditor() {

    const { cid, qid } = useParams();

    const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
    const quiz = quizzes.find((q: any) => q._id === qid);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        </div>
    );
}