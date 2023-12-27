"use client";
import { useState } from "react";
import { styles } from "@/app/styles/style";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfileImage from "../profile/ProfileImage";
import { useCreateFeedbackMutation } from "@/redux/features/course/courseApi";

const FeedbackInput = () => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  const { user } = useSelector((state: any) => state.auth);
  const { course } = useSelector((state: any) => state.course);
  const [createFeedback] = useCreateFeedbackMutation();

  const handleStarClick = (starIndex: number) => {
    // Increment starIndex by 1 to match the selected rating
    const selectedRating = starIndex + 1;
    setRating((prevRating) =>
      prevRating === selectedRating ? 0 : selectedRating
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleCreateFeedback = () => {
    createFeedback({
      rating,
      comment: feedback,
      userId: user._id,
      courseId: course._id,
    });
    setRating(5);
    setFeedback("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full relative overflow-hidden">
          <ProfileImage avatar={user?.avatar} />
        </div>
        <h1 className="text-xl font-bold">Give a Rating *</h1>
      </div>
      <div className="flex items-center mx-10">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-2xl cursor-pointer ${
              index < rating ? "text-yellow-400" : "text-gray-400"
            }`}
            onClick={() => handleStarClick(index)}
          />
        ))}
      </div>
      <textarea
      value={feedback}
        onChange={handleInputChange}
        className="w-full h-32 border rounded p-2 bg-inherit mt-3"
        placeholder="Enter your feedback..."
      />
      <div onClick={handleCreateFeedback} className="flex justify-end mt-3">
        <button className={`${styles.blue_btn} w-[100px]`}>Submit</button>
      </div>
    </div>
  );
};

export default FeedbackInput;
