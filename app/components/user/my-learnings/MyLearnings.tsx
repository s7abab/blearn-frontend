"use client";
import { useGetEnrolledCoursesQuery } from "@/redux/features/course/courseApi";
import React from "react";
import Loader from "../../common/spinners/Loader";
import { styles } from "@/app/styles/style";
import CourseCard from "../../courses/CourseCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";
import { IUser } from "@/@types/interfaces/user/user.interface";

type Props = {
  user: IUser;
};

const MyLearnings = ({ user }: Props) => {
  const { isLoading, data } = useGetEnrolledCoursesQuery(user._id);
  const courses: ICourseDetails[] | undefined = data?.courses;
  const router = useRouter();

  const handleRoute = (courseId: string) => {
    router.push(`/my-learnings/${courseId}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className={styles.title}>My Learnings</h1>
          <div>
            {data.courses.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 400px:grid-cols-2 600px:grid-cols-3 800px:grid-cols-3 lg:grid-cols-4 gap-5">
                {courses?.map((course, index) => (
                  <div key={index} onClick={() => handleRoute(course?._id)}>
                    <CourseCard course={course} mylearning={true} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col fixed translate-y-[20%] items-center w-screen gap-2 h-screen">
                <h1 className="font-Josefin text-lg">
                  No purchased courses yet
                </h1>
                <Link href={"/courses"} className={styles.secondary_Btn}>
                  Explore our available courses
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MyLearnings;
