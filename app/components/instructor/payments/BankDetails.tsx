"use client";
import { IBankDetails } from "@/@types/interfaces/user/user.interface";
import { validateBankdetails } from "@/app/utils/validations/bankdetails.validation";
import { useUpdateBankdetailsMutation } from "@/redux/features/user/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface Props {}

const BankDetails = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  const [bankDetails, setBankDetails] = useState<IBankDetails>({
    name: user?.bankDetails?.name,
    accountNumber: user?.bankDetails?.accountNumber,
    ifscCode: user?.bankDetails?.ifscCode,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const [updateBankDetails, { data, isLoading, isSuccess }] =
    useUpdateBankdetailsMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const validation = validateBankdetails(bankDetails);
    if (!validation.success) {
      setErrorMsg(validation.message || "Validation failed");
    } else {
      setErrorMsg("");
      console.log("Bank details are valid:", bankDetails);
    }
    updateBankDetails({ bankDetails });
  };

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        toast.success(data.message);
      } else {
        toast.success("Bank details updated successfully");
      }
    }
  }, [isSuccess, data]);

  return (
    <div className="flex flex-col p-5">
      <label htmlFor="">Name</label>
      <input
        type="text"
        onChange={handleInputChange}
        name="name"
        value={bankDetails?.name}
        className="p-2 rounded-md"
      />
      <label htmlFor="">Ac No</label>
      <input
        type="text"
        name="accountNumber"
        onChange={handleInputChange}
        value={bankDetails?.accountNumber}
        className="p-2 rounded-md"
      />
      <label htmlFor="">Ifsc</label>
      <input
        type="text"
        name="ifscCode"
        onChange={handleInputChange}
        value={bankDetails?.ifscCode}
        className="p-2 rounded-md"
      />
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <button
        onClick={handleSubmit}
        className="mt-4 rounded-md p-2 bg-gray-800"
      >
        Submit
      </button>
    </div>
  );
};

export default BankDetails;
