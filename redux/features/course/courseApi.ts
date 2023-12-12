import endpoints from "@/app/utils/endpoints";
import { courseServiceApi } from "../api/apiSlice";
import { ICourseDetails } from "@/@types/course/course.types";
import { setCourse } from "./courseSlice";
import { ILessonProgressTrackData } from "@/@types/course/lesson.types";

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
      }: ICourseDetails) => ({
        url: endpoints.course.add_course,
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
    editCourse: builder.mutation({
      query: (data) => ({
        url: endpoints.course.edit_course,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Courses"],
    }),
    getAllCourse: builder.query({
      query: ({}) => ({
        url: endpoints.course.get_all_courses,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Courses"],
    }),
    getSingleCourse: builder.query({
      query: ({ courseId }) => ({
        url: `${endpoints.course.get_single_course}/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCourse(result.data.course));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    // category
    addCategory: builder.mutation({
      query: ({ name }) => ({
        url: endpoints.course.category.add_category,
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
        url: endpoints.course.category.get_all_category,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Categories"],
    }),
    unListCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: endpoints.course.category.unlist_category,
        method: "PUT",
        body: { categoryId },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Categories"],
    }),
    editCategory: builder.mutation({
      query: ({ categoryId, name }) => ({
        url: endpoints.course.category.edit_category,
        method: "PUT",
        body: { categoryId, name },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Categories"],
    }),
    getSingleCategory: builder.query({
      query: ({ categoryId }) => ({
        url: endpoints.course.category.get_single_category,
        method: "GET",
        params: categoryId,
        credentials: "include" as const,
      }),
    }),

    // user
    getEnrolledCourses: builder.query({
      query: (userId: string) => ({
        url: endpoints.course.user.get_enrolled_course,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getSingleEnrolledCourse: builder.query({
      query: (courseId: string) => ({
        url: `${endpoints.course.user.get_single_enrolled_course}/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCourse(result.data.course));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    // instructor
    getCoursesForInstructor: builder.query({
      query: () => ({
        url: endpoints.course.get_courses_for_instructor,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getSingleCourseForInstructor: builder.query({
      query: (courseId: string) => ({
        url: `${endpoints.course.get_single_course_for_instructor}/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCourse(result.data.course));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    addLesson: builder.mutation({
      query: (data) => ({
        url: endpoints.course.add_lesson,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Modules"],
    }),
    trackLesson: builder.mutation({
      query: (data: ILessonProgressTrackData) => ({
        url: endpoints.course.track_lesson,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["EnrolledCourse"],
    }),
    addModule: builder.mutation({
      query: (data) => ({
        url: endpoints.course.add_module,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Modules"],
    }),
    editModule: builder.mutation({
      query: (data) => ({
        url: endpoints.course.edit_module,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Modules"],
    }),
    deletModule: builder.mutation({
      query: (data) => ({
        url: endpoints.course.delete_module,
        method: "DELETE",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Modules"],
    }),
    getModules: builder.query({
      query: (courseId) => ({
        url: `${endpoints.course.get_modules}/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Modules"],
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
  useGetCoursesForInstructorQuery,
  useAddLessonMutation,
  useGetSingleCourseForInstructorQuery,
  useAddModuleMutation,
  useGetModulesQuery,
  useEditModuleMutation,
  useDeletModuleMutation,
  useEditCourseMutation,
  useGetSingleEnrolledCourseQuery,
  useTrackLessonMutation,
} = courseApi;
