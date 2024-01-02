"use client";
import { styles } from "@/app/styles/style";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalHeader?: string;
  top?: number;
}

const CustomModal = ({
  isOpen,
  onClose,
  children,
  modalHeader,
  top = 50,
}: Props) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-[1000]"
        onClick={onClose}
      ></div>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={` w-[380px] outline-none  mx-auto absolute top-[${top}%]  left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-[1001] shadow-xl rounded-lg ${
          modalHeader
            ? "dark:bg-gradient-to-tr dark:from-gray-950 dark:to-gray-900 bg-gray-500"
            : "bg-white"
        }`}
      >
        {modalHeader && <h1 className={styles.title}>{modalHeader}</h1>}
        <button
          onClick={onClose}
          className="font-semibold cursor-pointer fixed top-2 right-1 text-2xl z-20 text-dark-primary mx-2"
        >
          <IoIosCloseCircle />
        </button>
        <div>{children}</div>
      </motion.div>
    </>
  );
};

export default CustomModal;
