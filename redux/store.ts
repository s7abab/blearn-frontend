"use client";
import { configureStore } from "@reduxjs/toolkit";
import {
  courseServiceApi,
  paymentServiceApi,
  userServiceApi,
} from "./features/api/apiSlice";
import authSlice from "./features/user/userSlice";
import courseSlice from "./features/course/courseSlice";
import paymentSlice from "./features/payment/paymentSlice";

export const store = configureStore({
  reducer: {
    [userServiceApi.reducerPath]: userServiceApi.reducer,
    [courseServiceApi.reducerPath]: courseServiceApi.reducer,
    [paymentServiceApi.reducerPath]: paymentServiceApi.reducer,
    auth: authSlice,
    course: courseSlice,
    payment: paymentSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userServiceApi.middleware,
      courseServiceApi.middleware,
      paymentServiceApi.middleware
    ),
});

// call functions on every page load or refresh
const initializeApp = async () => {
  await store.dispatch(
    userServiceApi.endpoints.loadCurrentUser.initiate(
      {},
      { forceRefetch: true }
    )
  );
};

initializeApp();
