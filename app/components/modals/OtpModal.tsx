"use client";
import { useSelector } from "react-redux";
import { styles } from "../../styles/style";
import React, { useState, useRef, useEffect } from "react";
import {
  useActivationMutation,
  useRegisterMutation,
} from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  data: any;
}

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const OtpModal = ({ data }: Props) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [time, setTime] = useState(60);
  const [register, {}] = useRegisterMutation();
  const route = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      route.push("/login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log(error);
      }
    }
  }, [isSuccess, error, route]);

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);

    if (value.length > 1) {
      return;
    }
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Resend OTP
  const resendOTPHandler = async () => {
    await register(data);
    setTime(60);
    toast.success("Your otp has been sent");
  };
  // Countdown timer effect
  useEffect(() => {
    if (time > 0) {
      const timerInterval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [time]);
  return (
    <div className="800px:w-[380px] 400px:w-[320px] mx-auto p-10 bg-gray-400 dark:bg-gray-900 rounded-md shadow-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 ">
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="flex gap-4 justify-center items-center">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            ref={inputRefs[index]}
            className={`text-center font-Poppins font-[600] w-[55px] h-[55px] bg-transparent border-[3px] rounded-2xl  text-light-primary dark:text-dark-primary ${
              invalidError
                ? "border-red-700"
                : "dark:border-dark-primary border-light-primary"
            }`}
          />
        ))}
      </div>
      <br />
      <div className="flex justify-center items-center flex-col">
        <button className={`${styles.primary}`} onClick={verificationHandler}>
          Verify OTP
        </button>
        <h1 className="mt-2 text-gray-900 cursor-pointer font-semibold">
          {time <= 0 ? (
            <span onClick={resendOTPHandler}>Resend OTP</span>
          ) : (
            `Resend otp in ${time}`
          )}
        </h1>
      </div>
    </div>
  );
};

export default OtpModal;
