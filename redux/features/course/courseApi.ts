import endpoints from "@/app/utils/endpoints";
import { courseServiceApi } from "../api/apiSlice";
import { ICreateEnrollment } from "@/@types/enrollment.types";

export const courseApi = courseServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: ({
        title,
        description,
        category,
        thumbnail,
        demoUrl,
        price,
        discountPrice,
      }) => ({
        url: endpoints.courses.add_course,
        method: "POST",
        body: {
          title,
          description,
          category,
          thumbnail,
          demoUrl,
          price,
          discountPrice,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Courses"],
    }),
    getAllCourse: builder.query({
      query: ({}) => ({
        url: endpoints.courses.get_all_courses,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Courses"],
    }),
    getSingleCourse: builder.query({
      query: ({ courseId }) => ({
        url: `${endpoints.courses.get_single_course}/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    // category
    addCategory: builder.mutation({
      query: ({ name }) => ({
        url: endpoints.category.add_category,
        method: "POST",
        body: {
          name,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Categories"],
    }),
    getAllCategory: builder.query({
      query: () => ({
        url: endpoints.category.get_all_category,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Categories"],
    }),
    unListCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: endpoints.category.unlist_category,
        method: "PUT",
        body: { categoryId },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Categories"],
    }),
    editCategory: builder.mutation({
      query: ({ categoryId, name }) => ({
        url: endpoints.category.edit_category,
        method: "PUT",
        body: { categoryId, name },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Categories"],
    }),
    getSingleCategory: builder.query({
      query: ({ categoryId }) => ({
        url: endpoints.category.get_single_category,
        method: "GET",
        params: categoryId,
        credentials: "include" as const,
      }),
    }),

    // enrollment
    getEnrolledCourses: builder.query({
      query: () => ({
        url: endpoints.enrollment.get_enrolled_course,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAddCourseMutation,
  useAddCategoryMutation,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useEditCategoryMutation,
  useUnListCategoryMutation,
  useGetAllCourseQuery,
  useGetSingleCourseQuery,
  useGetEnrolledCoursesQuery,
} = courseApi;
