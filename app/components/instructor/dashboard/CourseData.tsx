import { FaPeopleGroup, FaVideo } from "react-icons/fa6";
import { GiDuration } from "react-icons/gi";

interface Props {
  enrolls: number;
  isCourse?: boolean;
  isAdmin?: boolean;
  total: number;
  duration: number;
}
const CourseData = ({ enrolls, total, isCourse, duration, isAdmin }: Props) => {
  return (
    <>
      <div className="flex gap-2 mt-5">
        <div className="bg-gradient-to-br from-[#0c214d] to-[#0b063f] p-4 rounded-md shadow-lg  w-1/3 flex px-4 items-center gap-3 font-Josefin">
          <FaPeopleGroup className="text-green-600" />
          {isAdmin ? "Total Users" : "Total Enrolls"}
          <h1 className="">{enrolls}</h1>
        </div>
        <div className="bg-gradient-to-br from-[#0c214d] to-[#0b063f] p-4 rounded-md shadow-lg  w-1/3 flex px-4 items-center gap-3 font-Josefin">
          <GiDuration className="text-violet-600" />
          {isCourse
            ? "Completed Users "
            : isAdmin
            ? "Total Instructors"
            : "Total Duration"}
          <h1 className="">{duration}</h1>
        </div>
      <div className="bg-gradient-to-br from-[#0c214d] to-[#0b063f] p-4 rounded-md shadow-lg  w-1/3 flex px-4 items-center gap-3 font-Josefin">
        <FaVideo className="text-orange-600" />
        {isCourse
          ? "Total Courses"
          : isAdmin
          ? "Total Courses"
          : "Total Lessons"}
        <h1 className="">{total}</h1>
      </div>
      </div>
    </>
  );
};

export default CourseData;
