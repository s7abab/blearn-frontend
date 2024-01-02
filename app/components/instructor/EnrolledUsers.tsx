import { useGetEnrolledUsersQuery } from "@/redux/features/course/courseApi";
import CustomTable from "../common/CustomTable";
import Loader from "../common/spinners/Loader";

interface Props {
  courseId: string;
}
const EnrolledUsers = ({ courseId }: Props) => {
  const { data } = useGetEnrolledUsersQuery(courseId);
  const users = data?.users;

  if (!users) return <Loader />;
  return (
    <CustomTable
      data={users}
      fields={["name", "email"]}
      url="/as"
      tableFor="enrolledUsers"
      search={false}
    />
  );
};

export default EnrolledUsers;
