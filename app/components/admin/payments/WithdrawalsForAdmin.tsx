"use client";
import { styles } from "@/app/styles/style";
import { formatDate } from "@/app/utils/date-convertor";
import { useState } from "react";
import CustomModal from "../../common/modals/CustomModal";
import ViewWithdrawal from "./ViewWithdrawal";

interface Props {
  withdrawals: any[];
}

const WithdrawalsForAdmin = ({ withdrawals }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClick = (id: string) => {
    setUserId(id);
    handleOpen();
  };
  return (
    <div className="container mx-auto px-4 py-8">
      {open && (
        <CustomModal
          isOpen={open}
          onClose={handleOpen}
          modalHeader="Bank Details"
        >
          <ViewWithdrawal handleOpen={handleOpen} userId={userId} />
        </CustomModal>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <h1 className={styles.title}>Payments</h1>
        {withdrawals?.map((bank) => (
          <div key={bank.id} className={styles.blue_btn}>
            <h2 className="text-lg font-semibold mb-2">{bank.name}</h2>
            <p className="text-gray-600 mb-2">Date: {formatDate(bank?.date)}</p>
            <p className="text-gray-700 font-bold">
              Withdrawal Amount: ${bank?.amount}
            </p>
            <button
              onClick={() => handleClick(bank.userId)}
              className="bg-blue-400 p-[3px] rounded-md px-3 text-[15px] my-1 flex items-center text-center hover:bg-blue-500 shadow-md mt-2"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithdrawalsForAdmin;
