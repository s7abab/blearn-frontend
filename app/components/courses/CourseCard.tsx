"use client";
import React from "react";
import { motion } from "framer-motion";
import { styles } from "@/app/styles/style";
import CourseImage from "./CourseImage";

type Props = {
  title: string;
  imgUrl: string;
  entrolls: number;
};

const CourseCard = ({ title, imgUrl, entrolls }: Props) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 h-52 rounded-md shadow-xl border-2 border-gray-900 overflow-hidden cursor-pointer relative">
          <div className="absolute top-0 left-0 right-0 p-4 z-10">
            <h2
              className={`font-Poppins text-white truncate`}
            >
              {title}
            </h2>
          </div>
          <div className="opacity-90 relative w-full h-3/4">
            <CourseImage imgUrl={imgUrl} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex justify-between">
            <p className="text-sm">
              Entrolls <span className="font-bold">{entrolls} </span>
            </p>
            <p className="text-sm">
              Rating <span className="font-bold">{entrolls} </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseCard;
