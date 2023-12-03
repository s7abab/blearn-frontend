"use client";
import UserDetails from "@/app/components/admin/UserDetails";
import Loader from "@/app/components/spinners/Loader";
import { useGetSingleInstructorQuery } from "@/redux/features/user/userApi";
import { useParams } from "next/navigation";
import React from "react";

type Params = {
  instructorid: string;
};

const InstructorsDetailsAdmin = () => {
  const params = useParams<Params>();
  const { data, isLoading } = useGetSingleInstructorQuery(params?.instructorid);
  return <>{isLoading ? <Loader /> : <UserDetails user={data?.user} />}</>;
};

export default InstructorsDetailsAdmin;
