/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as quizClient from "../Quizzes/client"
import { setQuestions } from "./Questions/reducer";
import { addScore, setScores, updateScore } from "./Scores/reducer";

export default function QuizPreviewScreen() {
    const { cid, qid } = useParams();

    const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
    const quiz = quizzes.find((q: any) => q._id === qid);
    const { currentUser } = useSelector((state: any) => state.accountReducer);


    const questions = useSelector((state: any) => state.questionReducer.questions);
    const scores = useSelector((state: any) => state.scoreReducer.scores);
    const score = scores.find((q: any) => q.quiz === qid && q.user === currentUser._id);

    const [hasSubmit, setSubmit] = useState(false);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});


    const dispatch = useDispatch();

    const fetchQuestions = async () => {
        const quizzes = await quizClient.findQuestionsForQuiz(qid as string);
        const Score = await quizClient.getScore(currentUser._id, qid as string);
        dispatch(setQuestions(quizzes));
        dispatch(setScores(Score));
    };
    useEffect(() => {
        fetchQuestions();

    }, [hasSubmit]);


    const handleAnswerChange = (questionId: string, answer: any) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };
    const hours = String(new Date().getHours()).padStart(2, "0");
    const minutes = String(new Date().getMinutes()).padStart(2, "0");
    const seconds = String(new Date().getSeconds()).padStart(2, "0");
    const time = (`${hours}:${minutes}:${seconds}`);

    const handleSubmit = async () => {
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
        if (score) {
            const x = structuredClone(score);
            x.score = tally;
            x.answers = answers;
            await quizClient.updateScore(x);
            dispatch(updateScore(x));
        }
        else {
            const x = await quizClient.submitScore(currentUser._id, qid || "", tally, answers);
            dispatch(addScore(x));
        }
    };
    return (
        <div className="container mt-4">
            <h1 >Quiz Preview: {quiz?.title}</h1>
            <div className="d-flex justify-content-between">
                <b className=""> Started at: {time}</b>
                {score && <b>Last Attempt Score: {score.score}</b>}
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
                                    value={answers[question._id] ? answers[question._id] : ""}
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