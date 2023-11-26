import React from "react";
import { FaStar } from "react-icons/fa";

type Feedback = {
  name: string;
  comment: string;
  rating: number;
};

type Props = {
  feedback: Feedback;
};

const FeedbackCard = ({ feedback }: Props) => {
  const { name, comment, rating } = feedback;

  return (
    <div className="w-1/4 rounded-md">
      <div className="p-4 bg-gray-900 h-14 flex items-center justify-between">
        <div className="bg-red-500 rounded-full w-10 h-10">Photo</div>
        <h1 className="font-Poppins font-semibold">{feedback.name}</h1>
        <div className="flex items-center">
          Rating: {feedback.rating} <FaStar className="text-yellow-400" />
        </div>
      </div>
      <div className="relative p-4 bg-gray-800 mb-10">
        {feedback.comment}
      </div>
    </div>
  );
};

export default FeedbackCard;
