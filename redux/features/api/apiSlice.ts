import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggerIn } from "../auth/authSlice";
import endpoints from "@/app/utils/endpoints";

// course service api slice
export const courseServiceApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_COURSE_SRV_URL,
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({}),
});

// auth service api slice
export const authServiceApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AUTH_SRV_URL,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loadCurrentUser: builder.query({
      query: () => ({
        url: endpoints.auth.get_current_user,
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

export const { useLoadCurrentUserQuery } = authServiceApi;
