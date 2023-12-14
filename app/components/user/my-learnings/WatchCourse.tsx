"use client";
import React, { useEffect, useState } from "react";
import VideoPlayer from "../../video/VideoPlayer";
import ModuleCard from "../../courses/modules/ModuleCard";
import {
  useGetSingleEnrolledCourseQuery,
  useTrackLessonMutation,
} from "@/redux/features/course/courseApi";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IoIosDocument } from "react-icons/io";
import Link from "next/link";
import { setActiveLessonId } from "@/redux/features/course/courseSlice";
import {
  ILesson,
  ILessonProgressTrackData,
} from "@/@types/interfaces/course/lesson.interface";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";
import CourseProgress from "./CourseProgress";

const WatchCourse = () => {
  const [lessonCount, setLessonCount] = useState<number>(0);
  const { courseId } = useParams<any>();
  const [trackData, setTrackData] = useState<ILessonProgressTrackData>({
    courseId: courseId,
    progress: 0,
    lessonId: "1",
  });
  const { data: courseData } = useGetSingleEnrolledCourseQuery(courseId);
  const { activeLesson, activeLessonId } = useSelector(
    (state: any) => state.course
  );
  const [trackProgress] = useTrackLessonMutation();
  const dispatch = useDispatch();
  const course: ICourseDetails = courseData?.course;
  const lessons: ILesson[] = course?.modules
    ?.map((module) => module?.lessons)
    .flat() as ILesson[];
  const totalLessons = course?.totalLessons;
  const handleNext = () => {
    if (lessonCount < lessons?.length - 1) {
      setLessonCount((prevCount) => prevCount + 1);
      dispatch(setActiveLessonId(lessons[lessonCount + 1]?._id));
      setTrackData({
        ...trackData,
        lessonId: lessons[lessonCount + 1]?._id as string,
      });
    }
  };

  const handlePrev = () => {
    if (lessonCount > 0) {
      setLessonCount((prevCount) => prevCount - 1);
      dispatch(setActiveLessonId(lessons[lessonCount - 1]?._id));
      setTrackData({
        ...trackData,
        lessonId: lessons[lessonCount - 1]?._id as string,
      });
    }
  };
  // Find the current lesson
  const currentLesson = lessons?.[lessonCount];

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
      progress: currentLesson.duration,
    });
    // Check for specific progress percentages to call trackProgress
    if (state.played * 100 === 100) {
      trackProgress(trackData);
      handleNext()
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
        <CourseProgress courseId={courseId} />
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
