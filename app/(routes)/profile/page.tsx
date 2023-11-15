"use client";
import ProfileInfo from "@/app/components/profile/Profile";
import Header from "@/app/components/ui/Header";
import Protected from "@/app/hooks/useProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Profile = (props: Props) => {
  const { user } = useSelector((state: any) => state?.auth);

  return (
    <>
      <Protected>
        <Heading
          title={`${user?.name} Profile`}
          description="BLeaner is online learning platform"
          keywords="development,arts,finance"
        />
        <Header />
        <ProfileInfo user={user} />
      </Protected>
    </>
  );
};

export default Profile;
