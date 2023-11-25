"use client";
import UserDetails from "@/app/components/admin/UserDetails";
import { useGetSingleCourseQuery } from "@/redux/features/course/courseApi";
import { useParams } from "next/navigation";
import React from "react";

type Params = {
  userid: string;
};

const CourseDetailsAdmin = () => {
  const params = useParams<Params>();
  const { data } = useGetSingleCourseQuery(params?.userid);

  return (
    <>
      <UserDetails user={data?.course} />
    </>
  );
};

export default CourseDetailsAdmin;
