"use client";
import { FaStar } from "react-icons/fa";
import ProfileImage from "../profile/ProfileImage";
import IFeedback from "@/@types/interfaces/course/feedback.interface";

interface Props {
  feedback: IFeedback;
}

const FeedbackCard: React.FC<Props> = ({ feedback }) => {
  return (
    <div className="bg-slate-500 bg-opacity-20 py-1 shadow-md rounded-md shadow-[bg-slate-700] backdrop-blur border border-[#ffffff1d] w-full">
      <div className="m-4">
        <div className="flex justify-between">
          <div className="flex flex-col items-center w-[40px] h-[40px] relative overflow-hidden rounded-full ">
            <ProfileImage avatar={feedback?.userId?.avatar} />
          </div>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-[18px] cursor-pointer ${
                  index < feedback?.rating ? "text-yellow-400 " : "text-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="text-gray-400 flex justify-start mt-2">{feedback?.comment}</div>
      </div>
    </div>
  );
};

export default FeedbackCard;
