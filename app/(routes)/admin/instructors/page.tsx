"use client";
import { IUserDataForTable } from "@/@types/interfaces/user/user.interface";
import CustomTable from "@/app/components/common/CustomTable";
import Loader from "@/app/components/common/spinners/Loader";
import { useGetInstructorsQuery } from "@/redux/features/user/userApi";

const InstructorsList = () => {
  const { data, isLoading } = useGetInstructorsQuery({});
  const instructors: IUserDataForTable[] = data?.instructors;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="h-screen mt-5">
      <CustomTable
        data={instructors}
        fields={["name", "email"]}
        tableFor="instructors"
        url="/admin/instructors"
      />
    </div>
  );
};

export default InstructorsList;
