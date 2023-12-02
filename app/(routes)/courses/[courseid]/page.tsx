"use client";
import CourseDetailsPage from "@/app/components/courses/CourseDetailsPage";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const SingleCoursePage = (props: Props) => {
  const params = useParams();
  const courseId = params?.courseid as string;

  return (
    <>
      <div className="h-full">
        <CourseDetailsPage courseId={courseId} />
      </div>
    </>
  );
};

export default SingleCoursePage;
