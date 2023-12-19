"use client";
import { useState } from "react";
import PaymentDetails from "./PaymentDetails";

const InstructorPayments = () => {
  const [bankModalOpen, setBankModalOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const handleBankModal = () => {
    setBankModalOpen(!bankModalOpen);
  };
  const handleConfirmModal = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  return (
    <PaymentDetails
      bankModalOpen={bankModalOpen}
      confirmModalOpen={confirmModalOpen}
      handleBankModal={handleBankModal}
      handleConfirmModal={handleConfirmModal}
    />
  );
};

export default InstructorPayments;
