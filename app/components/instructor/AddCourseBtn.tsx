"use client";
import { styles } from "@/app/styles/style";
import { useRouter } from "next/navigation";

type Props = {};

const AddCourseBtn = (props: Props) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/instructor/courses/add-course")}
      className={`${styles.primary} w-[200px] mt-2`}
    >
      Add Course
    </button>
  );
};

export default AddCourseBtn;
