import { styles } from "@/app/styles/style";
import React from "react";

type Props = {};

const CourseManagement = (props: Props) => {
  return (
    <>
        <button className={`${styles.primary} w-[200px] mt-2`}>
          Add Course
        </button>
        <h1 className="mt-10 text-lg font-Poppins">My Courses</h1>
    </>
  );
};

export default CourseManagement;
