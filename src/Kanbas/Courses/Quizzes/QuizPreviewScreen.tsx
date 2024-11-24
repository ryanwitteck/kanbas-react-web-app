import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function QuizPreviewScreen() {
    const { cid, qid } = useParams();

    const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
    const quiz = quizzes.find((q: any) => q._id === qid);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="float-start">
            HELLO
            <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                <button className="btn btn-secondary me-2">Back
                </button>
                
            </Link>
        </div>
    );
}