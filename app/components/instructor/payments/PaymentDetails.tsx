import { styles } from "@/app/styles/style";
import { MdAccountBalanceWallet } from "react-icons/md";
import CustomModal from "../../common/modals/CustomModal";
import BankDetails from "./BankDetails";
import ConfirmBox from "../../common/modals/ConfirmBox";
import {
  useGetWithdrawalsQuery,
  useWithdrawMoneyMutation,
} from "@/redux/features/payment/paymentApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IPaymentHistory } from "@/@types/interfaces/payment/payment.interface";
import { formatDate } from "@/app/utils/date-convertor";

interface Props {
  bankModalOpen: boolean;
  handleConfirmModal: () => void;
  confirmModalOpen: boolean;
  handleBankModal: () => void;
}
const PaymentDetails = ({
  bankModalOpen,
  handleConfirmModal,
  confirmModalOpen,
  handleBankModal,
}: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [withdrawMoney, { isSuccess, data, error }] =
    useWithdrawMoneyMutation();
  const { data: withdrawalsData } = useGetWithdrawalsQuery(user._id);
  const withdrawals: IPaymentHistory = withdrawalsData?.withdrawals;
  const handleWithdraw = async () => {
    await withdrawMoney({});
    handleConfirmModal();
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data]);
  return (
    <div className="mx-auto p-6">
      <CustomModal
        onClose={handleBankModal}
        isOpen={bankModalOpen}
        modalHeader="Bank Details"
      >
        <BankDetails />
      </CustomModal>
      <CustomModal onClose={handleConfirmModal} isOpen={confirmModalOpen}>
        <ConfirmBox
          title="Are you sure you want to withdraw?"
          confirm={handleWithdraw}
          close={handleConfirmModal}
          isDelete={false}
        />
      </CustomModal>
      <h1 className={styles.title}>Payments</h1>
      {/* Total Balance */}
      <div className={styles.blue_btn}>
        <h2 className="text-2xl font-semibold mb-4 flex ">
          <MdAccountBalanceWallet /> Total Balance
        </h2>
        <p className="ml-2 text-3xl font-bold">₹{withdrawals?.balance}</p>
        <div className="flex justify-center gap-3">
          <button onClick={handleConfirmModal} className={styles.blue_btn}>
            Withdraw
          </button>
          <button onClick={handleBankModal} className={styles.blue_btn}>
            Change BankAc
          </button>
        </div>
      </div>
      {/* Payment History */}
      <div className={`${styles.blue_btn} mt-5`}>
        <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
        <ul>
          {withdrawals?.transactions.map((payment) => (
            <li key={payment.txid} className="mb-4">
              <p className="text-lg font-semibold">
                {formatDate(payment?.date)}
              </p>
              <p className="text-gray-600">txid: tx{payment.txid}</p>
              <p className="text-gray-300">Amount: ${payment.amount}</p>
              <p className="text-gray-300">{payment.status}</p>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default PaymentDetails;
