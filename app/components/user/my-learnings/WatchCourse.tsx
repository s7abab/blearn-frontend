"use client";
import React from "react";
import VideoPlayer from "../../video/VideoPlayer";
import ModuleCard from "../../modules/ModuleCard";
import { useGetSingleEnrolledCourseQuery } from "@/redux/features/course/courseApi";
import { ICourseDetails } from "@/@types/course/course.types";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IoIosDocument } from "react-icons/io";
import Link from "next/link";
import Loader from "../../spinners/Loader";
import { setActiveLesson } from "@/redux/features/course/courseSlice";

const WatchCourse = () => {
  const { courseId } = useParams<any>();
  const dispatch = useDispatch();
  const { data: courseData } = useGetSingleEnrolledCourseQuery(courseId);
  const { activeLesson } = useSelector((state: any) => state.course);
  const course: ICourseDetails = courseData?.course;
  const totalLessons = course?.totalLessons;
  const lessons = course?.modules?.map((module) => module?.lessons).flat();

  const handleNext = () => {
    dispatch(setActiveLesson(activeLesson + 1));
  };
  const handlePrev = () => {
    dispatch(setActiveLesson(activeLesson - 1));
  };

  if (!lessons && !activeLesson) {
    return <Loader />;
  }
  return (
    <div className="md:flex min-h-screen">
      <div className="md:w-2/3 rounded-md p-5">
        {lessons[activeLesson]?.type === "video" ? (
          <VideoPlayer url={lessons[activeLesson]?.url} height="400px" />
        ) : (
          <div className="h-[400px] w-full flex justify-center items-center">
            <IoIosDocument size={100} />
            {lessons[activeLesson]?.url && (
              <Link
                href={lessons[activeLesson]?.url}
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
              activeLesson > 0 ? "" : "cursor-not-allowed"
            }`}
            onClick={() => {
              handlePrev();
            }}
            disabled={activeLesson === 0}
          >
            Prev Lesson
          </button>
          <button
            className={`bg-blue-500 p-2 rounded-full shadow-md font-Poppins font-semibold ${
              activeLesson > totalLessons - 2 ? "cursor-not-allowed" : ""
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
            {course?.modules[activeLesson].title}
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
