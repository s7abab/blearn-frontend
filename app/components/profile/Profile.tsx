"use client";
import React, { useState } from "react";
import { styles } from "@/app/styles/style";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import ProfileImage from "./ProfileImage";
import { CiCamera } from "react-icons/ci";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { firebaseDB } from "@/app/utils/firebase";

type Props = {
  user: { name: string; email: string };
};

const ProfileInfo = ({ user }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const logoutHandler = async () => {
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
    const imgRef = ref(firebaseDB, `profile/${v4()}`);
    if (image != null) {
      try {
        const snapshot = await uploadBytes(imgRef, image);
        // After successful upload, get the download URL of the image
        const downloadURL = await getDownloadURL(imgRef);
        setImageUrl(downloadURL);
        toast.success("Image uploaded successfully:");
        console.log("Image uploaded successfully:", snapshot);
      } catch (error: any) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image:");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={`${styles.title} mt-5`}>Profile</h1>
      <div className="mt-5 relative">
        <ProfileImage />
        <CiCamera
          onClick={handleImageUpload}
          size={25}
          className="absolute bottom-0 right-0 hover:scale-105 transition duration-100 ease-in-out cursor-pointer "
        />
        <input type="file" onChange={handleImageChange} />
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <input
          className="p-2 w-full rounded-md bg-gray-700"
          type="text"
          defaultValue={user.name}
        />
        <input
          className="p-2 w-full rounded-md bg-gray-700"
          type="text"
          defaultValue={user.email}
        />
        <button className={`${styles.primary}`}>Update</button>
        <button onClick={logoutHandler} className={`${styles.primary}`}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
