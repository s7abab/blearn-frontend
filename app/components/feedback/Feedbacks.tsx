"use client";
import { useSelector } from "react-redux";
import FeedbackInput from "./FeedbackInput";
import { useGetFeedbacksQuery } from "@/redux/features/course/courseApi";
import FeedbackCard from "./FeedbackCard";

interface Props {
  input?: boolean;
}
const Feedbacks = ({ input }: Props) => {
  const { course } = useSelector((state: any) => state.course);
  const { data } = useGetFeedbacksQuery(course?._id);
  const feedbacks = data?.feedbacks;
  return (
    <>
      {input && <FeedbackInput />}
      <div className="mt-5 grid sm:grid-cols-2 gap-5 md:grid-cols-3">
        {feedbacks?.map((feedback: any) => (
          <FeedbackCard key={feedback._id} feedback={feedback} />
        ))}
      </div>
    </>
  );
};

export default Feedbacks;
