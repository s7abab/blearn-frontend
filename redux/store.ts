"use client";
import { configureStore } from "@reduxjs/toolkit";
import { authServiceApi, courseServiceApi } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import courseSlice from "./features/course/courseSlice";

export const store = configureStore({
  reducer: {
    [authServiceApi.reducerPath]: authServiceApi.reducer,
    [courseServiceApi.reducerPath]: courseServiceApi.reducer,
    auth: authSlice,
    course: courseSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authServiceApi.middleware,
      courseServiceApi.middleware
    ),
});

// call functions on every page load or refresh
const initializeApp = async () => {
  await store.dispatch(
    authServiceApi.endpoints.loadCurrentUser.initiate(
      {},
      { forceRefetch: true }
    )
  );
};

initializeApp();
