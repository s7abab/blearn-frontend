"use client";
import React from "react";
import { motion } from "framer-motion";
import CourseImage from "./CourseImage";
import { FaStar } from "react-icons/fa6";
import { ICourseDetails } from "@/@types/interfaces/course/course.interface";
import CourseProgress from "../user/my-learnings/CourseProgress";

type Props = {
  course: ICourseDetails;
  mylearning?: boolean;
};

const CourseCard = ({ course, mylearning }: Props) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="dark:bg-gradient-to-tr dark:from-[#0e161b] dark:to-[#090c1b] bg-gradient-to-b from-gray-300 to-gray-400 shadow-lg rounded-lg overflow-hidden cursor-pointer relative border dark:border-gray-800">
          <div className="h-40 relative overflow-hidden m-3">
            <div className="overflow-hidden">
              <CourseImage imgUrl={course?.thumbnail} />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-gray-100 font-semibold truncate">
              {course?.title}
            </h2>
            {mylearning ? (
              <>
                <CourseProgress courseId={course?._id} />
              </>
            ) : (
              <>
                <div className="flex justify-between mt-5 text-sm text-gray-100">
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
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseCard;
