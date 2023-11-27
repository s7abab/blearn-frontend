"use client";
import { styles } from "@/app/styles/style";
import React, { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalHeader: string;
};

const CustomModal = ({ isOpen, onClose, children, modalHeader }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body-overlay");
    } else {
      document.body.classList.remove("body-overlay");
    }
    return () => {
      document.body.classList.remove("body-overlay");
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  return (
    <div className="800px:w-[380px] 400px:w-[320px] mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10  shadow-xl rounded-lg dark:bg-gradient-to-tr dark:from-gray-950 dark:to-gray-900 bg-gray-500 ">
      <h1 className={styles.title}>{modalHeader}</h1>
      <button
        onClick={onClose}
        className="font-semibold cursor-pointer fixed top-1 right-2 text-2xl z-20 text-dark-primary "
      >
        X
      </button>
      <div>{children}</div>
    </div>
  );
};

export default CustomModal;
