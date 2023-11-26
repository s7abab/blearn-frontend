"use client";
import { ICourseDetails } from "@/@types/course.types";
import CourseDetails from "@/app/components/courses/CourseDetails";
import Loader from "@/app/components/spinners/Loader";
import { useGetSingleCourseQuery } from "@/redux/features/course/courseApi";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const CourseDeatailsPage = (props: Props) => {
  const params = useParams();
  const { data, isLoading } = useGetSingleCourseQuery({
    courseId: params?.courseid,
  });
  const courseData: ICourseDetails = data?.course;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-full">
          <CourseDetails courseData={courseData} />
        </div>
      )}
    </>
  );
};

export default CourseDeatailsPage;
