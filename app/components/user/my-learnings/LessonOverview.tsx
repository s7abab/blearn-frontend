"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import CourseCommunity from "./CourseCommunity";
import Feedbacks from "../../feedback/Feedbacks";

const LessonOverview = () => {
  const [tab, setTab] = useState<string>("overview");
  const { course } = useSelector((state: any) => state.course);
  const handleTabChange = (tab: string) => {
    setTab(tab);
  };
  return (
    <>
      <div
        className={`flex justify-evenly items-center cursor-pointer font-Poppins h-[50px] bg-gray-900 rounded-md text-dark-primary md:mt-4 mb-4`}
      >
        <button
          onClick={() => handleTabChange("overview")}
          className={tab === "overview" ? "text-[#00d4ff] text-sm" : ""}
        >
          Overview
        </button>
        <button
          onClick={() => handleTabChange("feedback")}
          className={tab === "feedback" ? "text-[#00d4ff] text-sm" : ""}
        >
          Feedback
        </button>
        <button
          onClick={() => handleTabChange("community")}
          className={tab === "community" ? "text-[#00d4ff] text-sm" : ""}
        >
          Community
        </button>
      </div>
      <>
        {tab === "overview" && (
          <div>
            <h1 className="font-Poppins text-[18px] font-medium">
              {course?.title}
            </h1>
            <h1 className="font-Poppins text-[14px] font-light text-gray-600 mt-2 ">
              {course?.description}
            </h1>
          </div>
        )}
        {tab === "feedback" && <Feedbacks input={true} />}
        {tab === "community" && <CourseCommunity />}
      </>
    </>
  );
};

export default LessonOverview;
