"use client";
import CourseDetailsPage from "@/app/components/courses/CourseDetailsPage";
import { useParams } from "next/navigation";

const SingleCoursePage = () => {
  const params = useParams();
  const courseId = params?.courseid as string;

  return (
    <>
      <div className="min-h-screen">
        <CourseDetailsPage courseId={courseId} />
      </div>
    </>
  );
};

export default SingleCoursePage;
