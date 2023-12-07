"use client";
import { styles } from "@/app/styles/style";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalHeader?: string;
};

const CustomModal = ({ isOpen, onClose, children, modalHeader }: Props) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-40"
        onClick={onClose}
      ></div>
      <div
        className={` w-[380px] outline-none  mx-auto absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-50 shadow-xl rounded-lg ${
          modalHeader
            ? "dark:bg-gradient-to-tr dark:from-gray-950 dark:to-gray-900 bg-gray-500"
            : "bg-white"
        }`}
      >
        {modalHeader && <h1 className={styles.title}>{modalHeader}</h1>}
        <button
          onClick={onClose}
          className="font-semibold cursor-pointer fixed top-1 right-2 text-2xl z-20 text-dark-primary mx-2"
        >
          X
        </button>
        <div>{children}</div>
      </div>
    </>
  );
};

export default CustomModal;
