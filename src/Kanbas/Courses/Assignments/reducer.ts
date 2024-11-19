import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    assignments: [],
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
      },
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description, 
        points: assignment.points, 
        due_date: assignment.due_date, 
        available_from: assignment.available_from,
        available_to: assignment.available_until, 
        group: assignment.group,
        display_grade_as: assignment.display_grade_as
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? { ...a, ...assignment } : a
      ) as any;
    },
},
});
export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } =
assignmentsSlice.actions;
export default assignmentsSlice.reducer;