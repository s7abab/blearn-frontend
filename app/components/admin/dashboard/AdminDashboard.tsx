"use client";
import { styles } from "@/app/styles/style";
import CourseRevenueChart from "../../charts/CourseRevenueChart";
import { useAdminTotalRevenueQuery } from "@/redux/features/payment/paymentApi";
import CourseData from "../../instructor/dashboard/CourseData";
import { useUsersDataForAdminQuery } from "@/redux/features/user/userApi";
import UserDataChart from "../../charts/UserDataChart";
import Loader from "../../common/spinners/Loader";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";

const AdminDashboard = () => {
  const { data } = useAdminTotalRevenueQuery({});
  const { data: userData } = useUsersDataForAdminQuery({});
  const { data: courses } = useGetAllCoursesQuery({});
  const usersData = userData?.data;

  if (!userData) return <Loader />;
  return (
    <div className="min-h-screen">
      <div>
        <CourseData
          enrolls={usersData?.users}
          duration={usersData?.instructors}
          total={courses?.courses?.length}
          isAdmin={true}
        />
        <h1 className={styles.title}>Revenue</h1>
        <CourseRevenueChart data={data?.data} />
        <h1 className={styles.title}>Users</h1>
        <UserDataChart data={usersData?.usersData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
