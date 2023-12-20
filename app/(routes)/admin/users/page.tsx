"use client";
import { IUserDataForTable } from "@/@types/interfaces/user/user.interface";
import CustomTable from "@/app/components/common/CustomTable";
import Loader from "@/app/components/common/spinners/Loader";
import { useGetUsersQuery } from "@/redux/features/user/userApi";

const UserDetailsAdmin = () => {
  const { data, isLoading } = useGetUsersQuery({});
  const users: IUserDataForTable[] = data?.users;
  return (
    <div className="h-screen mt-5">
      {isLoading ? (
        <Loader />
      ) : (
        <CustomTable
          data={users}
          tableFor="user"
          fields={["name", "email"]}
          url="/admin/users"
        />
      )}
    </div>
  );
};

export default UserDetailsAdmin;
