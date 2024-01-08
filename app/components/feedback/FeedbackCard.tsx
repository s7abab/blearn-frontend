"use client";
import { FaStar } from "react-icons/fa";
import ProfileImage from "../profile/ProfileImage";
import IFeedback from "@/@types/interfaces/course/feedback.interface";
import Image from "next/image";

interface Props {
  feedback: IFeedback
  isHome?: boolean;
  url :string
}

const FeedbackCard: React.FC<Props> = ({ feedback, isHome, url }) => {
  return (
    <div className="dark:bg-slate-500 dark:bg-opacity-20 py-1 dark:shadow-md rounded-md dark:shadow-[bg-slate-700] dark:backdrop-blur dark:border dark:border-[#ffffff1d] w-full">
      <div className="m-4">
        <div className="flex justify-between">
          <div className="flex flex-col items-center w-[40px] h-[40px] relative overflow-hidden rounded-full ">
            {isHome ? (
              <Image src={url} alt="Avatar" width={100} height={100} />
            ) : (
              <ProfileImage avatar={feedback?.userId?.avatar} />
            )}
          </div>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-[18px] cursor-pointer ${
                  index < feedback?.rating
                    ? "text-yellow-400 "
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="dark:text-gray-400 flex justify-start mt-2">
          {feedback?.comment}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
