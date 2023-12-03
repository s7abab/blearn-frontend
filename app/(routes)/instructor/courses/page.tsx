"use client";
import { ICourseDetails } from "@/@types/course/course.types";
import CourseCard from "@/app/components/courses/CourseCard";
import AddCourseBtn from "@/app/components/instructor/AddCourseBtn";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";

type Course = {
  title: string;
  thumbnail: string;
  entrolls:number;
};

const CourseManagement = () => {
  const { data, isLoading } = useGetAllCourseQuery({});
  const courses: Course[] = data?.courses;

  return (
    <div className="h-full">
      <div className="mt-5">
      <AddCourseBtn />
      </div>
      <h1 className="mt-10 text-lg font-Poppins">My Courses</h1>
      <div className="mt-5 grid grid-cols-1 400px:grid-cols-2 600px:grid-cols-3 800px:grid-cols-3 lg:grid-cols-4 xl:5 gap-5">
        {courses?.map((course, index) => (
          <CourseCard
            key={index}
            course={course as ICourseDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
