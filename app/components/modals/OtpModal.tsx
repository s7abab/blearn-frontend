"use client";
import { styles } from "../../styles/style";
import React, { useState, useRef } from "react";

interface Props {}

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const OtpModal = (props: Props) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
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
    console.log("test");
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
      <div className="flex justify-center items-center">
        <button className={`${styles.primary}`} onClick={verificationHandler}>
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
