import React from "react";
import { FaStar } from "react-icons/fa";

const FeedbackCard = () => {
  return (
    <div className="md:w-1/4 ">
      <div className="p-4 bg-gray-400 dark:bg-gray-900 h-14 flex items-center justify-between rounded-md">
        <div className="bg-gray-50 rounded-full w-10 h-10">Photo</div>
        <div className="flex items-center">
          <FaStar className="text-yellow-400" />
          <h1>fafdfd</h1>
        </div>
      </div>
      <div className="relative p-4 bg-gray-300 dark:bg-gray-800 mb-10 rounded-md shadow-lg"></div>
    </div>
  );
};

export default FeedbackCard;
