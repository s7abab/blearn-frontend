"use client";
import { useGetSingleCourseQuery } from "@/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import Loader from "../common/spinners/Loader";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/payment/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";

type Props = {
  courseId: string;
};

const CourseDetailsPage = ({ courseId }: Props) => {
  const { data, isLoading } = useGetSingleCourseQuery({
    courseId,
  });
  const courseData: ICourseDetails = data?.course;
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishablekey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (courseData) {
      const amount = Math.round(courseData.discountPrice * 100);
    }
    //eslint-disable-next-line
  }, [config, courseData]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  const handleCreateIntent = () => {
    if (courseData) createPaymentIntent(courseData.discountPrice);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseDetails
            stripePromise={stripePromise}
            clientSecret={clientSecret}
            createIntent={handleCreateIntent}
          />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
