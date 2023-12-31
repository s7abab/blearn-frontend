"use client";
import React, { useEffect, useState } from "react";
import {
  useLogoutMutation,
  useUpdateAvatarMutation,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import ProfileCard from "./ProfileCard";
import useFileUpload from "@/app/hooks/useS3Upload";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/features/user/userSlice";

interface Props  {
  user: { name: string; email: string; avatar: string; _id: string };
};

const ProfileInfo = ({ user }: Props) => {
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [updateUser, {}] = useUpdateUserMutation();
  const [updateAvatar, {}] = useUpdateAvatarMutation({});
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const logoutHandler = async () => {
    await logout(user._id);
    dispatch(userLoggedOut());
    Cookies.remove("token");
    await signOut();
    toast.success("Logout successfull");
  };
  // file upload
  const { uploadFile, loading } = useFileUpload();

  // image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setImage(e.target.files[0]);
    }
  };
  const handleImageUpload = async () => {
    const imgUrl = await uploadFile(image);
    if (imgUrl) {
      setImageUrl(imgUrl);
    }
  };
  useEffect(() => {
    if (image) {
      handleImageUpload();
    }
    //eslint-disable-next-line
  }, [image]);

  useEffect(() => {
    if (imageUrl) {
      updateAvatar(imageUrl);
    }
  }, [imageUrl, updateAvatar]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUpdateUser = () => {
    const email = user.email;
    updateUser({ name, email });
  };

  return (
    <ProfileCard
      user={user}
      name={name}
      handleImageChange={handleImageChange}
      handleNameChange={handleNameChange}
      handleUpdateUser={handleUpdateUser}
      logoutHandler={logoutHandler}
      uploading={loading}
    />
  );
};

export default ProfileInfo;
