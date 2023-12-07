"use client";
import { IModule } from "@/@types/course/course.types";
import React, { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import CourseContents from "../instructor/CourseContents";

type Props = {
  module: IModule;
  index:number
};

const ModuleCard = ({ module,index }: Props) => {
  const [lesson, setLesson] = useState<boolean>(false);
  const toggleLesson = () => {
    setLesson(!lesson);
  };

  return (
    <div className="bg-gradient-to-br from-[#2c2c35] to-[#29292a] p-5 rounded-md shadow-lg font-Josefin hover:from-[#373739] hover:to-[#414144] text-dark-primary  ">
      <div className="cursor-pointer flex justify-between" onClick={toggleLesson}>{module?.title} <IoIosArrowDown size={20} /></div>
      {lesson && (
        <>
          <div className="flex gap-4 items-center mt-3">
            <FaPlayCircle /> lesson 1
          </div>
          {<CourseContents index={index} />}
        </>
      )}
    </div>
  );
};

export default ModuleCard;
