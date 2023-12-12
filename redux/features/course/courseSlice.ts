import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: {},
  activeLessonId: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, { payload }) => {
      state.course = payload;
    },
    setActiveLessonId: (state, { payload }) => {
      state.activeLessonId = payload;
    },
  },
});

export const { setCourse,setActiveLessonId } =
  courseSlice.actions;

export default courseSlice.reducer;
