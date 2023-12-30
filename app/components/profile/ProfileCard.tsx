import React from "react";
import UserTopbar from "../user/UserTopbar";
import { styles } from "@/app/styles/style";
import ProfileImage from "./ProfileImage";
import SmallLoader from "../common/spinners/SmallLoader";
import { CiEdit } from "react-icons/ci";

type Props = {
  user: any;
  handleUpdateUser: () => void;
  isAdmin?: boolean;
  name: string;
  uploading?: boolean;
  handleImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  logoutHandler?: () => void;
};

const ProfileCard = ({
  uploading,
  user,
  name,
  handleImageChange,
  handleNameChange,
  handleUpdateUser,
  logoutHandler,
  isAdmin,
}: Props) => {
  return (
    <div className="flex flex-col items-center h-screen">
      {!isAdmin && <UserTopbar />}
      <h1 className={`${styles.title} mt-4`}>Profile</h1>
      <div className="mt-5 relative w-[120px] h-[120px] rounded-full overflow-hidden">
        {uploading ? <SmallLoader /> : <ProfileImage avatar={user?.avatar} />}
        <label
          htmlFor="fileInput"
          className="cursor-pointer absolute bottom-1 left-[50%] translate-x-[-50%] text-gray-100 font-semibold"
        >
          {isAdmin ? "" : "Change"}
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
          {!isAdmin && <CiEdit className="absolute right-2 bottom-2" />}
        </div>
        <input
          className="p-2 w-full rounded-md dark:bg-gray-700"
          type="text"
          defaultValue={user?.email}
          readOnly
        />
        <button onClick={handleUpdateUser} className={`${styles.primary}`}>
          {isAdmin ? "Block" : "Update"}
        </button>
        {!isAdmin && (
          <button onClick={logoutHandler} className={`${styles.primary}`}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
