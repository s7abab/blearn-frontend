"use client";
import ProfileInfo from "@/app/components/profile/Profile";
import Header from "@/app/components/ui/Header";
import React from "react";
import { useSelector } from "react-redux";
import Protected from "@/app/hooks/useProtected";

type Props = {};

const Profile = (props: Props) => {
  const { user } = useSelector((state: any) => state?.auth);

  return (
    <>
      <Protected>
        <Header />
        <ProfileInfo user={user} />
      </Protected>
    </>
  );
};

export default Profile;
