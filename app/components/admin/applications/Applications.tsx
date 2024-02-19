"use client";
import { useGetApplicationsQuery } from "@/redux/features/user/userApi";
import CustomTable from "../../common/CustomTable";

const Applications = () => {
  const { data } = useGetApplicationsQuery({});

  const applicationsData = data?.applications;
  let applications = [];

  if (applicationsData) {
    applications = applicationsData.map((application: any) => ({
      _id: application._id,
      name: application.name,
      email: application.email,
      status: application.applicationStatus,
    }));
  }
  return (
    <div className="min-h-screen">
      <CustomTable
        data={applications}
        tableFor={"courses"}
        fields={["name", "email", "status"]}
        url="applications"
      />
    </div>
  );
};

export default Applications;
