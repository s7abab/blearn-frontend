"use client";
import { useBlockUserMutation } from "@/redux/features/user/userApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IUser } from "@/@types/interfaces/user/user.interface";
import ProfileCard from "../profile/ProfileCard";

type Props = {
  user: IUser;
};

const UserDetails = ({ user }: Props) => {
  const [blockUser, { isSuccess, data }] = useBlockUserMutation();

  const handleBlockUser = async () => {
    await blockUser(user?._id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
  }, [isSuccess, data]);
  return (
    <ProfileCard
      isAdmin={true}
      user={user}
      name={user?.name}
      handleUpdateUser={handleBlockUser}
    />
  );
};

export default UserDetails;
