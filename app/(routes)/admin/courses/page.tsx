"use client";
import { ICourseDataForTable } from "@/@types/interfaces/course/course.interface";
import CustomTable from "@/app/components/common/CustomTable";
import Loader from "@/app/components/common/spinners/Loader";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";

const CoursesList = () => {
  const { data, isLoading } = useGetAllCoursesQuery({});

  const courses: ICourseDataForTable[] = data?.courses;
  return (
    <div className="h-screen mt-5">
      {isLoading ? (
        <Loader />
      ) : (
        <CustomTable
          data={courses}
          tableFor={"courses"}
          fields={["title", "price"]}
          url="/courses"
        />
      )}
    </div>
  );
};

export default CoursesList;
