"use client";
import ProfileInfo from "@/app/components/profile/EditProfile";
import Header from "@/app/components/common/ui/Header";
import { useSelector } from "react-redux";


const Profile = () => {
  const { user } = useSelector((state: any) => state?.auth);

  return (
    <>
      <Header />
      <ProfileInfo user={user} />
    </>
  );
};

export default Profile;
