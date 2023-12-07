"use client";
import { styles } from "@/app/styles/style";
import React, { useState } from "react";
import ModuleCard from "../modules/ModuleCard";
import CustomModal from "../modals/CustomModal";
import AddModule from "./AddModule";
import { useGetModulesQuery } from "@/redux/features/course/courseApi";
import { IModule } from "@/@types/course/course.types";
import { useSelector } from "react-redux";

type Props = {};

const Modules = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { courseId } = useSelector((state: any) => state.course);
  const { isLoading, data } = useGetModulesQuery(courseId);
  const modules: IModule[] = data?.modules;
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={`${styles.title}`}>Modules</div>
      {open && (
        <>
          <CustomModal
            modalHeader="Add Module"
            isOpen={open}
            onClose={handleOpen}
          >
            <AddModule closeModal={handleOpen} />
          </CustomModal>
        </>
      )}

      <div>
        <button
          onClick={handleOpen}
          className="bg-gradient-to-br from-[#0c214d] to-[#051536] p-3 rounded-md shadow-lg font-Josefin hover:from-[#11295d] hover:to-[#0c214d] text-dark-primary  cursor-pointer"
        >
          Add Module
        </button>
        <div className="mt-3 flex flex-col gap-2">
          {modules?.map((module,index) => (
            <div key={module?._id}>
              <ModuleCard module={module} index={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Modules;
