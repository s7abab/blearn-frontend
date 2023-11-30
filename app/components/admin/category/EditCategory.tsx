"use client";
import React, { useEffect, useState } from "react";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import { useEditCategoryMutation } from "@/redux/features/course/courseApi";
import SmallLoader from "../../spinners/SmallLoader";

type Props = {
  onClose: () => void;
  categoryId: string;
};

const EditCategory = ({ onClose, categoryId }: Props) => {
  const [name, setName] = useState("");
  const [editCategory, { isLoading, isSuccess, isError }] =
    useEditCategoryMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEditCategory = async () => {
    await editCategory({ name, categoryId });
    setName("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category Edited");
      onClose();
    }
  }, [isSuccess, onClose]);
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
        {isLoading && <SmallLoader />}{" "}
        <button
          onClick={handleEditCategory}
          className={`${styles.secondary_Btn} mt-4`}
        >
          EDIT
        </button>
        {isError && (
          <p className="text-red-800 mt-2">Error: Failed to edit category</p>
        )}
      </div>
    </div>
  );
};

export default EditCategory;
