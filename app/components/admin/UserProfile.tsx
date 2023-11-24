"use client";
import { styles } from "@/app/styles/style";
import ProfileImage from "../profile/ProfileImage";

type Props = {
  user: { name: string; email: string };
};

const ProfileInfo = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className={`${styles.title} mt-8`}>Profile</h1>
      <div className="mt-5 relative w-[120px] h-[120px] rounded-full overflow-hidden">
        <ProfileImage />
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <div className="relative">
          <input
            className="p-2 w-full rounded-md bg-gray-700"
            type="text"
            defaultValue={user?.name}
            readOnly
          />
        </div>
        <input
          className="p-2 w-full rounded-md bg-gray-700"
          type="text"
          defaultValue={user?.email}
          readOnly
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
