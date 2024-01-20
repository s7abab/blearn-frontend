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
        <div className="border border-blue-700 text-blue-700 flex justify-center items-center h-[50px] w-full shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaInfoCircle size={25} />
              <p className="ml-2 text-sm text-white">{content}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-sm font-semibold focus:outline-none ml-3"
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
