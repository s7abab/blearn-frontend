"use client";
import React, { useEffect, useState } from "react";
import VideoPlayer from "../../video/VideoPlayer";
import ModuleCard from "../../modules/ModuleCard";
import { useGetSingleEnrolledCourseQuery } from "@/redux/features/course/courseApi";
import { ICourseDetails } from "@/@types/course/course.types";
import { useParams } from "next/navigation";
import { setActiveIndex } from "@/redux/features/course/courseSlice";
import { useDispatch } from "react-redux";

const WatchCourse = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const dispatch = useDispatch();

  const { courseId } = useParams<any>();
  const { data: courseData } = useGetSingleEnrolledCourseQuery(courseId);
  const course: ICourseDetails = courseData?.course;

  const handleChangeLesson = (increment: number) => {
    const totalModules = course?.modules?.length || 0;
    const totalLessons =
      course?.modules[currentModuleIndex]?.lessons?.length || 0;

    let newModuleIndex = currentModuleIndex;
    let newLessonIndex = currentLessonIndex + increment;

    if (newLessonIndex >= totalLessons) {
      newModuleIndex += 1;
      newLessonIndex = 0;
    } else if (newLessonIndex < 0) {
      newModuleIndex -= 1;
      newLessonIndex = course?.modules[newModuleIndex]?.lessons.length - 1;
    }

    setCurrentModuleIndex(newModuleIndex);
    setCurrentLessonIndex(newLessonIndex);
  };

  const currentModule = course?.modules[currentModuleIndex];
  const currentLessonUrl = currentModule?.lessons[currentLessonIndex]?.url;
  dispatch(setActiveIndex(currentModule?.lessons[currentLessonIndex]?._id));

  useEffect(()=>{},[])
  return (
    <div className="md:flex min-h-screen">
      <div className="md:w-2/3 rounded-md p-5">
        <VideoPlayer url={currentLessonUrl} height="400px" />
        <div className="flex justify-between mt-2">
          <button
            className="bg-blue-500 p-2 rounded-full shadow-md font-Poppins font-semibold"
            onClick={() => handleChangeLesson(-1)}
          >
            Prev Lesson
          </button>
          <button
            className="bg-blue-500 p-2 rounded-full shadow-md font-Poppins font-semibold"
            onClick={() => handleChangeLesson(1)}
          >
            Next Lesson
          </button>
        </div>
        <div className="mt-4">
          <h1 className="font-Poppins text-xl font-semibold">
            {currentModule?.lessons[currentLessonIndex].title}
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
      <div className="flex flex-col md:w-1/3 px-3">
        {course?.modules?.map((module, index) => (
          <div key={index} className="mt-2">
            <ModuleCard module={module} index={index} edit={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchCourse;
