import { ILesson } from "@/@types/course/lesson.types";
import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";

type Props = {
  lesson: ILesson;
};

const LessonCard = ({ lesson }: Props) => {
  const formatDuration = () => {
    const minutes = Math.floor(lesson.duration / 60);
    const seconds = lesson.duration % 60;
    return `${minutes}.${seconds} min`;
  };
  return (
    <div
      key={lesson.index}
      className="flex gap-4 items-center mt-3 justify-between cursor-pointer"
    >
      <div className="flex gap-3 items-center">
        {lesson.type === "video" ? <FaPlayCircle /> : <IoIosDocument />}
        {lesson.title}
      </div>
      <div>{formatDuration()}</div>
    </div>
  );
};

export default LessonCard;
