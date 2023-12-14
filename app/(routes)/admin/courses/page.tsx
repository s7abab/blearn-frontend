"use client";
import { ICourseDataForTable } from "@/@types/course/course.types";
import CustomTable from "@/app/components/common/CustomTable";
import Loader from "@/app/components/common/spinners/Loader";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import React from "react";

type Props = {};

const CoursesList = (props: Props) => {
  const { data, isLoading } = useGetAllCourseQuery({});
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
