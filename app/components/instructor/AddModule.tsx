"use client";
import { IModule } from "@/@types/course/course.types";
import { styles } from "@/app/styles/style";
import { useAddModuleMutation } from "@/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
  closeModal: () => void;
};

const AddModule = ({ closeModal }: Props) => {
  const [addModule, { isSuccess, error }] = useAddModuleMutation();
  const { courseId } = useSelector((state: any) => state.course);
  const [moduleData, setModuleData] = useState<IModule>({
    courseId: courseId,
    title: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModuleData({
      ...moduleData,
      [name]: value,
    });
  };

  const handleAddModule = async () => {
    await addModule(moduleData);
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
    <div className="p-6 ">
      <p className="font-Poppins">Title</p>{" "}
      <input
        onChange={handleChange}
        value={moduleData.title}
        name="title"
        className="p-2 w-full rounded-md mb-2"
        type="text"
      />
      <button
        onClick={handleAddModule}
        className={`${styles.secondary_Btn} w-full mt-5`}
      >
        Add
      </button>
    </div>
  );
};

export default AddModule;
