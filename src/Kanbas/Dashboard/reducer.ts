import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  enrollments: [],
};
const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollemnts: (state, action) => {
      state.enrollments = action.payload;
    },
    courseEnroll: (state, { payload: enrollments }) => {
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        user: enrollments.user,
        course: enrollments.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    courseUnenroll: (state, { payload: {user, course} }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => e.user !== user && e.course !== course
      );
    },
  },
});
export const { courseEnroll, courseUnenroll, setEnrollemnts } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
