import endpoints from "@/app/utils/endpoints";
import { paymentServiceApi } from "../api/apiSlice";

export const paymentApi = paymentServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    getStripePublishableKey: builder.query({
      query: () => ({
        url: endpoints.payments.get_stripe_publishable_key,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: endpoints.payments.create_payment_intent,
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),

    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: endpoints.payments.create_order,
        method: "POST",
        body: {
          courseId,
          payment_info,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
} = paymentApi;
