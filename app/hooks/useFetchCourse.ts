import { useState } from "react";
import { useSelector } from "react-redux";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";
import { useSearchAllCoursesQuery } from "@/redux/features/course/courseApi";

const useFetchCourse = () => {
  const [page, setPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState("");
  const [sortByEnrollments, setSortByEnrollments] = useState(false);
  const { searchTerm } = useSelector((state: any) => state.course);
  const { data, isLoading, refetch } = useSearchAllCoursesQuery({
    page,
    priceFilter: priceFilter || undefined,
    sortByEnrollments,
    searchKeyword: searchTerm,
  });
  const courses: ICourseDetails[] = data?.courses?.courses;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = () => {
    setPage(1);
    refetch();
  };

  return {
    page,
    setPage,
    priceFilter,
    setPriceFilter,
    sortByEnrollments,
    setSortByEnrollments,
    isLoading,
    courses,
    data,
    handlePageChange,
  };
};

export default useFetchCourse;
