"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import FeedbackInput from "../../feedback/FeedbackInput";

const LessonOverview = () => {
  const [tab, setTab] = useState<string>("overview");
  const { course } = useSelector((state: any) => state.course);
  const handleTabChange = (tab: string) => {
    setTab(tab);
  };
  return (
    <>
      <div
        className={`flex justify-evenly items-center cursor-pointer font-Poppins h-[50px] bg-gray-900 rounded-md text-dark-primary mt-4 mb-4`}
      >
        <button
          onClick={() => handleTabChange("overview")}
          className={tab === "overview" ? "text-red-600" : ""}
        >
          Overview
        </button>
        <button
          onClick={() => handleTabChange("feedback")}
          className={tab === "feedback" ? "text-red-600" : ""}
        >
          Feedback
        </button>
        <button
          onClick={() => handleTabChange("community")}
          className={tab === "community" ? "text-red-600" : ""}
        >
          Community
        </button>
      </div>
      <>
        {tab === "overview" && (
          <h1 className="font-Poppins text-[16px]">{course?.description}</h1>
        )}
        {tab === "feedback" && <FeedbackInput />}
      </>
    </>
  );
};

export default LessonOverview;
