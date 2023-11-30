"use client";
import { ICourseDetails } from "@/@types/course.types";
import CourseCard from "@/app/components/courses/CourseCard";
import Loader from "@/app/components/spinners/Loader";
import { styles } from "@/app/styles/style";
import Heading from "@/app/utils/Heading";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const CoursesPage = (props: Props) => {
  const { data, isLoading } = useGetAllCourseQuery({});
  const router = useRouter();
  const courses: ICourseDetails[] = data?.courses;

  const ViewCourseDeatailsPage = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };
  return (
    <>
      <Heading
        title="Courses"
        description="Explore online courses in marketing, finance, e-commerce, and web development. Courses cater to all skill levels, offering specialized programs and certifications tailored to learners prficiency"
        keywords="Online Learning, Marketing, Finance, E-commerce, Web Development"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-full">
          <h1 className={styles.title}>Courses</h1>
          <div className="mt-5 grid grid-cols-1 400px:grid-cols-2 600px:grid-cols-3 800px:grid-cols-3 lg:grid-cols-4 xl:5 gap-5">
            {courses?.map((course, index) => (
              <div
                key={index}
                onClick={() => ViewCourseDeatailsPage(course._id)}
              >
                <CourseCard
                  title={course?.title}
                  imgUrl={course?.thumbnail}
                  entrolls={course?.entrolls}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CoursesPage;
