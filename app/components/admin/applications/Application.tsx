"use client";

import {
  useChangeStatusOfApplicationMutation,
  useGetApplicationQuery,
} from "@/redux/features/user/userApi";
import { useParams, useRouter } from "next/navigation";
import ProfileImage from "../../profile/ProfileImage";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Application = () => {
  const router = useRouter()

  const { id } = useParams<any>();
  const { data } = useGetApplicationQuery(id);
  const application = data?.application;

  const [approveApplication, { isSuccess, isLoading, error }] =
    useChangeStatusOfApplicationMutation();
  // change status of application
  const handleApprove = async (status: string) => {
    await approveApplication({ userId:id, status });
    router.push("/admin/applications")
  };

  useEffect(() => {
    if (isSuccess) toast.success("Application status updated successfully");
    if (error) toast.error("Something went wrong");
  }, [isSuccess, error]);
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-md relative">
          <ProfileImage avatar={application?.avatar} />
        </div>
        <p className="text-2xl font-bold">{application?.name}</p>
        <p className="text-gray-600">{application?.email}</p>
        <p className="text-sm capitalize">{application?.status}</p>
      </div>

      <div className="flex justify-center flex-col items-center">
        <h1 className="text-xl font-bold font-Poppins mt-5">Document</h1>
        <div className="w-72 h-72 rounded-md overflow-hidden shadow-md relative">
          <ProfileImage avatar={application?.docUrl} />
        </div>
      </div>

      <div className="flex justify-center space-x-2 mt-2">
        <button
          onClick={() => handleApprove("approved")}
          disabled={isLoading}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Approve
        </button>
        <button
          onClick={() => handleApprove("rejected")}
          disabled={isLoading}
          className="px-7 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default Application;
