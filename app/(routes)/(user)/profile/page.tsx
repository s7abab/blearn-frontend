"use client";
import ProfileInfo from "@/app/components/profile/EditProfile";
import Header from "@/app/components/common/ui/Header";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Profile = (props: Props) => {
  const { user } = useSelector((state: any) => state?.auth);

  return (
    <>
      <Header />
      <ProfileInfo user={user} />
    </>
  );
};

export default Profile;
