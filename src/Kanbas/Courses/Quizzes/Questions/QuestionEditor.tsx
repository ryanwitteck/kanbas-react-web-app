/* eslint-disable jsx-a11y/anchor-is-valid */
import { RxCaretDown } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { updateQuestion } from "./reducer";
import * as questionClient from "./client";
import { FaTrash } from "react-icons/fa";

export default function Questions() {

    const { cid, qid, quid } = useParams();
    //Quizzes/Questions/:qid/Editor/:quid
    const questions = useSelector((state: any) => state.questionReducer.questions);
    const question = questions.find((q: any) => q._id === quid);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(0);
    const [tfAnswer, setTfAnswer] = useState(false);
    const [group, setGroup] = useState("MULTIPLE");
    const [multiAnswersArray, setMultiAnswersArray] = useState<string[]>([]);
    const [mulitAnswer, setMultiAnswer] = useState("");
    const [fillInAnswersArray, setFillInAnswersArray] = useState<string[]>([]);



    const saveQuestion = async () => {
        const x = structuredClone(question);
        x.title = title;
        x.description = description;
        x.points = points;
        x.group = group;
        x.tf_answer = tfAnswer;
        x.multiple_answers_array = multiAnswersArray;
        x.multiple_answers_answer = mulitAnswer;
        x.fill_in_answers_array = fillInAnswersArray;
        await questionClient.updateQuestion(x);
        dispatch(updateQuestion(x));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/Questions/${qid}`);
    };

    useEffect(() => {
        if (question !== null) {
            setTitle(question.title);
            setDescription(question.description);
            setPoints(question.points);
            setGroup(question.group);
            setTfAnswer(question.tf_answer);
            setMultiAnswersArray(question.multiple_answers_array);
            setMultiAnswer(question.multiple_answers_answer);
            setFillInAnswersArray(question.fill_in_answers_array);
        }
    }, [question]);

    return (
        <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
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

            <div className="container mt-4">
                <div className="">
                    <label htmlFor="wd-name" className="form-label"><h4>Question Title</h4></label>
                    <input id="wd-name" className="form-control mb-4" value={title} onChange={(e) => setTitle(e.target.value)} style={{ maxWidth: "250px" }} />
                </div>

                {/* ********************************* ^ TITLE ^ ********************************* */}

                <div className="">
                    <label htmlFor="wd-description" className="form-label">Question Description</label>
                    <textarea style={{ maxWidth: "1000px", height: "100px" }} id="wd-description" onChange={(e) => setDescription(e.target.value)} className="form-control" value={description}>
                        {description}
                    </textarea>
                </div>

                {/* ********************************* ^ DESCRIPTION ^ ********************************* */}
                <div className="mt-4">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                    <input type="number" id="wd-points" className="form-control" value={points} onChange={(e) => setPoints(Number(e.target.value))} style={{ maxWidth: "100px" }} />
                </div>
                {/* ********************************* ^ TIME LIMIT ^ ********************************* */}

                <div className="mt-3 " style={{ position: "relative", left: '300px', top: '-76px', }}>
                    <div className="">
                        <label htmlFor="wd-group" style={{ position: 'relative', top: '-12px' }}>Question Type:</label>
                    </div>
                    <div className="col-md-4">
                        <select id="wd-group" style={{ width: '200px' }} className="form-control" onChange={(e) => { setGroup(e.target.value) }}>
                            <option value="MULTIPLE" selected={question.group === "MULTIPLE"}>Multiple Choice</option>
                            <option value="TF" selected={question.group === "TF"}>True/False</option>
                            <option value="FILL_IN" selected={question.group === "FILL_IN"}>Fill In The Blank</option>
                        </select>
                        <RxCaretDown style={{ position: "relative", left: '173px', top: '-33px' }} />
                    </div>
                </div>
                {/* ********************************* ^ QUESTION GROUP ^ ********************************* */}
                {group === "TF" && <div className="mt-3 " style={{ position: "relative", top: '-76px', }}>
                    <div>
                        <label htmlFor="wd-tf-answer" style={{ position: 'relative', top: '-12px' }}>True/False Answer:</label>
                    </div>
                    <div className="col-md-4">
                        <select id="wd-tf-answer" style={{ width: '200px' }} className="form-control" onChange={(e) => { setTfAnswer((e.target.value).toLowerCase() === "true") }}>
                            <option value="TRUE" selected={question.tf_answer}>True</option>
                            <option value="FALSE" selected={!question.tf_answer}>False</option>
                        </select>
                        <RxCaretDown style={{ position: "relative", left: '173px', top: '-33px' }} />
                    </div>
                </div>}


                {/* ********************************* ^ TRUE/FALSE ^ ********************************* */}

                {group === "MULTIPLE" && <div className="mt-3 " style={{ position: "relative", top: '-76px', }}>
                    <div>
                        <label style={{ position: 'relative', top: '-12px' }}>Possible Mulitple Choice Answers:</label>
                    </div>
                    {multiAnswersArray
                        .map((answer: string, index: number) => {
                            return (<div className="d-flex align-items-center mb-3">
                                <label htmlFor={`answer-${index}`} className="me-2">
                                    {answer === mulitAnswer ? "Correct Answer: " : "Possible Answer: "}
                                </label>
                                <input type="radio" checked={mulitAnswer === answer} onChange={() => setMultiAnswer(answer)} className="form-check-input me-4 ms-4" />
                                <input type="text" id={`answer-${index}`} className="form-control" value={answer}
                                    onChange={(e) => {
                                        const updatedAnswers = [...multiAnswersArray];
                                        updatedAnswers[index] = e.target.value;
                                        setMultiAnswersArray(updatedAnswers);
                                    }}
                                    style={{ maxWidth: "400px" }}
                                />
                                <button className="btn border-0 p-0 bg-transparent ms-2"
                                    onClick={() => {
                                        const updatedAnswers = multiAnswersArray.filter((_, i) => i !== index);
                                        setMultiAnswersArray(updatedAnswers);
                                    }}>
                                    <FaTrash className="text-danger me-2 mb-1" />
                                </button>

                            </div>);
                        })}
                    <div className="mt-3">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                setMultiAnswersArray([...multiAnswersArray, ""]);
                            }}
                        >
                            Add Answer
                        </button>
                    </div>


                </div>}


                {/* ********************************* ^ MULTIPLE CHOICE ^ ********************************* */}
                {group === "FILL_IN" && <div className="mt-3 " style={{ position: "relative", top: '-76px', }}>
                    <div>
                        <label style={{ position: 'relative', top: '-12px' }}>Possible Fill In Answers:</label>
                    </div>
                    {fillInAnswersArray
                        .map((answer: string, index: number) => {
                            return (<div className="d-flex align-items-center mb-3">
                                <label htmlFor={`answer-${index}`} className="me-2">Accepted Answer:</label>
                                <input type="text" id={`answer-${index}`} className="form-control" value={answer}
                                    onChange={(e) => {
                                        const updatedAnswers = [...fillInAnswersArray];
                                        updatedAnswers[index] = e.target.value;
                                        setFillInAnswersArray(updatedAnswers);
                                    }}
                                    style={{ maxWidth: "400px" }}
                                />
                                <button className="btn border-0 p-0 bg-transparent ms-2"
                                    onClick={() => {
                                        const updatedAnswers = fillInAnswersArray.filter((_, i) => i !== index);
                                        setFillInAnswersArray(updatedAnswers);
                                    }}>
                                    <FaTrash className="text-danger me-2 mb-1" />
                                </button>

                            </div>);
                        })}
                    <div className="mt-3">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                setFillInAnswersArray([...fillInAnswersArray, ""]);
                            }}
                        >
                            Add Answer
                        </button>
                    </div>


                </div>}


                {/* ********************************* ^ FILL IN THE BLANK ^ ********************************* */}

                {/* ********************************* v BOTTOM BUTTONS v ********************************* */}


                <div className="d-flex justify-content-end">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/Questions/${qid}`}> <button className="btn btn-secondary me-3">Cancel</button> </Link>
                    <button onClick={saveQuestion} className="btn btn-danger me-3">Save</button>
                </div>
            </div>
        </div>
    );
}