"use client";
import { styles } from "@/app/styles/style";
import { useUpdateWithdrawalStatusMutation } from "@/redux/features/payment/paymentApi";
import { useGetSingleInstructorQuery } from "@/redux/features/user/userApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  userId: string;
  handleOpen: () => void;
}

const ViewWithdrawal = ({ handleOpen, userId }: Props) => {
  const { data } = useGetSingleInstructorQuery(userId);
  const bankDetails = data?.user?.bankDetails;
  const [updateWithdraw, { isSuccess, error }] =
    useUpdateWithdrawalStatusMutation();

  const handleWithdraw = () => {
    updateWithdraw(userId);
    handleOpen();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Marked as paid");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <div className="p-6">
      <p className="text-gray-600 mb-2">Holder Name: {bankDetails?.name}</p>
      <p className="text-gray-600 mb-2">
        Account Number: {bankDetails?.accountNumber}
      </p>
      <p className="text-gray-600 mb-2">IFSC Code: {bankDetails?.ifscCode}</p>
      <button
        onClick={handleWithdraw}
        className={`${styles.blue_btn} px-4 mt-2`}
      >
        Mark As Paid
      </button>
    </div>
  );
};

export default ViewWithdrawal;
