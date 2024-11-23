/* eslint-disable react-hooks/exhaustive-deps */
import QuizTopBar from "./QuizTopBar";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, deleteQuiz, updateQuiz, setQuizzes } from "./reducer";
import { IoIosArrowDown } from "react-icons/io";

import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import * as courseClient from "../client";
import QuizLeftButtons from "./QuizLeftButtons";
import QuizRightSideIcons from "./QuizRightSideIcons";
import * as quizClient from "./client";



export default function Quizzes() {
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const isStudent = currentUser.role === "STUDENT";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    const quizzes = await courseClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const createQuizForCourse = async () => {
    if (!cid) return;
    const newQuiz = {
      title: "A New Quiz",
      course: cid
    };
    const quiz = await courseClient.createQuizForCourse(cid, newQuiz);
    dispatch(addQuiz(quiz));
    fetchQuizzes();
  };

  const removeQuiz = async (quizId: string) => {
    await quizClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
    fetchQuizzes();
  };




  return (
    <div id="wd-quizzes">
      <QuizTopBar addQuiz={createQuizForCourse} />
      <br /><br /><br />
      <ul id="wd-quiz-list-item" className="list-group rounded-0 container-fluid px-3 row">
        <li className="wd-quiz list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <IoIosArrowDown className="me-2 fs-3" />
            Assignment Quizzes
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {quizzes
              .map((quiz: any) => {
                const hasQuizPassed = new Date(quiz.available_end) < new Date();
                const isQuizAvailable = new Date(quiz.available_start) < new Date()
                  && new Date(quiz.available_end) > new Date();
                const isQuizInFuture = new Date(quiz.available_end) < new Date();
                return (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    <QuizLeftButtons />
                    <div className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center">
                        <a style={{ display: "block", textDecoration: "none", color: "black" }} href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}><b>{quiz.title}</b></a>
                      </div>
                      <div className="row">
                        <div className="col-2 text-danger fs-6" style={{ wordWrap: "break-word" }} >
                          {!quiz.available_start && !quiz.available_end && "Date Not Set"}
                          {hasQuizPassed && "Closed"}
                          {isQuizAvailable && <div>"Available Until:"  {quiz.available_end}</div>}
                          {isQuizInFuture && <div>"Not Available Until:"  {quiz.available_start}</div>}
                        </div>
                        <div className="col-8  fs-5" style={{ wordWrap: "break-word" }}>
                          Due at: {quiz.due_date} | {quiz.points ? quiz.points : 0} Points | {quiz.number_of_questions} Questions
                        </div>
                        <div className="col-1 " >
                        </div>
                      </div>
                    </div>
                    <div style={{ position: "absolute", right: "0px", top: "40%" }}>
                      <QuizRightSideIcons
                        cid={cid}
                        quiz={quiz}
                        quizId={quiz._id}
                        deleteQuiz={removeQuiz}
                        buttonId={`delete-assignment-${quiz._id}`} /></div>
                  </li>);
              })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
