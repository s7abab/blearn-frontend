"use client";
import { useGetRevenueOfCourseQuery } from "@/redux/features/payment/paymentApi";
import { useSelector } from "react-redux";
import Loader from "../common/spinners/Loader";
import CourseRevenueChart from "../charts/CourseRevenueChart";
import { styles } from "@/app/styles/style";
import { GiDuration } from "react-icons/gi";
import { FaVideo } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import EnrolledUsers from "./EnrolledUsers";

const CourseDashboard = () => {
  const { course } = useSelector((state: any) => state.course);
  const { data, isLoading } = useGetRevenueOfCourseQuery({
    courseId: course?._id,
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen">
      <div className="h-[500px]">
        <div className="flex gap-2 mt-5">
          <div className="bg-gradient-to-br from-[#0c214d] to-[#0b063f] p-4 rounded-md shadow-lg  w-1/3 flex px-4 items-center gap-3 font-Josefin">
            <FaPeopleGroup className="text-green-600" /> 
            <h1>Total Enrolls</h1>
            <h1 className="">{course?.enrolledUsers?.length}</h1>
          </div>  
          <div className="bg-gradient-to-br from-[#0c214d] to-[#0b063f] p-4 rounded-md shadow-lg  w-1/3 flex px-4 items-center gap-3 font-Josefin">
            <FaVideo className="text-orange-600" />
            <h1>Total Lessons</h1>
            <h1 className="">{course?.totalLessons}</h1>
          </div>
          <div className="bg-gradient-to-br from-[#0c214d] to-[#0b063f] p-4 rounded-md shadow-lg  w-1/3 flex px-4 items-center gap-3 font-Josefin">
            <GiDuration className="text-violet-600" />
            <h1>Total Duration</h1>
            <h1 className="">{course?.duration}</h1>
          </div>
        </div>
        <div>
          <h1 className={styles.title}>Revenue</h1>
          <CourseRevenueChart data={data?.revenue} />
        </div>
        <div>
          <h1 className={styles.title}>Enrolled Users</h1>
          <EnrolledUsers courseId={course?._id} />
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
