import Header from "@/app/components/ui/Header";
import Sidebar from "@/app/components/ui/InstructorSidebar";
import { styles } from "@/app/styles/style";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const CourseManagement = (props: Props) => {
  return (
    <>
      <button className={`${styles.primary} w-[200px] mt-2`}>Add Course</button>
      <h1 className="mt-10 text-lg font-Poppins">My Courses</h1>
    </>
  );
};

export default CourseManagement;
