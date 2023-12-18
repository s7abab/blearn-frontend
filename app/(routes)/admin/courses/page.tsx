"use client";
import { ICourseDataForTable } from "@/@types/interfaces/course/course.interface";
import CustomTable from "@/app/components/common/CustomTable";
import Loader from "@/app/components/common/spinners/Loader";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";
import React from "react";

type Props = {};

const CoursesList = (props: Props) => {
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
          url="/admin/courses"
        />
      )}
    </div>
  );
};

export default CoursesList;
