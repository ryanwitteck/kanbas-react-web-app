import QuizTopBar from "./QuizTopBar";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, deleteQuiz, updateQuiz, setQuizzes } from "./reducer";
import { IoIosArrowDown } from "react-icons/io";

import { useParams } from "react-router";
import { useEffect } from "react";
import * as courseClient from "../client";
import QuizLeftButtons from "./QuizLeftButtons";
import QuizRightSideIcons from "./QuizRightSideIcons";
import * as quizClient from "./client";



export default function Quizzes() {
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const role = currentUser.role === "FACULTY";
  const dispatch = useDispatch();

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
  };

  const removeQuiz = async (quizId: string) => {
    await quizClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
    };


  return (
    <div id="wd-quizzes">
      <QuizTopBar addQuiz={createQuizForCourse} />
      <br /><br /><br />
      <ul id="wd-quiz-list-item" className="list-group rounded-0 container-fluid px-3">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <IoIosArrowDown className="me-2 fs-3" />
            Assignment Quizzes
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {quizzes
              .map((module: any) => (
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <QuizLeftButtons />
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <b>{module.title}</b>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="text-danger">Multiple Modules </span>
                      <span className="me-2">&nbsp; | <b>&nbsp;Not available until&nbsp;</b> {new Date(module.available_start).toLocaleDateString()} {new Date(module.available_start).toLocaleTimeString()} |&nbsp; <b>Due&nbsp;</b> {new Date(module.due_date).toLocaleDateString()} {new Date(module.due_date).toLocaleTimeString()} | {module.points} pts</span>
                    </div>
                  </div>
                  <div style={{ position: "absolute", right: "0px", top: "40%" }}>
                    <QuizRightSideIcons 
                    quiz={module}
                    quizId={module._id}
                      deleteQuiz={removeQuiz}
                      buttonId={`delete-assignment-${module._id}`} /></div>
                </li>))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
