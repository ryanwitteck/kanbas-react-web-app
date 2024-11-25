/* eslint-disable jsx-a11y/anchor-is-valid */
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useDispatch } from "react-redux";
import QuizDeleter from "./QuizDeleter";
import * as quizClient from "./client";
import { updateQuiz } from "./reducer";
import RedCircle from "./RedCircle";

export default function QuizRightSideIcons({
    quiz,
    quizId,
    cid,
    deleteQuiz,
    buttonId }:
    {
        quiz: any,
        cid:any,
        quizId: string;
        deleteQuiz: (quizId: string) => void;
        buttonId: string;
    }) {
    const dispatch = useDispatch();
    const publishQuiz = async () => {
        let x = structuredClone(quiz);
        x.published = !x.published;
        await quizClient.updateQuiz(x);
        dispatch(updateQuiz(x));
    };


    return (
        <div className="float-end d-flex align-items-center">
            {quiz.published ? <GreenCheckmark /> : <RedCircle />}
            <div className="dropdown">
                <button id="dropdownMenuButton" className="btn border-0 p-0 bg-transparent"
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <IoEllipsisVertical className="fs-2" />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href={`#/Kanbas/Courses/${cid}/Quizzes/Editor/${quiz._id}`}>Edit</a>
                    <a data-bs-toggle="modal" data-bs-target={`#${buttonId}`} className="dropdown-item" href="#">Delete</a>
                    <a className="dropdown-item" onClick={publishQuiz}>{quiz.published ? "Unpublish" : "Publish"}</a>
                </div>
            </div>
            <QuizDeleter quizId={quizId}
                deleteQuiz={deleteQuiz}
                buttonId={buttonId} />
        </div>

    );
}