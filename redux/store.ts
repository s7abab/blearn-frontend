"use client";
import { configureStore } from "@reduxjs/toolkit";
import {
  courseServiceApi,
  paymentServiceApi,
  realtimeServiceApi,
  userServiceApi,
  valuationServiceApi,
} from "./features/api/apiSlice";
import authSlice from "./features/user/userSlice";
import courseSlice from "./features/course/courseSlice";
import paymentSlice from "./features/payment/paymentSlice";
import valuationSlice from "./features/valuation/valuationSlice";
import realtimeSlice from "./features/realtime/realtimeSlice";

export const store = configureStore({
  reducer: {
    [userServiceApi.reducerPath]: userServiceApi.reducer,
    [courseServiceApi.reducerPath]: courseServiceApi.reducer,
    [paymentServiceApi.reducerPath]: paymentServiceApi.reducer,
    [valuationServiceApi.reducerPath]: valuationServiceApi.reducer,
    [realtimeServiceApi.reducerPath]: realtimeServiceApi.reducer,
    auth: authSlice,
    course: courseSlice,
    payment: paymentSlice,
    valuation: valuationSlice,
    realtime: realtimeSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userServiceApi.middleware,
      courseServiceApi.middleware,
      paymentServiceApi.middleware,
      valuationServiceApi.middleware,
      realtimeServiceApi.middleware
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
