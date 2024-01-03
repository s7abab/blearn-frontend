import endpoints from "@/app/utils/endpoints";
import { paymentServiceApi } from "../api/apiSlice";

export const paymentApi = paymentServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    getStripePublishableKey: builder.query({
      query: () => ({
        url: endpoints.payment.get_stripe_publishable_key,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: endpoints.payment.create_payment_intent,
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),

    createOrder: builder.mutation({
      query: ({ courseId, payment_info, instructorId }) => ({
        url: endpoints.payment.create_order,
        method: "POST",
        body: {
          courseId,
          payment_info,
          instructorId,
        },
        credentials: "include" as const,
      }),
    }),

    // course dashboard data
    getRevenueOfCourse: builder.query({
      query: ({ courseId }) => ({
        url: `${endpoints.payment.analytics.get_revenue_of_course}/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // instructor total revenue
    instructorTotalRevenue: builder.query({
      query: () => ({
        url: endpoints.payment.analytics.total_revenue_of_instructor,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    // admin total revenue
    adminTotalRevenue: builder.query({
      query: () => ({
        url: endpoints.payment.analytics.total_revenue_of_admin,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // withdraw money
    withdrawMoney: builder.mutation({
      query: () => ({
        url: endpoints.payment.withdraw_money,
        method: "POST",
        credentials: "include" as const,
      }),
      invalidatesTags: ["withdrawals"],
    }),

    getWithdrawals: builder.query({
      query: (userId: string) => ({
        url: `${endpoints.payment.get_withdrawals}/${userId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["withdrawals"],
    }),

    updateWithdrawalStatus: builder.mutation({
      query: (userId) => ({
        url: endpoints.payment.update_withdrawal_status,
        method: "PUT",
        body: { userId },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Pending"],
    }),

    getPendingWithdrawals: builder.query({
      query: () => ({
        url: endpoints.payment.get_pending_withdrawals,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Pending"],
    }),
  }),
});

export const {
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
  useGetRevenueOfCourseQuery,
  useWithdrawMoneyMutation,
  useGetWithdrawalsQuery,
  useUpdateWithdrawalStatusMutation,
  useGetPendingWithdrawalsQuery,
  useInstructorTotalRevenueQuery,
  useAdminTotalRevenueQuery
} = paymentApi;
