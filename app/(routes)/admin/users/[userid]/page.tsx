"use client";
import UserDetails from "@/app/components/admin/UserDetails";
import { useGetSingleUserQuery } from "@/redux/features/auth/authApi";
import { useParams } from "next/navigation";
import React from "react";

type Params = {
  userid: string;
};

const UserProfile = () => {
  const params = useParams<Params>();
  const { data, isLoading } = useGetSingleUserQuery(params?.userid);
  return (
    <>
      <UserDetails user={data?.user} />
    </>
  );
};

export default UserProfile;
