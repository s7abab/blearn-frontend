import React from "react";

type Props = {
  confirm: () => void;
  close:()=>void
};

const ConfirmBox = ({ confirm, close }: Props) => {
  return (
    <div className="bg-gray-900 p-5 rounded-md outline-none ">
      <h1 className="text-center">Are you sure you want to delete?</h1>
      <div className="flex mt-5 justify-center gap-4">
        <button onClick={close} className="bg-gray-800 p-2 rounded-md">Cancel</button>
        <button onClick={confirm} className="bg-red-800 p-2 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmBox;
