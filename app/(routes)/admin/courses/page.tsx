"use client";
import Users from "@/app/components/admin/Table";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import React from "react";

type Props = {};

const CoursesList = (props: Props) => {
  const { data } = useGetAllCourseQuery({});
  return (
    <div className="h-screen mt-5">
      <Users data={data?.courses} role={"Instructors"} isCourse={true} />
    </div>
  );
};

export default CoursesList;
