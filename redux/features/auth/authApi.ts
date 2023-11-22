import endpoints from "@/app/utils/endpoints";
import { authServiceApi } from "../api/apiSlice";
import { userLoggedOut, userLoggerIn, userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type registrationData = {};

export const authApi = authServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, registrationData>({
      query: (data) => ({
        url: endpoints.auth.register,
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
        url: endpoints.auth.activate_user,
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: endpoints.auth.login,
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("token", result.data.token);
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
        url: endpoints.auth.social_auth,
        method: "POST",
        body: { name, email, avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("token", result.data.token);
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
        url: endpoints.auth.logout,
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
      query: (avatar) => ({
        url: endpoints.auth.update_user_avatar,
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
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
} = authApi;
