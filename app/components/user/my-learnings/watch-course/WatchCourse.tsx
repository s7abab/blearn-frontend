"use client";
import { useEffect, useState } from "react";
import ModuleCard from "../../../courses/modules/ModulesAndLessons";
import {
  useGetProgressionQuery,
  useGetSingleEnrolledCourseQuery,
  useTrackLessonMutation,
} from "@/redux/features/course/courseApi";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setActiveLessonId } from "@/redux/features/course/courseSlice";
import {
  ILesson,
  ILessonProgressTrackData,
} from "@/@types/interfaces/course/lesson.interface";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";
import CourseProgress from "../CourseProgress";
import OngoingLesson from "./OngoingLesson";
import GetCertificateBtn from "../../GetCertificate";

const WatchCourse = () => {
  const [lessonCount, setLessonCount] = useState<number>(0);
  const { courseId } = useParams<any>();
  const [trackData, setTrackData] = useState<ILessonProgressTrackData>({
    courseId: courseId,
    progress: 0,
    lessonId: "1",
  });

  const { data: progressData } = useGetProgressionQuery(courseId);
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
      handleNext();
    }
  };

  return (
    <div className="md:flex min-h-screen">
      <OngoingLesson
        activeLesson={activeLesson}
        currentLesson={currentLesson}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleProgress={handleProgress}
        lessonCount={lessonCount}
        lessons={lessons}
        totalLessons={totalLessons}
      />
      {/* sidebar */}
      <div className="flex flex-col md:w-1/3 px-3 ">
        <CourseProgress progress={progressData?.progression} />
        {course?.modules?.map((module, index) => (
          <div key={index} className="mt-2">
            <ModuleCard module={module} edit={false} />
          </div>
        ))}
        {progressData?.progression === 100 && <GetCertificateBtn />}
      </div>
    </div>
  );
};

export default WatchCourse;
