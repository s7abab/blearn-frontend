import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: {},
  lessonActiveIndex:""
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, { payload }) => {
      state.course = payload;
    },
    setActiveIndex:(state, {payload})=>{
      state.lessonActiveIndex= payload
    }
  },
});

export const { setCourse, setActiveIndex } = courseSlice.actions;

export default courseSlice.reducer;
