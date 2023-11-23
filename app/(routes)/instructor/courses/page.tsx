import AddCourseBtn from "@/app/components/instructor/AddCourseBtn";

type Props = {};

const CourseManagement = (props: Props) => {
  return (
    <div className="h-screen">
      <AddCourseBtn />
      <h1 className="mt-10 text-lg font-Poppins">My Courses</h1>
    </div>
  );
};

export default CourseManagement;
