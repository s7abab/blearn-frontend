import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {};

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courseId: null,
  },
  reducers: {
    setCourseId: (state, { payload }) => {
      state.courseId = payload;
    },
  },
});

export const { setCourseId } = courseSlice.actions;

export default courseSlice.reducer;
