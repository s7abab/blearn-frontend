import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggerIn: (
      state,
      action: PayloadAction<{ token: string; user: string }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      (state.token = ""), (state.user = "");
    },
  },
});

export const { userRegistration, userLoggerIn, userLoggedOut } =
  userSlice.actions;

export default userSlice.reducer;
