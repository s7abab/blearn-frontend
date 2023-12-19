import React from "react";

type Props = {
  confirm: () => void;
  close: () => void;
  title: string;
  isDelete: boolean;
};

const ConfirmBox = ({ confirm, close, title, isDelete }: Props) => {
  return (
    <div className="bg-gray-900 p-5 rounded-md outline-none ">
      <h1 className="text-center">{title}</h1>
      <div className="flex mt-5 justify-center gap-4">
        <button onClick={close} className="bg-gray-800 p-2 rounded-md">
          Cancel
        </button>
        <button
          onClick={confirm}
          className={`${
            isDelete ? "bg-red-800" : "bg-green-800"
          } p-2 rounded-md`}
        >
          {isDelete ? "Delete" : "Confirm"}
        </button>
      </div>  
    </div>
  );
};

export default ConfirmBox;
