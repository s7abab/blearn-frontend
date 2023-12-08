import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggerIn } from "../user/userSlice";
import endpoints from "@/app/utils/endpoints";

// payment service api slice
export const paymentServiceApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PAYMENT_SRV_URL,
  }),
  endpoints: (builder) => ({}),
});
// course service api slice
export const courseServiceApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_COURSE_SRV_URL,
  }),
  tagTypes: ["Categories", "Courses", "Course", "Modules", "ILessons"],
  endpoints: (builder) => ({}),
});

// user service api slice
export const userServiceApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AUTH_SRV_URL,
  }),
  tagTypes: ["User", "Users","Instructor", "Instructors"],
  endpoints: (builder) => ({
    loadCurrentUser: builder.query({
      query: () => ({
        url: endpoints.user.get_current_user,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["User"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggerIn({
              token: result.data.token,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoadCurrentUserQuery } = userServiceApi;
