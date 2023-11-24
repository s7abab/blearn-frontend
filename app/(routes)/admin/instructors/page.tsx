"use client";
import Users from "@/app/components/admin/Table";
import { useGetInstructorsQuery } from "@/redux/features/auth/authApi";
import React from "react";

type Props = {};

const InstructorsList = (props: Props) => {
  const { data } = useGetInstructorsQuery({});
  return (
    <div className="h-screen mt-5">
      <Users data={data?.instructors} role={"Instructors"} isCourse={false} />
    </div>
  );
};

export default InstructorsList;
