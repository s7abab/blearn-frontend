import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
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
  authSlice.actions;

export default authSlice.reducer;
