"use client";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";
import CourseCard from "@/app/components/courses/CourseCard";
import AddCourseBtn from "@/app/components/instructor/course/AddCourseBtn";
import { useGetCoursesForInstructorQuery } from "@/redux/features/course/courseApi";
import Link from "next/link";

const CourseManagement = () => {
  const { data, isLoading } = useGetCoursesForInstructorQuery({});
  const courses: ICourseDetails[] = data?.courses;

  return (
    <div className="min-h-screen">
      <div className="mt-5">
        <AddCourseBtn />
      </div>
      <h1 className="mt-10 text-lg font-Poppins">My Courses</h1>
      <div className="mt-5 grid grid-cols-1 400px:grid-cols-2 600px:grid-cols-3 800px:grid-cols-3 lg:grid-cols-4 xl:5 gap-5">
        {courses?.map((course, index) => (
          <Link key={index} href={`/instructor/courses/${course._id}`}>
          <CourseCard  course={course as ICourseDetails} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
