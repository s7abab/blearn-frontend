import endpoints from "@/app/utils/endpoints";
import { userLoggedOut, userLoggerIn, userRegistration } from "./userSlice";
import toast from "react-hot-toast";
import { userServiceApi } from "../api/apiSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type registrationData = {};

export const userApi = userServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, registrationData>({
      query: (data) => ({
        url: endpoints.user.register,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: endpoints.user.activate_user,
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: endpoints.user.login,
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
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
    socialAuth: builder.mutation({
      query: ({ name, email, avatar }) => ({
        url: endpoints.user.social_auth,
        method: "POST",
        body: { name, email, avatar },
        credentials: "include" as const,
      }),
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
    logout: builder.query({
      query: () => ({
        url: endpoints.user.logout,
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    updateAvatar: builder.mutation({
      query: (imageUrl) => ({
        url: endpoints.user.update_user_avatar,
        method: "PUT",
        body: { imageUrl },
        credentials: "include" as const,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ email, name }) => ({
        url: endpoints.user.update_user,
        method: "PUT",
        body: { email, name },
        credentials: "include" as const,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = queryFulfilled;
        if ((await result).data.success) {
          toast.success("Profile updated");
        } else {
          toast.error("An issue occured, Please try again !");
        }
      },
    }),
    // admin
    getUsers: builder.query({
      query: () => ({
        url: endpoints.user.admin.get_users,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Users"],
    }),
    getInstructors: builder.query({
      query: () => ({
        url: endpoints.user.admin.get_instructors,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Instructors"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `${endpoints.user.admin.get_single_user}/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["User"],
    }),
    getSingleInstructor: builder.query({
      query: (id) => ({
        url: `${endpoints.user.admin.get_single_instructor}/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Instructor"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `${endpoints.user.admin.block_user}/${id}`,
        method: "PUT",
        body: id,
        credentials: "include" as const,
      }),
      invalidatesTags: ["User", "Instructor"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useUpdateAvatarMutation,
  useLogoutQuery,
  useUpdateUserMutation,
  useGetUsersQuery,
  useGetInstructorsQuery,
  useGetSingleUserQuery,
  useGetSingleInstructorQuery,
  useBlockUserMutation,
} = userApi;
