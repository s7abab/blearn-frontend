"use client";
import { styles } from "@/app/styles/style";
import ProfileImage from "../profile/ProfileImage";
import { useBlockUserMutation } from "@/redux/features/user/userApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IUser } from "@/@types/interfaces/user/user.interface";

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
    <div className="flex flex-col items-center h-screen">
      <h1 className={`${styles.title} mt-8`}>Details</h1>
      <div className="mt-5 relative w-[120px] h-[120px] rounded-full overflow-hidden">
        <ProfileImage avatar={user?.avatar} />
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
      <button
        onClick={handleBlockUser}
        className={`${styles.secondary_Btn} mt-4 w-1/5`}
      >
        {user?.isBlock ? "Unblock" : "Block"}
      </button>
    </div>
  );
};

export default UserDetails;
