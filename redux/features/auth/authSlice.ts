import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  token,
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggerIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: string }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      (state.token = ""), (state.user = "");
    },
  },
});

export const { userRegistration, userLoggerIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
