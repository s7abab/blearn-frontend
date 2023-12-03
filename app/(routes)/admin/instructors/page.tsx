"use client";
import { IUserDataForTable } from "@/@types/user/user.types";
import CustomTable from "@/app/components/common/CustomTable";
import Loader from "@/app/components/spinners/Loader";
import { useGetInstructorsQuery } from "@/redux/features/user/userApi";
import React from "react";

type Props = {};

const InstructorsList = (props: Props) => {
  const { data, isLoading } = useGetInstructorsQuery({});
  const instructors: IUserDataForTable[] = data?.instructors;
  return (
    <div className="h-screen mt-5">
      {isLoading ? (
        <Loader />
      ) : (
        <CustomTable
          data={instructors}
          fields={["name", "email"]}
          tableFor="instructors"
          url="/admin/instructors"
        />
      )}
    </div>
  );
};

export default InstructorsList;
