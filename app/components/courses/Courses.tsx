"use client";
import CourseCard from "@/app/components/courses/CourseCard";
import Loader from "@/app/components/common/spinners/Loader";
import { styles } from "@/app/styles/style";
import SortCourse from "@/app/components/common/SortCourse";
import Pagination from "@/app/components/common/Pagination";
import useFetchCourse from "@/app/hooks/useFetchCourse";
import { useRouter } from "next/navigation";
import Search from "../common/Search";

const Courses = () => {
  const {
    page,
    priceFilter,
    setPriceFilter,
    sortByEnrollments,
    setSortByEnrollments,
    isLoading,
    courses,
    handlePageChange,
    data,
  } = useFetchCourse();
  const router = useRouter();

  const ViewCourseDetailsPage = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };
  return (
    <>
      <div className="flex items-center gap-3 mt-5">
        <Search
          placeholder="Search a course"
          inputStyle="p-2 text-center rounded-full dark:bg-gray-800 bg-slate-100 dark:text-gray-100 "
        />
        <SortCourse
          priceFilter={priceFilter}
          sortByEnrollments={sortByEnrollments}
          onPriceFilterChange={(value) => setPriceFilter(value)}
          onSortByEnrollmentsChange={(value) => setSortByEnrollments(value)}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen">
          <h1 className={styles.title}>Courses</h1>

          <div className="mt-5 grid grid-cols-1 400px:mx-[35px] 600px:grid-cols-2 600px:mx-[30px] 800px:grid-cols-3 800px:mx-0 900px:grid-cols-4 gap-8 ">
            {courses?.map((course, index) => (
              <div
                key={index}
                onClick={() => ViewCourseDetailsPage(course?._id)}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mb-5 mt-5 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={data?.courses?.totalPages}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Courses;
