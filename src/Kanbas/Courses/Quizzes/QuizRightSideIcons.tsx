import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useSelector } from "react-redux";
import QuizDeleter from "./QuizDeleter";

export default function QuizRightSideIcons({
    quiz,
    quizId,
    deleteQuiz,
    buttonId }:
    {
        quiz: any,
        quizId: string;
        deleteQuiz: (quizId: string) => void;
        buttonId: string;
    }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const role = currentUser.role === "FACULTY";
    return (
        <div className="float-end d-flex align-items-center">
            <GreenCheckmark />
            <div className="dropdown">
                <button id="dropdownMenuButton" className="btn border-0 p-0 bg-transparent"
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <IoEllipsisVertical className="fs-2" />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}>Edit</a>
                    <a data-bs-toggle="modal" data-bs-target={`#${buttonId}`} className="dropdown-item" href="#">Delete</a>
                    <a className="dropdown-item" href="#">Publish</a>
                </div>
            </div>
            <QuizDeleter quizId={quizId}
                deleteQuiz={deleteQuiz}
                buttonId={buttonId} />
        </div>

    );
}