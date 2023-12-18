import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: {},
  activeLessonId: null,
  searchTerm: "",
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
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
  },
});

export const { setCourse, setActiveLessonId, setSearchTerm } = courseSlice.actions;

export default courseSlice.reducer;
