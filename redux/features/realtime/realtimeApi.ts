import endpoints from "@/app/utils/endpoints";
import { realtimeServiceApi } from "../api/apiSlice";
import { IChatRoom } from "@/@types/interfaces/realtime/chat.interface";

export const realtimeApi = realtimeServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    // create chatroom / community
    createCommunity: builder.mutation({
      query: (data: IChatRoom) => ({
        url: endpoints.realtime.create_chatroom,
        method: "POST",
        body: { data },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Community", "InstructorCommunities"],
    }),

    // get instructor's communities
    getCommunitiesForInstructor: builder.query({
      query: () => ({
        url: endpoints.realtime.get_chatrooms_for_instructor,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["InstructorCommunities"],
    }),

    // get community
    getCommunity: builder.query({
      query: (chatRoomId: string) => ({
        url: `${endpoints.realtime.get_chatroom}/${chatRoomId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // get community by courseId
    getCommunityByCourseId: builder.query({
      query: (courseId: string) => ({
        url: `${endpoints.realtime.get_chatroom_by_courseId}/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCommunityMutation,
  useGetCommunitiesForInstructorQuery,
  useGetCommunityQuery,
  useGetCommunityByCourseIdQuery,
} = realtimeApi;
