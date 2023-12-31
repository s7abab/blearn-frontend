"use client";
import { styles } from "@/app/styles/style";
import React, { useState } from "react";
import CustomModal from "../../common/modals/CustomModal";
import AddModule from "./AddModule";
import { useGetModulesQuery } from "@/redux/features/course/courseApi";
import { useSelector } from "react-redux";
import { IModule } from "@/@types/interfaces/course/module.interface";
import AlertBox from "../../common/AlertBox";
import ModulesAndLessons from "../../courses/modules/ModulesAndLessons";

const Modules = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { course } = useSelector((state: any) => state.course);
  const { data } = useGetModulesQuery(course?._id);

  const modules: IModule[] = data?.modules;
  // Reverse the order of modules
  const reversedModules: IModule[] = modules ? [...modules]?.reverse() : [];

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={`${styles.title}`}>Modules </div>
      {open && (
        <>
          <CustomModal
            modalHeader="Add Module"
            isOpen={open}
            onClose={handleOpen}
          >
            <AddModule edit={false} closeModal={handleOpen} />
          </CustomModal>
        </>
      )}

      <div>
        {course?.totalLessons < 5 && (
          <AlertBox
            content={`Minimum 5 lessons are required to list this course`}
          />
        )}

        <button
          onClick={handleOpen}
          className="bg-gradient-to-br from-[#0c214d] to-[#051536] p-3 rounded-md shadow-lg font-Josefin hover:from-[#11295d] hover:to-[#0c214d] text-dark-primary  cursor-pointer border-r-2 border-r-gray-100"
        >
          Add Module
        </button>
        <div className="mt-3 flex flex-col gap-2">
          {reversedModules?.map((module, index) => (
            <div key={index}>
              <ModulesAndLessons edit={true} module={module} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Modules;
