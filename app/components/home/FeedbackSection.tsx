"use client";
import feedbacksData from "@/app/data/feedbacksData";
import FeedbackCard from "../feedback/FeedbackCard";

const FeedbackSection = () => {
  return (
    <div className="mt-[80px]">
      <h1 className="font-Poppins text-center font-thin 1000px:text-[30px] 800px:text-[35px] 400px:text-[25px] cursor-pointer 400px:mt-4 text-gray-600">
        How learners like you are achieving their goals
      </h1>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {feedbacksData.map((feedback, index) => (
          <FeedbackCard
            feedback={feedback}
            isHome={true}
            key={index}
            url={feedback.userId.avatar.src as string}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackSection;
