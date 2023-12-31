"use client";
import React, { useEffect, useState } from "react";
import { useAddCategoryMutation } from "@/redux/features/course/courseApi";
import toast from "react-hot-toast";
import { validateCategoryName } from "@/app/utils/validations/category.validation";
import CategoryInput from "./CategoryInput";

interface Props  {
  onClose: () => void;
};

const AddCategory = ({ onClose }: Props) => {
  const [name, setName] = useState("");
  const [addCategory, { isSuccess, error, isLoading }] =
    useAddCategoryMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddCategory = async () => {
    if (validateCategoryName({ name })) {
      await addCategory({ name });
    }
  };
  let errMsg;
  if (error) {
    if ("status" in error) {
      errMsg = errMsg =
        "error" in error
          ? error.error
          : JSON.stringify((error.data as any)?.message);
    }
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Category added");
      onClose();
    }
  }, [isSuccess, onClose]);
  return (
    <CategoryInput
      name={name}
      isLoading={isLoading}
      handleChange={handleChange}
      handleSubmit={handleAddCategory}
      errMsg={errMsg}
      error={error}
    />
  );
};

export default AddCategory;
