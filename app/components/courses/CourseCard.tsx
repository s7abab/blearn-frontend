"use client";
import React from "react";
import { motion } from "framer-motion";
import CourseImage from "./CourseImage";
import { ICourseDetails } from "@/@types/course/course.types";
import { FaStar } from "react-icons/fa6";

type Props = {
  course: ICourseDetails;
  mylearning?: boolean;
  progress?: number;
};

const CourseCard = ({ course, mylearning,progress }: Props) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="bg-gradient-to-tr from-[#0e161b] to-[#090c1b] shadow-lg rounded-lg overflow-hidden cursor-pointer relative border border-gray-800">
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
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress! * 10}%` }}
                  />
                </div>
                <p className="flex items-center gap-2 mt-2">
                  <span className="font-semibold">{progress}0%</span>
                  Completed
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-between mt-5 text-sm text-gray-100">
                  <p>
                    <span className="font-semibold font-Poppins">
                      {course?.enrolls}
                    </span>{" "}
                    Enrolls
                  </p>
                  <p className="flex items-center gap-2">
                    Rating
                    <span className="font-semibold">{course?.enrolls}</span>
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
