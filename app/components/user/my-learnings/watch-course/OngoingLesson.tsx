import { ILesson } from "@/@types/interfaces/course/lesson.interface";
import VideoPlayer from "@/app/components/video/VideoPlayer";
import Link from "next/link";
import React from "react";
import { IoIosDocument } from "react-icons/io";

type Props = {
  lessons: ILesson[];
  lessonCount: number;
  handleProgress: (state: { played: number }) => void;
  handlePrev: () => void;
  handleNext: () => void;
  totalLessons: number;
  activeLesson: number;
  currentLesson: ILesson;
};
const OngoingLesson = ({
  lessons,
  lessonCount,
  handleProgress,
  handlePrev,
  handleNext,
  totalLessons,
  activeLesson,
  currentLesson,
}: Props) => {
  return (
    <div className="md:w-2/3 rounded-md p-5">
      {lessons?.[lessonCount]?.type === "video" ? (
        <VideoPlayer
          handleProgress={handleProgress}
          url={lessons[lessonCount]?.url}
          height="400px"
        />
      ) : (
        <div className="h-[400px] w-full flex justify-center items-center">
          <IoIosDocument size={100} />
          {lessons?.[lessonCount]?.url && (
            <Link
              href={lessons?.[lessonCount]?.url}
              className="font-Poppins text-xl font-semibold"
            >
              Open Document
            </Link>
          )}
        </div>
      )}
      <div className="flex justify-between mt-2">
        <button
          className={`bg-blue-500 p-2 rounded-full shadow-md font-Poppins font-semibold ${
            lessonCount > 0 ? "" : "cursor-not-allowed"
          }`}
          onClick={() => {
            handlePrev();
          }}
        >
          Prev Lesson
        </button>
        <button
          className={`bg-blue-500 p-2 rounded-full shadow-md font-Poppins font-semibold ${
            lessonCount > totalLessons - 2 ? "cursor-not-allowed" : ""
          }`}
          onClick={() => {
            handleNext();
          }}
          disabled={activeLesson > totalLessons - 2}
        >
          Next Lesson
        </button>
      </div>
      <div className="mt-4">
        <h1 className="font-Poppins text-xl font-semibold">
          {currentLesson?.title}
        </h1>
      </div>
      <div
        className={`flex justify-evenly items-center cursor-pointer font-Poppins h-[50px] bg-gray-800 rounded-md text-dark-primary mt-4`}
      >
        <div>Overview</div>
        <div>Feedback</div>
        <div>Community</div>
      </div>
    </div>
  );
};

export default OngoingLesson;
