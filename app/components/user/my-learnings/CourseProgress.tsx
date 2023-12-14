"use client";
import { useGetProgressionQuery } from "@/redux/features/course/courseApi";
import React from "react";

type Props = {
    courseId: string
};

const CourseProgress = ({ courseId }: Props) => {

  const { data } = useGetProgressionQuery(courseId);

  // Calculate the width of the progress bar based on the completion percentage
  const progressBarWidth = data ? `${data.progression}%` : '0';

  return (
    <>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
        <div
          className={`h-2.5 rounded-full ${data?.progression === 0 ? '' : 'bg-blue-600'}`}
          style={{ width: progressBarWidth }}
        />
      </div>
      <p className="flex items-center gap-2 mt-2">
        <span className="font-semibold">{data?.progression || 0}%</span>
        Completed
      </p>
    </>
  );
};

export default CourseProgress;
