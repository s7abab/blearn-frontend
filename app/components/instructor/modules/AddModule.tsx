"use client";
import {
  IAddModule,
  IModule,
} from "@/@types/interfaces/course/module.interface";
import {
  useAddModuleMutation,
  useEditModuleMutation,
} from "@/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ModuleForm from "./ModuleForm";

interface Props {
  closeModal: () => void;
  edit: boolean;
  data?: IModule;
}

const AddModule = ({ closeModal, edit, data }: Props) => {
  const [addModule, { isSuccess, error }] = useAddModuleMutation();
  const { course } = useSelector((state: any) => state.course);
  const [moduleData, setModuleData] = useState<IAddModule>({
    courseId: course?._id,
    title: data?.title || "",
  });
  const [editModule, {}] = useEditModuleMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModuleData({
      ...moduleData,
      [name]: value,
    });
  };
// add module
  const handleAddModule = async () => {
    await addModule(moduleData);
    closeModal();
  };
// edit module
  const handleEditModule = async () => {
    await editModule(moduleData);
    closeModal();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Module added");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <ModuleForm
      edit={edit}
      handleAddModule={handleAddModule}
      handleEditModule={handleEditModule}
      handleChange={handleChange}
      moduleData={moduleData}
    />
  );
};

export default AddModule;
