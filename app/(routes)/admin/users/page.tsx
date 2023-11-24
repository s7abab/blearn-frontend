"use client";
import Users from "@/app/components/admin/Table";
import { useGetUsersQuery } from "@/redux/features/auth/authApi";
import React from "react";

type Props = {};

const UsersList = (props: Props) => {
  const { data } = useGetUsersQuery({});
  return (
    <div className="h-screen mt-5">
      <Users data={data?.users} role={"Users"} isCourse={false} />
    </div>
  );
};

export default UsersList;
