import React from "react";
import SmallLoader from "../../common/spinners/SmallLoader";
import { styles } from "@/app/styles/style";

type Props = {
  name: string;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  error: any;
  errMsg: any;
};

const CategoryInput = ({
  name,
  isLoading,
  handleChange,
  handleSubmit,
  error,
  errMsg,
}: Props) => {
  return (
    <div className="p-6 pb-8">
      <div className="flex flex-col">
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Category name"
          className="p-2 rounded-md mt-4 mb-2 bg-slate-200 text-light-primary"
        />
        {isLoading && <SmallLoader />}
        <button
          onClick={handleSubmit}
          className={`${styles.secondary_Btn} mt-4`}
        >
          ADD
        </button>
        {error && <p className="text-red-600 mt-2">{errMsg}</p>}
      </div>
    </div>
  );
};

export default CategoryInput;
