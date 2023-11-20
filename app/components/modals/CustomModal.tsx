import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const CustomModal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="800px:w-[380px] 400px:w-[320px] mx-auto rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 bg-gray-600 p-5 shadow-xl">
      <button onClick={onClose} className="font-semibold cursor-pointer">X</button>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default CustomModal;
