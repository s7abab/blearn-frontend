"use client";
import ProfileInfo from "@/app/components/profile/Profile";
import Header from "@/app/components/ui/Header";
import Loader from "@/app/components/spinners/Loader";
import Protected from "@/app/hooks/useProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Profile = (props: Props) => {
  const { user } = useSelector((state: any) => state?.auth);

  return (
    <>
      {user ? (
        <>
        <Header />
          <ProfileInfo user={user} />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
