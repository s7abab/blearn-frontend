"use client";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";
import CourseCard from "../courses/CourseCard";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";
import { useRouter } from "next/navigation";

const CoursesSection = () => {
  const { data } = useGetAllCoursesQuery({});
  const courses: ICourseDetails[] = data?.courses.slice(0, 3);

  const router = useRouter();
  const ViewCourseDetailsPage = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };
  return (
    <div className="mt-[80px]">
      <h1 className="font-Poppins text-center font-thin 1000px:text-[30px] 800px:text-[35px] 400px:text-[25px] cursor-pointer 400px:mt-4 text-gray-600">
        A broad selection of courses
      </h1>
      <div className="flex justify-center">
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {courses?.map((course, index) => (
            <div key={index} onClick={() => ViewCourseDetailsPage(course?._id)}>
              <div className="min-w-[300px]">
                <CourseCard course={course} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
