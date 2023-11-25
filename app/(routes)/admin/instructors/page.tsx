"use client";
import Table from "@/app/components/admin/Table";
import { useGetInstructorsQuery } from "@/redux/features/auth/authApi";
import React from "react";

type Props = {};

const InstructorsList = (props: Props) => {
  const { data } = useGetInstructorsQuery({});
  return (
    <div className="h-screen mt-5">
      <Table data={data?.instructors} role={"instructors"} isCourse={false} />
    </div>
  );
};

export default InstructorsList;
