"use client";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
interface AlertBoxProps {
  content: string;
}

const AlertBox: React.FC<AlertBoxProps> = ({ content }) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      {open && (
        <div className="fixed bottom-1 right-1  border border-blue-700 text-blue-700 px-4 py-2 shadow-md w-[350px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaInfoCircle size={25} />
              <p className="ml-2 text-sm text-white">{content}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-sm font-semibold focus:outline-none"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertBox;
