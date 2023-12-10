import { ILesson } from "@/@types/course/lesson.types";
import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { useSelector } from "react-redux";

type Props = {
  lesson: ILesson;
  index: number;
};

const LessonCard = ({ lesson, index }: Props) => {
  const { lessonActiveIndex } = useSelector((state: any) => state.course);
  const formatDuration = () => {
    const minutes = Math.floor(lesson.duration / 60);
    const seconds = lesson.duration % 60;
    return `${minutes}.${seconds} min`;
  };
  return (
    <div className="flex gap-4 items-center mt-3 justify-between cursor-pointer">
      <div
        className={`flex gap-3 items-center p-2 hover:bg-gray-700 w-full rounded-md ${
          lesson._id === lessonActiveIndex ? "bg-gray-700" : ""
        }`}
      >
        {lesson.type === "video" ? (
          <FaPlayCircle color={"##0b8ca3"} />
        ) : (
          <IoIosDocument />
        )}
        <div>
          <h1 className="text-sm">{lesson.title} </h1>
          <h1 className="text-sm">{formatDuration()}</h1>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
