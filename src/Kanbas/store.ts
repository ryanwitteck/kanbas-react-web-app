import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer"
import enrollmentReducer from "./Dashboard/reducer"
import quizReducer from "./Courses/Quizzes/reducer"
import questionReducer from "./Courses/Quizzes/Questions/reducer"
import scoreReducer from "./Courses/Quizzes/Scores/reducer"
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer,
    enrollmentReducer,
    quizReducer,
    questionReducer,
    scoreReducer
  },
});
export default store;