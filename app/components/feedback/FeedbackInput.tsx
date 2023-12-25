"use client";
import { styles } from "@/app/styles/style";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfileImage from "../profile/ProfileImage";

const FeedbackInput = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="flex flex-col ">
      <div className="flex items-center gap-3">
        <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full relative overflow-hidden">
          <ProfileImage avatar={user?.avatar} />
        </div>
        <h1 className="text-xl font-bold">Give a Rating *</h1>
      </div>
      <div className="flex items-center mx-10">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-yellow-400 text-2xl" />
        ))}
      </div>
      <textarea
        className="w-full h-32 border  rounded p-2 bg-inherit mt-3"
        placeholder="Enter your feedback..."
      />
      <div className="flex justify-end mt-3">
        <button className={`${styles.blue_btn} w-[100px]`}>Submit</button>
      </div>
    </div>
  );
};

export default FeedbackInput;
