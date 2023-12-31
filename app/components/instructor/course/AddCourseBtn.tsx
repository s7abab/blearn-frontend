"use client";
import { styles } from "@/app/styles/style";
import { useRouter } from "next/navigation";

const AddCourseBtn = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/instructor/courses/add-course")}
      className={`${styles.blue_btn} w-[200px] mt-2`}
    >
      Add Course
    </button>
  );
};

export default AddCourseBtn;
