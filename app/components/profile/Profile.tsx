import React from "react";
import { styles } from "@/app/styles/style";
import { CgProfile } from "react-icons/cg";
import { CiCamera } from "react-icons/ci";

type Props = {
  user: { name: string; email: string };
};

const ProfileInfo = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={`${styles.title} mt-5`}>Profile</h1>
      <div className="mt-5 relative">
        <CgProfile size={100} />
        <CiCamera
          size={25}
          className="absolute bottom-0 right-0 hover:scale-105 transition duration-100 ease-in-out cursor-pointer "
        />
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <input
          className="p-2 w-full rounded-md"
          type="text"
          defaultValue={user.name}
        />
        <input
          className="p-2 w-full rounded-md"
          type="text"
          defaultValue={user.email}
        />
        <button className={`${styles.primary}`}>Update</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
