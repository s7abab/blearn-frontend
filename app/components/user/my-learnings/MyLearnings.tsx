"use client";
import { useGetEnrolledCoursesQuery } from "@/redux/features/course/courseApi";
import Loader from "../../common/spinners/Loader";
import { styles } from "@/app/styles/style";
import CourseCard from "../../courses/CourseCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";
import { IUser } from "@/@types/interfaces/user/user.interface";
import Pagination from "../../common/Pagination";
import { useState } from "react";

interface Props {
  user: IUser;
}

const MyLearnings = ({ user }: Props) => {
  const [page, setPage] = useState(1);

  const { isLoading, data } = useGetEnrolledCoursesQuery(page);
  const courses: ICourseDetails[] = data?.courses?.courses;
  // chnage page state
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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
            {courses?.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 400px:grid-cols-2 600px:grid-cols-3 800px:grid-cols-3 lg:grid-cols-4 gap-5">
                {courses?.map((course, index) => (
                  <div key={index} onClick={() => handleRoute(course?._id)}>
                    <CourseCard course={course} mylearning={true} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center w-screen gap-2 h-screen">
                <h1 className="font-Josefin text-lg">
                  No purchased courses yet
                </h1>
                <Link href={"/courses"} className={styles.secondary_Btn}>
                  Explore our available courses
                </Link>
              </div>
            )}
            <div className="mb-5 mt-5 flex justify-center">
              <Pagination
                isLoading={isLoading}
                currentPage={page}
                totalPages={data?.courses?.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyLearnings;
