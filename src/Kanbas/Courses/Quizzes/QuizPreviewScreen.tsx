/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as quizClient from "../Quizzes/client"
import { setQuestions } from "./Questions/reducer";

export default function QuizPreviewScreen() {
    const { cid, qid } = useParams();

    const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
    const quiz = quizzes.find((q: any) => q._id === qid);

    const questions = useSelector((state: any) => state.questionReducer.questions);

    const [answers, setAnswers] = useState<string[]>([]);
    const [hasSubmit, setSubmit] = useState(false);
    const [score, setScore] = useState(0);


    const dispatch = useDispatch();

    const fetchQuestions = async () => {
        const quizzes = await quizClient.findQuestionsForQuiz(qid as string);
        dispatch(setQuestions(quizzes));
    };
    useEffect(() => {
        fetchQuestions();
    }, [hasSubmit, score]);

    const handleAnswerChange = (questionId: string, answer: any) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const time = (`${hours}:${minutes}:${seconds}`);

    const handleSubmit = () => {
        setSubmit(true);
        let tally = 0;
        questions.forEach((question: any) => {
            const ans = answers[question._id];
            switch (question.group) {
                case "MULTIPLE":
                    if (ans === question.multiple_answers_answer) {
                        tally += question.points;
                    }
                    break;
                case "TF":
                    if (ans === String(question.tf_answer)) {
                        tally += question.points; 
                    }
                    break;
                case "FILL_IN":
                    if (question.fill_in_answers_array.includes(ans)) {
                        tally += question.points; 
                    }
                    break;
                default:
                    break;
            }
        });
        setScore(tally);
    };

    return (
        <div className="container mt-4">
            <h1 >Quiz Preview: {quiz?.title}</h1>
            <div className="d-flex justify-content-between">
                <b className=""> Started at: {time}</b>
                {hasSubmit && <b>Last Attempt Score: {score}</b>}
            </div>
            <br />
            <b style={{ color: "red" }}>This is a preview of the published version of this quiz</b>

            {/* ********************************* ^ HEADER ^ ********************************* */}

            {questions.map((question: any) => (
                <div className="card mt-3" key={question._id}>
                    {/* Header */}
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5>{question.title}</h5>
                        <b style={{ color: "black" }}>{question.points} Points</b>
                    </div>
                    <div className="card-body">
                        <p>{question.description}</p>

                        {question.group === "MULTIPLE" && (
                            <div>
                                {question.multiple_answers_array.map((option: string, index: number) => (
                                    <div className="form-check" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`question-${question._id}`}
                                            value={option}
                                            checked={answers[question._id] === option}
                                            onChange={() => handleAnswerChange(question._id, option)}
                                        />
                                        <label className="form-check-label">{option}</label>
                                    </div>
                                ))}
                            </div>
                        )}

                        {question.group === "TF" && (
                            <div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question-${question._id}`}
                                        value="true"
                                        checked={answers[question._id] === "true"}
                                        onChange={() => handleAnswerChange(question._id, "true")}
                                    />
                                    <label className="form-check-label">True</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question-${question._id}`}
                                        value="false"
                                        checked={answers[question._id] === "false"}
                                        onChange={() => handleAnswerChange(question._id, "false")}
                                    />
                                    <label className="form-check-label">False</label>
                                </div>
                            </div>
                        )}

                        {question.group === "FILL_IN" && (
                            <div>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Type your answer here..."
                                    value={answers[question._id] || ""}
                                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* ********************************* ^ BODY ^ ********************************* */}
            {/* ********************************* v BUTTONS v ********************************* */}


            <div className="d-flex justify-content-between mt-2">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/Questions/${qid}`}>
                    <button className="btn btn-secondary">Keep Editing Quiz</button>
                </Link>
                <button className="btn btn-success" onClick={handleSubmit}>
                    Submit Quiz
                </button>

            </div>


        </div>
    );
}