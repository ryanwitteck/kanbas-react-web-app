import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    scores: [],
};
const scoreSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {
    setScores: (state, action) => {
      state.scores = action.payload;
      },
    addScore: (state, { payload: score }) => {
      const newScore: any = {
        _id: new Date().getTime().toString(),
        user: score.user,
        quiz: score.quiz,
        answers: score.answers || []
      };
      state.scores = [...state.scores, newScore] as any;
    },
    deleteScore: (state, { payload: scoreId }) => {
      state.scores = state.scores.filter(
        (a: any) => a._id !== scoreId);
    },
    updateScore: (state, { payload: score }) => {
      state.scores = state.scores.map((q: any) =>
        q._id === score._id ? { ...q, ...score } : q
      ) as any;
    },
},
});
export const { setScores, addScore, deleteScore, updateScore } =
scoreSlice.actions;
export default scoreSlice.reducer;