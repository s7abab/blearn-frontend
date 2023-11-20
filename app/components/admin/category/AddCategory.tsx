"use client";
import React, { useEffect, useState } from "react";
import { styles } from "@/app/styles/style";
import { useAddCategoryMutation } from "@/redux/features/course/courseApi";
import toast from "react-hot-toast";
import Loader from "../../spinners/Loader";

type Props = {
  onClose: ()=> void
};

const AddCategory = ({onClose}: Props) => {
  const [name, setName] = useState("");
  const [addCategory, { isSuccess, isError, isLoading }] =
    useAddCategoryMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddCategory = async () => {
    await addCategory({ name });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category added");
      onClose();
      
    }
  }, [isSuccess, onClose]);
  return (
    <div>
      <h1 className={styles.title}> Add Category</h1>
      <div className="flex flex-col">
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Category name"
          className="p-2 rounded-md mt-4 mb-2 bg-slate-200 text-light-primary"
        />
        {isLoading && (
          <Loader />
        )}
        <button
          onClick={handleAddCategory}
          className={`${styles.secondary_Btn} mt-4`}
        >
          ADD
        </button>
        {isError && (
          <p className="text-red-500 mt-2">Error: Failed to add category.</p>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
