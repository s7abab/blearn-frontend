"use client";
import React, { useEffect, useState } from "react";
import VideoPlayer from "../../video/VideoPlayer";
import ModuleCard from "../../modules/ModuleCard";
import {
  useGetSingleEnrolledCourseQuery,
  useTrackLessonMutation,
} from "@/redux/features/course/courseApi";
import { ICourseDetails } from "@/@types/course/course.types";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IoIosDocument } from "react-icons/io";
import Link from "next/link";
import { setActiveLessonId } from "@/redux/features/course/courseSlice";
import { ILessonProgressTrackData } from "@/@types/course/lesson.types";

const WatchCourse = () => {
  const [lessonCount, setLessonCount] = useState<number>(0);
  const { courseId } = useParams<any>();
  const [trackData, setTrackData] = useState<ILessonProgressTrackData>({
    courseId: courseId,
    lessonId: "first",
    moduleId: "first",
    progress: 0,
  });
  const { data: courseData } = useGetSingleEnrolledCourseQuery(courseId);
  const { activeLesson, activeLessonId } = useSelector(
    (state: any) => state.course
  );
  const [trackProgress, { isLoading }] = useTrackLessonMutation();
  const dispatch = useDispatch();
  const course: ICourseDetails = courseData?.course;
  const lessons = course?.modules?.map((module) => module?.lessons).flat();
  const totalLessons = course?.totalLessons;
  const handleNext = () => {
    if (lessonCount < lessons?.length - 1) {
      setLessonCount((prevCount) => prevCount + 1);
      dispatch(setActiveLessonId(lessons[lessonCount + 1]?._id));
      setTrackData({
        ...trackData,
        lessonId: lessons[lessonCount + 1]?._id,
      });
    }
  };

  const handlePrev = () => {
    if (lessonCount > 0) {
      setLessonCount((prevCount) => prevCount - 1);
      dispatch(setActiveLessonId(lessons[lessonCount - 1]?._id));
      setTrackData({
        ...trackData,
        lessonId: lessons[lessonCount - 1]?._id,
      });
    }
  };
  // Find the current lesson
  const currentLesson = lessons?.[lessonCount];
  // Find the module that contains the current lesson
  const currentModule = course?.modules.find((module) =>
    module.lessons.some((lesson) => lesson._id === currentLesson?._id)
  );
  useEffect(() => {
    if (activeLessonId) {
      const lessonIndex = lessons?.findIndex(
        (lesson) => lesson?._id === activeLessonId
      );
      if (lessonIndex !== -1) {
        setLessonCount(lessonIndex);
      }
    }
  }, [activeLessonId, lessons]);

  // track progression
  const handleProgress = (state: { played: number }) => {
    setTrackData({
      ...trackData,
      progress: state.played * 100,
      moduleId: currentModule?._id,
    });
    // Check for specific progress percentages to call trackProgress
    if (state.played * 100 === 100) {
      trackProgress(trackData);
    }
  };

  return (
    <div className="md:flex min-h-screen">
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
