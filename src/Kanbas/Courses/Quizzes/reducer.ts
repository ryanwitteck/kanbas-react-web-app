import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
      },
    addQuiz: (state, { payload: assignment }) => {
      const newQuiz: any = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        course: assignment.course,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? { ...q, ...quiz } : q
      ) as any;
    },
},
});
export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
quizzesSlice.actions;
export default quizzesSlice.reducer;