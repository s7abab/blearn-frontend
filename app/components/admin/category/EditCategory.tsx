"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useEditCategoryMutation } from "@/redux/features/course/courseApi";
import CategoryInput from "./CategoryInput";

interface Props {
  onClose: () => void;
  categoryId: string;
}

const EditCategory = ({ onClose, categoryId }: Props) => {
  const [name, setName] = useState("");
  const [editCategory, { isLoading, isSuccess, error }] =
    useEditCategoryMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEditCategory = async () => {
    await editCategory({ name, categoryId });
    setName("");
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
      toast.success("Category Edited");
      onClose();
    }
  }, [isSuccess, onClose]);
  return (
    <CategoryInput
      name={name}
      isLoading={isLoading}
      handleChange={handleChange}
      handleSubmit={handleEditCategory}
      errMsg={errMsg}
      error={error}
    />
  );
};

export default EditCategory;
