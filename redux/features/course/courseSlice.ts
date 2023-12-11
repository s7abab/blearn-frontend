import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: {},
  activeLesson:0
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, { payload }) => {
      state.course = payload;
    },
    setActiveLesson:(state, {payload})=>{
      state.activeLesson= payload
    }
  },
});

export const { setCourse, setActiveLesson } = courseSlice.actions;

export default courseSlice.reducer;
