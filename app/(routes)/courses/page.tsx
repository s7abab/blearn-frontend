'use client'
import CourseCard from '@/app/components/courses/CourseCard';
import Loader from '@/app/components/common/spinners/Loader';
import { styles } from '@/app/styles/style';
import Heading from '@/app/utils/Heading';
import SortCourse from '@/app/components/common/SortCourse';
import Pagination from '@/app/components/common/Pagination';
import useFetchCourse from '@/app/hooks/useFetchCourse';
import { useRouter } from 'next/navigation';

const CoursesPage = () => {
  const {
    page,
    priceFilter,
    setPriceFilter,
    sortByEnrollments,
    setSortByEnrollments,
    isLoading,
    courses,
    handlePageChange,
    data
  }= useFetchCourse();
  const router = useRouter();

  const ViewCourseDetailsPage = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };
  return (
    <>
      <Heading
        title="Courses"
        description="Explore online courses in marketing, finance, e-commerce, and web development. Courses cater to all skill levels, offering specialized programs and certifications tailored to learners proficiency"
        keywords="Online Learning, Marketing, Finance, E-commerce, Web Development"
      />
      <>
        <>
          <SortCourse
            priceFilter={priceFilter}
            sortByEnrollments={sortByEnrollments}
            onPriceFilterChange={(value) => setPriceFilter(value)}
            onSortByEnrollmentsChange={(value) => setSortByEnrollments(value)}
          />
        </>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="min-h-1/2">
            <h1 className={styles.title}>Courses</h1>
            <div className="mt-5 grid grid-cols-1 400px:grid-cols-2 600px:grid-cols-3 800px:grid-cols-3 lg:grid-cols-4 gap-5">
              {courses?.map((course, index) => (
                <div key={index} onClick={() => ViewCourseDetailsPage(course?._id)}>
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
    </>
  );
};

export default CoursesPage;
