"use client";
import { useGetRevenueOfCourseQuery } from "@/redux/features/payment/paymentApi";
import { useSelector } from "react-redux";
import Loader from "../../common/spinners/Loader";
import CourseRevenueChart from "../../charts/CourseRevenueChart";
import { styles } from "@/app/styles/style";
import EnrolledUsers from "../EnrolledUsers";
import CourseData from "./CourseData";

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
        <CourseData
          enrolls={course?.enrolledUsers?.length}
          duration={course?.duration}
          total={course?.totalLessons}
        />
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
