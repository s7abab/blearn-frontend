"use client";
import { useLoadCurrentUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/payment/paymentApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadCurrentUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsloading] = useState(false);
  const { course } = useSelector((state: any) => state.course);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsloading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsloading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsloading(false);
      createOrder({ courseId: course._id, payment_info: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      redirect("/my-learnings");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    //eslint-disable-next-line
  }, [orderData, error]);

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-6">
        <LinkAuthenticationElement id="link-authentication-element" />
      </div>
      <div className="mb-6">
        <PaymentElement id="payment-element" />
      </div>
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-gray-900 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <span id="button-text">
          {isLoading ? "Paying..." : `Pay ₹${course?.discountPrice}`}
        </span>
      </button>
      {message && (
        <div
          id="payment-message"
          className="mt-4 text-center text-sm text-red-500"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
