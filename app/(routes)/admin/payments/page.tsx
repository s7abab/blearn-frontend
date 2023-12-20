"use client";

import WithdrawalsForAdmin from "@/app/components/admin/payments/WithdrawalsForAdmin";
import { useGetPendingWithdrawalsQuery } from "@/redux/features/payment/paymentApi";
const PaymentsPage = () => {
  const { data } = useGetPendingWithdrawalsQuery({});

  const withdrawals = data?.withdrawals;

  return <WithdrawalsForAdmin withdrawals={withdrawals} />;
};

export default PaymentsPage;
