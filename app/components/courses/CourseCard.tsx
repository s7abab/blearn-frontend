import { motion } from "framer-motion";
import CourseImage from "./CourseImage";
import { FaStar } from "react-icons/fa6";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";

interface Props {
  course: ICourseDetails;
  mylearning?: boolean;
}

const CourseCard = ({ course }: Props) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="bg-slate-600 bg-opacity-20 py-1 shadow-md rounded-md shadow-[bg-slate-700] backdrop-blur border border-[#ffffff1d] cursor-pointer">
          <div className="h-40 relative overflow-hidden m-3">
            <div className="overflow-hidden">
              <CourseImage imgUrl={course?.thumbnail} />
            </div>
          </div>
          <div className="p-4">
            <h2 className=" font-semibold truncate">{course?.title}</h2>

            <div className="flex justify-between mt-5 text-sm ">
              <p>
                <span className="font-semibold font-Poppins">
                  {course?.enrolledUsers?.length}
                </span>{" "}
                Enrolls
              </p>
              <p className="flex items-center gap-2">
                Rating
                <span className="font-semibold">...test</span>
                <div className="text-yellow-500">
                  <FaStar />
                </div>
              </p>
            </div>
            <p>
              <span className="font-semibold font-Poppins">
                ₹{course?.discountPrice}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseCard;
