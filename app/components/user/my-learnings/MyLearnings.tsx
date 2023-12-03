"use client";
import { User } from "@/@types/user/user.types";
import { useGetEnrolledCoursesQuery } from "@/redux/features/course/courseApi";
import React from "react";
import Loader from "../../spinners/Loader";
import { styles } from "@/app/styles/style";
import CourseCard from "../../courses/CourseCard";
import { ICourseDetails } from "@/@types/course/course.types";

type CourseWithProgress = {
  course: ICourseDetails;
  progress: number;
};

type Props = {
  user: User;
};

const MyLearnings = ({ user }: Props) => {
  const { isLoading, data } = useGetEnrolledCoursesQuery(user._id);
  const courses: CourseWithProgress[] | undefined = data?.courses;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className={styles.title}>My Learnings</h1>
          <div>
            <div className="mt-5 grid grid-cols-1 400px:grid-cols-2 600px:grid-cols-3 800px:grid-cols-3 lg:grid-cols-4 gap-5">
              {courses?.map((course, index) => (
                <CourseCard
                  key={index}
                  course={course?.course}
                  progress={course?.progress}
                  mylearning={true}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyLearnings;
