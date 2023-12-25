import endpoints from "@/app/utils/endpoints";
import { valuationServiceApi } from "../api/apiSlice";

export const valuationApi = valuationServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    createExam: builder.mutation({
      query: (courseId) => ({
        url: endpoints.valuation.create_exam,
        method: "POST",
        body: { courseId },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Questions"],
    }),

    getExam: builder.query({
      query: (courseId: string) => ({
        url: `${endpoints.valuation.get_exam}/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Questions"],
    }),

    createQuestion: builder.mutation({
      query: ({ courseId, data }) => ({
        url: endpoints.valuation.create_question,
        method: "POST",
        body: { courseId, data },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Questions"],
    }),

    deleteQuestion: builder.mutation({
      query: ({ courseId, index }) => ({
        url: endpoints.valuation.delete_question,
        method: "DELETE",
        body: { courseId, index },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Questions"],
    }),

    updateQuestion: builder.mutation({
      query: ({ courseId, index, data }) => ({
        url: endpoints.valuation.update_question,
        method: "PUT",
        body: { courseId, index, data },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Questions"],
    }),

    addCompletedUser: builder.mutation({
      query: (courseId) => ({
        url: endpoints.valuation.add_completed_user,
        method: "POST",
        body: { courseId },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetExamQuery,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useCreateExamMutation,
  useAddCompletedUserMutation,
} = valuationApi;
