"use client";
import React, { useEffect, useState } from "react";
import { styles } from "@/app/styles/style";
import {
  useLogoutQuery,
  useUpdateAvatarMutation,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import ProfileImage from "./ProfileImage";
import Uploading from "../common/spinners/SmallLoader";
import { CiEdit } from "react-icons/ci";
import Cookies from "js-cookie";
import UserTopbar from "../user/UserTopbar";
import uploadImage from "@/app/utils/upload-image";

type Props = {
  user: { name: string; email: string; avatar: string };
};

const ProfileInfo = ({ user }: Props) => {
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [logout, setLogout] = useState(false);
  const [updateUser, {}] = useUpdateUserMutation();
  const [updateAvatar, {}] = useUpdateAvatarMutation({});
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const logoutHandler = async () => {
    Cookies.remove("token");
    setLogout(true);
    await signOut();
    toast.success("Logout successfull");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setImage(e.target.files[0]);
    }
  };
  const handleImageUpload = async () => {
    setUploading(true);
    const imgUrl = await uploadImage(image);
    if (imgUrl) {
      setImageUrl(imgUrl);
    }
    setUploading(false);
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
    <div className="flex flex-col items-center h-screen">
      <UserTopbar />
      <h1 className={`${styles.title} mt-4`}>Profile</h1>
      <div className="mt-5 relative w-[120px] h-[120px] rounded-full overflow-hidden">
        {uploading ? <Uploading /> : <ProfileImage avatar={user?.avatar} />}
        <label
          htmlFor="fileInput"
          className="cursor-pointer absolute bottom-1 left-[50%] translate-x-[-50%] text-gray-100 font-semibold"
        >
          Change
        </label>
        <input
          id="fileInput"
          type="file"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <div className="relative">
          <input
            className="p-2 w-full rounded-md dark:bg-gray-700"
            type="text"
            defaultValue={name}
            onChange={handleNameChange}
          />
          <CiEdit className="absolute right-2 bottom-2" />
        </div>
        <input
          className="p-2 w-full rounded-md dark:bg-gray-700"
          type="text"
          defaultValue={user.email}
          readOnly
        />
        <button onClick={handleUpdateUser} className={`${styles.primary}`}>
          Update
        </button>
        <button onClick={logoutHandler} className={`${styles.primary}`}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
