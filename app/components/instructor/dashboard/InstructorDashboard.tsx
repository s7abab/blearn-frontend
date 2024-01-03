"use client";
import { styles } from "@/app/styles/style";
import CourseRevenueChart from "../../charts/CourseRevenueChart";
import { useGetCourseDataForInstructorQuery } from "@/redux/features/course/courseApi";
import CourseData from "./CourseData";
import InstructorCommunity from "../community/InstructorCommunity";
import { useInstructorTotalRevenueQuery } from "@/redux/features/payment/paymentApi";

const InstructorDashboard = () => {
  const { data } = useInstructorTotalRevenueQuery({});
  const { data: courseData } = useGetCourseDataForInstructorQuery({});
  const course = courseData?.courseData;

  return (
    <div className="min-h-screen">
      <div>
        <CourseData
          enrolls={course?.totalEnrolled}
          duration={course?.totalCompletedUsers}
          total={course?.totalCourses}
          isCourse={true}
        />
        <h1 className={styles.title}>Revenue</h1>
        <CourseRevenueChart data={data?.data} />
        <h1 className={styles.title}>Communities</h1>
        <InstructorCommunity isCreate={false} />
      </div>
    </div>
  );
};

export default InstructorDashboard;
